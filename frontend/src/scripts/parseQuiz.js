import fs from 'fs';
import path from 'path';

// Read the quiz text file
const filePath = path.join(process.cwd(), 'src', 'data', 'quiz_5_language.txt');
const content = fs.readFileSync(filePath, 'utf8');

// Parse the content
function parseQuiz(content) {
  const lines = content.split('\n');
  const languages = [];
  let currentLanguage = null;
  let currentTopic = null;
  let topics = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Detect language sections
    if (line.startsWith('LANGUAGE:')) {
      if (currentLanguage && topics.length > 0) {
        languages.push({
          ...currentLanguage,
          topics: topics
        });
      }
      
      const langMatch = line.match(/LANGUAGE:\s*(.+)/);
      const langName = langMatch[1].replace('(ORIGINAL)', '').trim();
      
      currentLanguage = {
        name: langName,
        code: langName.includes('ENGLISH') ? 'en' : 
              langName.includes('BAHASA') ? 'ms' :
              langName.includes('NEPALI') ? 'ne' :
              langName.includes('HINDI') ? 'hi' :
              langName.includes('BENGALI') ? 'bn' : 'en'
      };
      topics = [];
      currentTopic = null;
    }
    
    // Detect topic sections - handle the separator line issue
    if (line.includes('📚') && (line.includes('TOPIC') || line.includes('Topik') || line.includes('शीर्षक') || line.includes('विषय') || line.includes('বিষয়'))) {
      if (currentTopic && currentTopic.questions.length > 0) {
        topics.push(currentTopic);
      }
      
      // Extract topic from the line that might have separators
      const topicMatch = line.match(/📚 (?:TOPIC|Topik|शीर्षक|विषय|বিষয়) (\d+): ([^-]+)/);
      if (topicMatch) {
        currentTopic = {
          id: parseInt(topicMatch[1]),
          name: topicMatch[2].trim(),
          questions: []
        };
      }
    }
    
    // Detect questions - they might be on the same line as separators
    if (line.includes('🔸') && (line.includes('Question') || line.includes('Soalan') || line.includes('प्रश्न') || line.includes('প্রশ্ন'))) {
      const questionMatch = line.match(/🔸 (?:Question|Soalan|प्रश्न|प्रश्न|প্রশ্ন) (\d+) \((?:Type|Jenis|प्रकार|প्রকার): ([^)]+)\)/);
      
      if (questionMatch && currentTopic) {
        const questionId = parseInt(questionMatch[1]);
        const type = questionMatch[2];
        
        // Look for Legal ID in next few lines
        let legalId = null;
        let questionText = '';
        let j = i + 1;
        
        while (j < lines.length && j < i + 5) {
          const nextLine = lines[j].trim();
          if (nextLine.match(/(?:Legal IDs|ID Undang|कानूनी आईडी|আইনি আইডি):\s*(\d+)/)) {
            legalId = parseInt(nextLine.match(/(\d+)/)[1]);
          }
          const questionMatch = nextLine.match(/^(?:Question|Soalan|प्रश्न|প্রশ্ন):\s*(.+)$/);
          if (questionMatch) {
            questionText = questionMatch[1];
            break;
          }
          j++;
        }
        
        const currentQuestion = {
          id: questionId,
          legalId: legalId,
          type: type,
          question: questionText,
          options: [],
          correctAnswer: null,
          explanations: []
        };
        
        // Parse options starting after the question
        let k = j + 1;
        while (k < lines.length) {
          const optionLine = lines[k].trim();
          
          if (!optionLine || optionLine.startsWith('====') || optionLine.includes('📚')) {
            break;
          }
          
          if (optionLine.startsWith('✅') || optionLine.startsWith('❌')) {
            const isCorrect = optionLine.startsWith('✅');
            const optionMatch = optionLine.match(/[✅❌] ([A-D])\. (.+)/);
            
            if (optionMatch) {
              const optionLetter = optionMatch[1];
              const optionText = optionMatch[2];
              
              currentQuestion.options.push({
                letter: optionLetter,
                text: optionText,
                correct: isCorrect
              });
              
              if (isCorrect) {
                currentQuestion.correctAnswer = optionLetter;
              }
              
              // Get explanation from next line
              if (lines[k + 1]?.trim().startsWith('→')) {
                const explanation = lines[k + 1].trim().replace(/^→\s*/, '');
                currentQuestion.explanations.push({
                  option: optionLetter,
                  text: explanation
                });
              }
            }
          }
          
          if (optionLine.match(/^(Summary|Ringkasan|सारांश|সারাংশ):/)) {
            break;
          }
          
          k++;
        }
        
        if (currentQuestion.options.length > 0) {
          currentTopic.questions.push(currentQuestion);
        }
        
        i = k - 1; // Skip to after this question
      }
    }
    
    i++;
  }
  
  // Add the last topic and language
  if (currentTopic && currentTopic.questions.length > 0) {
    topics.push(currentTopic);
  }
  if (currentLanguage && topics.length > 0) {
    languages.push({
      ...currentLanguage,
      topics: topics
    });
  }
  
  return {
    languages: languages,
    supportedLanguages: languages.map(lang => ({
      code: lang.code,
      name: lang.name
    }))
  };
}

// Parse and save
console.log('🔄 Parsing quiz data...');
const quizData = parseQuiz(content);

if (!quizData || !quizData.languages || quizData.languages.length === 0) {
  console.error('❌ Failed to parse quiz data');
  process.exit(1);
}

const outputPath = path.join(process.cwd(), 'src', 'data', 'quizData.json');
fs.writeFileSync(outputPath, JSON.stringify(quizData, null, 2));

console.log(`✅ Quiz data parsed successfully!`);
console.log(`📊 Found ${quizData.languages.length} languages`);
quizData.languages.forEach(lang => {
  const totalQuestions = lang.topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  console.log(`   ${lang.name} (${lang.code}): ${lang.topics.length} topics, ${totalQuestions} questions`);
});
console.log(`📁 Saved to: ${outputPath}`);