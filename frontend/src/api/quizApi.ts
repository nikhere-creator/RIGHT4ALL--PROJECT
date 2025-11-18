// Mock quiz API for development
export const useQuizApi = {
  useGetQuizData: () => ({
    data: {
      en: [
        {
          id: 'workplace-rights',
          name: 'Workplace Rights',
          description: 'Learn about your fundamental rights as a worker in Malaysia',
          color: 'from-blue-500 to-blue-600',
          questions: [
            {
              id: 1,
              question: 'What is the minimum wage in Malaysia?',
              options: ['RM1,200', 'RM1,500', 'RM1,800', 'RM2,000'],
              correctAnswer: 1,
              explanation: 'The current minimum wage in Malaysia is RM1,500 per month for most states.',
              category: 'workplace-rights'
            },
            {
              id: 2,
              question: 'How many hours per week can you legally work in Malaysia?',
              options: ['40 hours', '44 hours', '48 hours', '50 hours'],
              correctAnswer: 2,
              explanation: 'The maximum working hours per week in Malaysia is 48 hours as per the Employment Act 1955.',
              category: 'workplace-rights'
            },
            {
              id: 3,
              question: 'Are you entitled to overtime pay?',
              options: ['No, never', 'Yes, for work beyond 8 hours per day', 'Only on weekends', 'Only if stated in contract'],
              correctAnswer: 1,
              explanation: 'Yes, you are entitled to overtime pay for work beyond 8 hours per day at 1.5 times your hourly rate.',
              category: 'workplace-rights'
            }
          ]
        },
        {
          id: 'safety-health',
          name: 'Safety & Health',
          description: 'Understanding workplace safety and health regulations',
          color: 'from-green-500 to-green-600',
          questions: [
            {
              id: 4,
              question: 'Who is responsible for workplace safety?',
              options: ['Only the employee', 'Only the employer', 'Both employer and employee', 'The government only'],
              correctAnswer: 2,
              explanation: 'Both employers and employees share responsibility for workplace safety under the Occupational Safety and Health Act.',
              category: 'safety-health'
            },
            {
              id: 5,
              question: 'What should you do if you notice a safety hazard?',
              options: ['Ignore it', 'Report it immediately', 'Fix it yourself', 'Wait for someone else to notice'],
              correctAnswer: 1,
              explanation: 'You should report any safety hazards immediately to your supervisor or safety officer.',
              category: 'safety-health'
            }
          ]
        },
        {
          id: 'legal-protection',
          name: 'Legal Protection',
          description: 'Know your legal rights and protections under Malaysian law',
          color: 'from-purple-500 to-purple-600',
          questions: [
            {
              id: 6,
              question: 'Can your employer hold your passport?',
              options: ['Yes, always', 'Yes, if you agree', 'No, never', 'Only for safekeeping'],
              correctAnswer: 2,
              explanation: 'No, your employer cannot hold your passport. This is illegal under Malaysian law.',
              category: 'legal-protection'
            },
            {
              id: 7,
              question: 'What should you do if your salary is delayed?',
              options: ['Wait patiently', 'Quit immediately', 'Report to Labour Department', 'Ask family for help'],
              correctAnswer: 2,
              explanation: 'You should report salary delays to the Labour Department for assistance and legal recourse.',
              category: 'legal-protection'
            }
          ]
        }
      ],
      ms: [
        {
          id: 'hak-pekerja',
          name: 'Hak Pekerja',
          description: 'Ketahui hak asasi anda sebagai pekerja di Malaysia',
          color: 'from-blue-500 to-blue-600',
          questions: [
            {
              id: 1,
              question: 'Apakah gaji minimum di Malaysia?',
              options: ['RM1,200', 'RM1,500', 'RM1,800', 'RM2,000'],
              correctAnswer: 1,
              explanation: 'Gaji minimum semasa di Malaysia ialah RM1,500 sebulan untuk kebanyakan negeri.',
              category: 'hak-pekerja'
            },
            {
              id: 2,
              question: 'Berapa jam seminggu anda boleh bekerja secara sah di Malaysia?',
              options: ['40 jam', '44 jam', '48 jam', '50 jam'],
              correctAnswer: 2,
              explanation: 'Jam kerja maksimum seminggu di Malaysia ialah 48 jam mengikut Akta Kerja 1955.',
              category: 'hak-pekerja'
            }
          ]
        }
      ],
      zh: [
        {
          id: 'workplace-rights-zh',
          name: '工作场所权利',
          description: '了解您在马来西亚作为工人的基本权利',
          color: 'from-blue-500 to-blue-600',
          questions: [
            {
              id: 1,
              question: '马来西亚的最低工资是多少？',
              options: ['RM1,200', 'RM1,500', 'RM1,800', 'RM2,000'],
              correctAnswer: 1,
              explanation: '马来西亚目前的最低工资大部分州为每月RM1,500。',
              category: 'workplace-rights-zh'
            }
          ]
        }
      ],
      ta: [
        {
          id: 'workplace-rights-ta',
          name: 'பணியிட உரிமைகள்',
          description: 'மலேசியாவில் ஒரு தொழிலாளியாக உங்கள் அடிப்படை உரிமைகளைப் பற்றி அறியுங்கள்',
          color: 'from-blue-500 to-blue-600',
          questions: [
            {
              id: 1,
              question: 'மலேசியாவில் குறைந்தபட்ச ஊதியம் என்ன?',
              options: ['RM1,200', 'RM1,500', 'RM1,800', 'RM2,000'],
              correctAnswer: 1,
              explanation: 'மலேசியாவில் தற்போதைய குறைந்தபட்ச ஊதியம் பெரும்பாலான மாநிலங்களுக்கு மாதம் RM1,500 ஆகும்.',
              category: 'workplace-rights-ta'
            }
          ]
        }
      ],
      hi: [
        {
          id: 'workplace-rights-hi',
          name: 'कार्यक्षेत्र अधिकार',
          description: 'मलेशिया में एक कामगार के रूप में अपने मौलिक अधिकारों के बारे में जानें',
          color: 'from-blue-500 to-blue-600',
          questions: [
            {
              id: 1,
              question: 'मलेशिया में न्यूनतम वेतन क्या है?',
              options: ['RM1,200', 'RM1,500', 'RM1,800', 'RM2,000'],
              correctAnswer: 1,
              explanation: 'मलेशिया में वर्तमान न्यूनतम वेतन अधिकांश राज्यों के लिए प्रति माह RM1,500 है।',
              category: 'workplace-rights-hi'
            }
          ]
        }
      ]
    }
  })
}