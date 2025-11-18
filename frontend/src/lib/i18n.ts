/**
 * Internationalization (i18n) Configuration for Right4All
 * 
 * Provides multi-language support for the application with 5 languages:
 * English, Bahasa Malaysia, Nepali, Hindi, and Bengali.
 * 
 * @module lib/i18n
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/**
 * Translation resources for all supported languages
 * Contains complete application text in 5 languages
 */
const resources = {
  en: {
    translation: {
      app: {
        title: 'Right4All',
        tagline: 'Know your rights, stay protected',
      },
      nav: {
        home: 'Home',
        support: 'Get Support',
        rights: 'Rights Education',
        insights: 'Insights & Stories',
        quiz: 'Know Your Rights',
        tools: 'Tools',
        community: 'Community'
      },
      common: {
        language: 'Language',
        takeQuiz: 'Take Quiz',
        learnMore: 'Learn More',
        selectLanguage: 'Select language'
      },
      home: {
        welcome: 'Know your rights, stay protected',
        empowering: 'Empowering',
        migrantWorkers: 'Migrant Workers',
        withDataTools: 'with data, tools & support',
        description: 'Knowledge of your rights is the first step toward workplace dignity. Share this information to help protect all workers in Malaysia.',
        rightsGuide: 'Rights Guide',
        labourMarket: 'Labour Market',
        stats: {
          arrivals: 'Monthly foreign arrivals in Malaysia',
          undocumented: 'Undocumented Migrant Worker', 
          documented: 'Documented Migrant Worker (Until Year 2022)'
        },
        vision: {
          title: 'Vision',
          content: 'To create an inclusive and accessible digital platform that empowers every migrant worker in Malaysia with knowledge of their rights, enabling them to live and work with dignity, safety, and equality — contributing to Malaysia\'s progress towards SDG 10: Reduced Inequalities.'
        },
        mission: {
          title: 'Mission',
          content: 'Our mission is to empower migrant workers in Malaysia by delivering multilingual, easy-to-understand guides and interactive tools that help them know their rights, check their work conditions, and access safe support. We aim to protect, educate, and uplift migrant communities while promoting dignity and reducing inequalities.'
        },
        sdg: {
          title: 'Reducing inequality starts here. Learn, connect, and grow with us.',
          description: 'Through Right4All, we\'re contributing to the United Nations Sustainable Development Goal 10: Reduced Inequalities. Join us in building a more equitable future for migrant workers in Malaysia.'
        },
        faq: {
          sectionTitle: 'Stay Safe, Stay Informed',
          sectionSubtitle: 'Know your rights, Stay protected',
          sectionDescription: 'This section shows you where to go for learning rights, getting support, or reading stories.',
          homepageGuidance: 'Homepage Guidance',
          findNGOs: 'Find NGOs, organisations, and practical life tips',
          goToGetSupport: 'Go to Get Support',
          chatWithAI: 'Have a question? Chat with our AI Chatbot',
          learnAboutAI: 'Learn about our AI Assistant',
          comingSoon: 'Coming Soon',
          learnRights: 'Learn about your labour rights in simple language',
          goToRightsEducation: 'Go to Rights Education',
          testKnowledge: 'Test your knowledge of labour rights',
          exploreJobs: 'Explore jobs, and labour market information',
          goToInsightsStories: 'Go to Insights & Stories',
          readStories: 'Read real-life stories from migrant workers',
          aboutWebsite: 'About This Website',
          whoIsThisFor: 'Who is this website for?',
          whoIsThisForAnswer: 'Mainly for migrant workers in Malaysia.',
          registerOrPay: 'Do I need to register or pay?',
          registerOrPayAnswer: 'No. It is free and no login is needed.',
          infoSafe: 'Is my information safe?',
          infoSafeAnswer: 'Yes. We do not collect personal data.',
          whyFiveLanguages: 'Why only 5 languages?',
          whyFiveLanguagesAnswer: 'Because most workers are from Indonesia, Nepal, Bangladesh, and India. More will be added later.',
          legalAdvice: 'Does this website give legal advice?',
          legalAdviceAnswer: 'No. This site only gives general information. It does not replace government advice or professional legal support. For serious problems, please contact JTKSM, your embassy, or NGOs in our Support Hub.'
        },
        buttons: {
          getSupport: 'Get Support',
          rightsEducation: 'Rights Education'
        },
        tagline: 'Know your rights, stay protected',
        footer: {
          copyright: 'Right4All © 2025 | Empowering Migrant Workers in Malaysia | Serving SDG 10: Reduced Inequalities | Protect • Educate • Uplift',
          disclaimer: {
            title: 'Disclaimer',
            content: 'The information on this site is for educational purposes only and does not constitute legal advice. Please consult relevant authorities or qualified professionals for specific guidance.'
          }
        }
      },
      quiz: {
        warning: 'Please choose an option.',
        correct: 'Correct!',
        incorrect: 'Incorrect!',
        scenario: 'SCENARIO',
        submit: 'Submit Answer',
        next: 'Next',
        previous: 'Previous',
        viewResults: 'View Results',
        results: 'Results',
        takeQuizInLanguage: 'Take quiz in this language',
        interactiveQuizAvailable: 'Interactive quiz available',
        title: 'Know Your Rights Quiz',
        subtitle: 'Test your knowledge about workplace rights through interactive quizzes. Choose your preferred language to begin.',
        testYourKnowledge: 'Test Your Knowledge',
        testYourKnowledgeSubtitle: 'Take interactive quizzes to test your understanding of workplace rights and labor laws',
        chooseQuizCategory: 'Choose Quiz Category',
        selectedLanguage: 'Selected language',
        questionsAvailable: 'questions available',
        startQuiz: 'Start Quiz',
        disclaimer: {
          title: 'Disclaimer',
          content: 'The quizzes are provided for learning and self-assessment purposes only. They are not official tests and do not guarantee compliance with workplace laws. Always confirm important information with official sources or qualified professionals.'
        }
      },
      insights: {
        title: 'Labour Pulse',
        subtitle: 'Understanding Malaysia\'s Migrant Workforce',
        overview: {
          title: 'Malaysia Labour Overview',
          totalWorkers: 'Total Workers',
          statesCovered: 'States Covered',
          topNationalities: 'Top Nationalities'
        },
        countryComparison: {
          title: 'Country Comparison',
          selectCountries: 'Select Countries',
          compareTop2: 'Compare Countries',
          clearSelection: 'Clear Selection',
          selectToCompare: 'Select Countries to Compare',
          chooseAtLeast2: 'Choose at least 2 countries from the list to see the comparison chart',
          countryLabel: 'Country',
          workersLabel: 'Number of Workers'
        },
        industry: {
          title: 'Industry Analysis & Safety',
          selected: 'Selected',
          shareAnalysis: 'Industry Share Analysis',
          shareDescription: 'This chart shows the percentage share of {industry} sector in Malaysia\'s migrant worker population from 2001 to 2023. The numbers represent what percentage of all migrant workers in Malaysia work in this industry during each time period.',
          higherPercentages: 'Higher percentages indicate this industry employed more migrant workers relative to other sectors',
          stateBreakdown: 'State Industry Breakdown',
          stateDescription: 'This chart shows how migrant workers in {state} are distributed across different industries. The percentages show what portion of {state}\'s migrant workers work in each sector.',
          clearFilter: 'Clear Filter',
          safetyRiskLevels: 'Safety Risk Levels',
          lowRisk: 'Few accidents reported in 2023',
          mediumRisk: 'Moderate number of accidents',
          highRisk: 'Many accidents—extra caution needed',
          accidents2023: 'Accidents 2023',
          percentageMigrantWorkers: 'Percentage of Migrant Workers',
          clickToDeselect: 'Click to deselect',
          clickToViewTrend: 'Click to view trend'
        },
        map: {
          title: 'Interactive State Map',
          clickStates: 'Click on states to view detailed breakdown',
          viewing: 'Viewing',
          selectState: 'Select a state to view industry breakdown',
          clearSelection: 'Clear Selection',
          riskLevelInfo: 'Risk Level Information',
          riskDescription: 'Risk level shows workplace safety for foreign workers based on injury rates, dangerous job types, and economic protection.',
          lowRiskDesc: 'Less danger and better protection for workers',
          highRiskDesc: 'More danger and less protection for workers'
        },
        stats: {
          highestPoint: 'Highest Point',
          currentLevel: 'Current Level',
          growthPattern: 'Growth Pattern',
          growth: 'growth',
          decline: 'decline',
          since2001: 'since 2001'
        },
        industries: {
          manufacturing: 'Manufacturing',
          construction: 'Construction',
          agriculture: 'Agriculture',
          services: 'Services'
        }
      },
      rightsGuide: {
        title: 'Rights Guide',
        subtitle: 'Learn about your workplace rights through animated conversations between Maya and Alex. Choose a topic and then select your preferred language to watch the animation.',
        topics: {
          topic1: 'Complete Rights',
          topic2: 'Wage Protection',
          topic3: 'Working Hours',
          topic4: 'Safety Standards',
          topic5: 'Accommodation',
          topic6: 'Healthcare Access',
          topic7: 'Contract Terms',
          topic8: 'Discrimination',
          topic9: 'Union Rights',
          topic10: 'Legal Support'
        },
        interactiveSections: 'interactive sections',
        startLearning: 'Start Learning',
        chooseLanguage: 'Choose your preferred language',
        backToTopics: 'Back to Topics',
        back: 'Back',
        section: 'Section',
        of: 'of',
        dialogue: 'Dialogue',
        sectionsAvailable: 'sections available',
        interactiveLearning: 'Interactive Learning',
        disclaimer: {
          title: 'Disclaimer',
          content: 'The information provided in the Rights Guide is for educational purposes only and does not constitute legal advice. While every effort has been made to ensure accuracy, workplace laws and regulations may change. For advice specific to your situation, please consult a qualified professional or the relevant authorities.'
        }
      },
      community: {
        title: 'Community Hub',
        subtitle: '✨ Real voices. Real help. Real life in Malaysia. ✨',
        searchHelp: 'Search for help',
        searchPlaceholder: "Type what you need... like 'legal help' or 'housing'",
        stats: {
          organizations: 'Organizations',
          stories: 'Survivor Stories',
          resources: 'Life Hacks'
        },
        tabs: {
          findHelp: {
            label: 'Find Help',
            description: 'Connect with trusted organizations'
          },
          stories: {
            label: 'Survivor Stories',
            description: 'Learn from others experiences'
          },
          resources: {
            label: 'Life Hacks',
            description: 'Practical guides for daily life'
          }
        },
        loading: {
          organizations: 'Loading organizations...',
          stories: 'Loading stories...',
          resources: 'Loading resources...'
        },
        notFound: {
          organizations: 'No organizations found.',
          stories: 'No stories found.',
          resources: 'No resources found.'
        },
        actions: {
          visitWebsite: 'Visit Website',
          contactAvailable: 'Contact Available',
          clickForDetails: 'Click for details',
          readFullStory: 'Read Full Story',
          tipsAvailable: 'Tips Available',
          clickToReadMore: 'Click to read more',
          clickToExpand: 'Click to expand'
        },
        content: {
          personalExperience: 'Personal Experience',
          keyLessonsAndTips: 'Key Lessons & Tips',
          completeStepByStepGuide: 'Complete Step-by-step Guide',
          whoIsThisFor: 'Who is this for?',
          whatYouNeed: 'What you need',
          costAndTime: 'Cost & Time',
          legalInformation: 'Legal information',
          problemsAndScams: 'Problems & Scams to avoid',
          whereToGetHelp: 'Where to get help',
          stepByStepGuide: 'Step-by-step guide'
        },
        helpText: "Can't find what you need? Use the search box above to find help, or try different filters to discover more resources."
      },
      support: {
        title: 'Get Support',
        subtitle: 'Find practical help and life hacks for your daily needs',
        stats: {
          organizations: 'Support Organizations',
          resources: 'Life Hack Resources'
        },
        sections: {
          getHelp: {
            title: 'Get Help',
            subtitle: 'Connect with NGOs and support organizations'
          },
          lifeHacks: {
            title: 'Life Hacks',
            subtitle: 'Practical resources for daily life'
          }
        },
        search: {
          placeholder: 'Search for help and resources',
          organizationsPlaceholder: 'Search organizations or life hacks...',
          storiesPlaceholder: 'Search stories...'
        },
        filters: {
          getHelp: {
            allHelp: 'All Help',
            legalAid: 'Legal Aid',
            healthWellbeing: 'Health & Wellbeing',
            work: 'Work',
            otherSupport: 'Other Support'
          },
          lifeHacks: {
            allResources: 'All Resources',
            workLegal: 'Work & Legal',
            healthSafety: 'Health & Safety',
            housingEveryday: 'Housing & Everyday Life',
            moneyDaily: 'Money & Daily Life'
          }
        },
        descriptions: {
          storiesIntro: 'These stories come from real migrant workers. Their experiences can help guide and support others facing similar challenges.',
          immediateHelp: 'Need immediate help? Don\'t hesitate to reach out to these organizations and resources.'
        }
      },
      insightsStories: {
        title: 'Insights & Stories',
        subtitle: 'Labour market data and real experiences from migrant workers',
        sections: {
          labourMarket: {
            title: 'Labour Market',
            subtitle: 'Data trends and employment analytics'
          },
          survivorStories: {
            title: 'Survivor Stories',
            subtitle: 'Real experiences from migrant workers'
          }
        },
        categories: {
          allStories: 'All Stories',
          legal: 'Legal & Documents',
          fairPay: 'Fair Pay & Wages',
          safety: 'Safety & Health',
          housing: 'Housing & Living Conditions',
          workplaceRights: 'Workplace Rights & Respect',
          workingHours: 'Working Hours & Conditions',
          resilience: 'Resilience & Success'
        }
      },
      chatbot: {
        hero: {
          title: 'Right4All Assistant',
          subtitle: 'Empowering migrant workers through multilingual AI, verified legal data, and safe, empathetic guidance.',
          startChatting: 'Start Chatting'
        },
        architecture: {
          title: 'System Architecture',
          subtitle: 'Built with cutting-edge AI technology to deliver accurate, safe, and multilingual support',
          hybridRag: {
            title: 'Hybrid RAG System',
            description: 'Combines vector similarity search with keyword fallback, using DeepSeek API with PostgreSQL vector embeddings and comprehensive keyword matching for reliable responses.',
            tags: {
              deepseek: 'DeepSeek API',
              vector: 'Vector Search',
              keyword: 'Keyword Fallback'
            }
          },
          database: {
            title: 'Database Integration',
            description: 'Connected to PostgreSQL with tables for rights guides, employment laws, FAQs, migration statistics, and conversation analytics. Uses stored procedures for vector similarity search.',
            tags: {
              postgresql: 'PostgreSQL',
              vectorDb: 'Vector DB',
              storedProcedures: 'Stored Procedures'
            }
          },
          language: {
            title: 'Language & Safety',
            description: 'Supports 5 languages with strict language enforcement and comprehensive keyword filtering. Rejects off-topic questions and maintains safety boundaries for migrant worker topics only.',
            tags: {
              languages: '5 Languages',
              safety: 'Safety Filter',
              topicGuard: 'Topic Guard'
            }
          }
        },
        performance: {
          title: 'Performance Benchmark',
          subtitle: 'Independent testing validates the Right4All Assistant\'s accuracy, safety, and empathy',
          perfectPerformance: {
            title: 'Perfect Performance',
            description: 'Tested across 35 labour rights questions — evaluated for factual correctness, tone, safety, and cultural sensitivity. Results confirm 100% accuracy in verified data delivery and flawless multilingual communication.'
          },
          testResults: {
            title: 'Test Results Summary',
            factualAccuracy: 'Factual Accuracy',
            safetyTests: 'Safety Tests',
            languages: 'Languages',
            fullSupport: 'Full Support'
          },
          testCases: {
            minimumWage: 'Minimum wage calculation',
            overtime: 'Overtime payment rules',
            passport: 'Passport confiscation',
            sickLeave: 'Sick leave entitlement',
            accommodation: 'Accommodation standards',
            workingHours: 'Working hours limits',
            ngoSupport: 'NGO support access',
            wageRights: 'Wage Rights',
            legalCompliance: 'Legal Compliance',
            safetyBoundary: 'Safety Boundary',
            employmentRights: 'Employment Rights',
            livingConditions: 'Living Conditions',
            workingConditions: 'Working Conditions',
            supportOrganizations: 'Support Organizations'
          }
        },
        strengths: {
          title: 'Key Strengths',
          hybridRag: {
            title: 'Hybrid RAG system with vector search',
            description: 'Combines vector similarity search with keyword fallback for reliable responses'
          },
          database: {
            title: 'Verified database integration',
            description: 'Connected to PostgreSQL with rights guides, employment laws, and migration statistics'
          },
          language: {
            title: 'Strict language enforcement',
            description: 'Maintains language consistency across all 5 supported languages'
          },
          keyword: {
            title: 'Comprehensive keyword filtering',
            description: '1000+ keywords across 5 languages ensure topic relevance'
          },
          wage: {
            title: 'Wage calculation capabilities',
            description: 'Built-in wage and overtime calculation with step-by-step breakdown'
          }
        },
        safety: {
          title: 'Safety Features',
          topicBoundary: {
            title: 'Topic boundary enforcement',
            description: 'Rejects questions outside migrant worker rights and labour issues'
          },
          databaseBacked: {
            title: 'Database-backed responses',
            description: 'Uses verified data from rights guides, laws, and migration statistics'
          },
          fallback: {
            title: 'Fallback protection',
            description: 'Graceful fallback to keyword search when vector search fails'
          },
          analytics: {
            title: 'Conversation analytics',
            description: 'Anonymous conversation logging for performance monitoring'
          },
          transparency: {
            title: 'Source transparency',
            description: 'Provides citations and source types for all responses'
          }
        },
        capabilities: {
          title: 'What the Assistant Can Help With',
          subtitle: 'Comprehensive support for migrant workers across all essential areas',
          wage: {
            title: 'Wage & Salary Questions',
            description: 'Minimum wage calculations, overtime pay rules, salary deductions, and wage slip verification.'
          },
          hours: {
            title: 'Working Hours & Leave',
            description: 'Daily working hours, annual leave entitlement, sick leave rights, and public holiday rules.'
          },
          documents: {
            title: 'Documents & Legal Rights',
            description: 'Passport issues, work permits, employment contracts, and legal rights protection.'
          },
          accommodation: {
            title: 'Accommodation & Living',
            description: 'Housing standards, accommodation charges, living conditions, and basic amenities.'
          },
          support: {
            title: 'Support & NGOs',
            description: 'Finding NGOs, filing complaints, Labour Department contacts, and support organizations.'
          },
          multilingual: {
            title: 'Multilingual Support',
            description: 'Full support in English, Bahasa Malaysia, Hindi, Nepali, and Bengali with cultural context.'
          }
        },
        sdg: {
          title: 'Supporting Sustainable Development Goals',
          description: 'Right4All Assistant contributes to SDG 10: Reduced Inequalities by providing equal access to legal information for all migrant workers.'
        }
      }
    }
  },
  ms: {
    translation: {
      app: { title: 'Right4All', tagline: 'Kenali hak anda, kekal dilindungi' },
      nav: {
        home: 'Laman Utama',
        support: 'Dapatkan Sokongan',
        rights: 'Pendidikan Hak',
        insights: 'Wawasan & Cerita',
        quiz: 'Kuiz Hak',
        tools: 'Alat',
        community: 'Komuniti'
      },
      common: { language: 'Bahasa', takeQuiz: 'Ambil Kuiz', learnMore: 'Ketahui Lagi', selectLanguage: 'Pilih bahasa' },
      home: {
        welcome: 'Kenali hak anda, kekal dilindungi',
        empowering: 'Memperkasakan',
        migrantWorkers: 'Pekerja Migran',
        withDataTools: 'dengan data, alat & sokongan',
        description: 'Pengetahuan tentang hak anda adalah langkah pertama ke arah maruah tempat kerja. Kongsi maklumat ini untuk membantu melindungi semua pekerja di Malaysia.',
        rightsGuide: 'Panduan Hak',
        labourMarket: 'Pasaran Buruh',
        stats: {
          arrivals: 'Kedatangan asing bulanan di Malaysia',
          undocumented: 'Pekerja Migran Tanpa Dokumen',
          documented: 'Pekerja Migran Berdokumen (Sehingga Tahun 2022)'
        },
        vision: {
          title: 'Visi',
          content: 'Untuk mencipta platform digital yang inklusif dan mudah diakses yang memperkasakan setiap pekerja migran di Malaysia dengan pengetahuan tentang hak mereka, membolehkan mereka hidup dan bekerja dengan maruah, keselamatan, dan kesaksamaan — menyumbang kepada kemajuan Malaysia ke arah SDG 10: Mengurangkan Ketidaksamaan.'
        },
        mission: {
          title: 'Misi',
          content: 'Misi kami adalah untuk memperkasakan pekerja migran di Malaysia dengan menyampaikan panduan pelbagai bahasa yang mudah difahami dan alat interaktif yang membantu mereka mengetahui hak mereka, memeriksa keadaan kerja mereka, dan mengakses sokongan yang selamat. Kami bertujuan untuk melindungi, mendidik, dan mengangkat komuniti migran sambil mempromosikan maruah dan mengurangkan ketidaksamaan.'
        },
        sdg: {
          title: 'Mengurangkan ketidaksamaan bermula di sini. Belajar, berhubung, dan berkembang bersama kami.',
          description: 'Melalui Right4All, kami menyumbang kepada Matlamat Pembangunan Lestari Pertubuhan Bangsa-Bangsa Bersatu 10: Mengurangkan Ketidaksamaan. Sertai kami dalam membina masa depan yang lebih saksama untuk pekerja migran di Malaysia.'
        },
        faq: {
          sectionTitle: 'Kekal Selamat, Kekal Dimaklumkan',
          sectionSubtitle: 'Kenali hak anda, kekal dilindungi',
          sectionDescription: 'Bahagian ini menunjukkan kepada anda ke mana untuk mempelajari hak, mendapatkan sokongan, atau membaca cerita.',
          homepageGuidance: 'Panduan Laman Utama',
          findNGOs: 'Cari NGO, organisasi, dan petua kehidupan praktikal',
          goToGetSupport: 'Pergi ke Dapatkan Sokongan',
          chatWithAI: 'Ada soalan? Berbual dengan Chatbot AI kami',
          learnAboutAI: 'Ketahui tentang Pembantu AI kami',
          comingSoon: 'Akan Datang',
          learnRights: 'Pelajari tentang hak buruh anda dalam bahasa yang mudah',
          goToRightsEducation: 'Pergi ke Pendidikan Hak',
          testKnowledge: 'Uji pengetahuan anda tentang hak buruh',
          exploreJobs: 'Teroka pekerjaan, dan maklumat pasaran buruh',
          goToInsightsStories: 'Pergi ke Wawasan & Cerita',
          readStories: 'Baca cerita kehidupan sebenar dari pekerja migran',
          aboutWebsite: 'Tentang Laman Web Ini',
          whoIsThisFor: 'Untuk siapa laman web ini?',
          whoIsThisForAnswer: 'Terutamanya untuk pekerja migran di Malaysia.',
          registerOrPay: 'Adakah saya perlu mendaftar atau membayar?',
          registerOrPayAnswer: 'Tidak. Ia percuma dan tidak perlu log masuk.',
          infoSafe: 'Adakah maklumat saya selamat?',
          infoSafeAnswer: 'Ya. Kami tidak mengumpul data peribadi.',
          whyFiveLanguages: 'Mengapa hanya 5 bahasa?',
          whyFiveLanguagesAnswer: 'Kerana kebanyakan pekerja dari Indonesia, Nepal, Bangladesh, dan India. Lebih banyak akan ditambah kemudian.',
          legalAdvice: 'Adakah laman web ini memberikan nasihat undang-undang?',
          legalAdviceAnswer: 'Tidak. Laman web ini hanya memberikan maklumat am. Ia tidak menggantikan nasihat kerajaan atau sokongan undang-undang profesional. Untuk masalah serius, sila hubungi JTKSM, kedutaan anda, atau NGO dalam Hub Sokongan kami.'
        },
        buttons: {
          getSupport: 'Dapatkan Sokongan',
          rightsEducation: 'Pendidikan Hak'
        },
        tagline: 'Kenali hak anda, kekal dilindungi',
        footer: {
          copyright: 'Right4All © 2025 | Memperkasa Pekerja Migran di Malaysia | Melayani SDG 10: Mengurangkan Ketidaksamaan | Lindungi • Didik • Angkat',
          disclaimer: {
            title: 'Penafian',
            content: 'Maklumat di laman web ini adalah untuk tujuan pendidikan sahaja dan tidak membentuk nasihat undang-undang. Sila rujuk pihak berkuasa berkaitan atau profesional yang berkelayakan untuk panduan khusus.'
          }
        }
      },
      quiz: {
        warning: 'Sila pilih satu pilihan.',
        correct: 'Betul!',
        incorrect: 'Salah!',
        scenario: 'SENARIO',
        submit: 'Hantar',
        next: 'Seterusnya',
        previous: 'Sebelumnya',
        viewResults: 'Lihat Keputusan',
        results: 'Keputusan',
        takeQuizInLanguage: 'Ambil kuiz dalam bahasa ini',
        interactiveQuizAvailable: 'Kuiz interaktif tersedia',
        title: 'Kuiz Kenali Hak Anda',
        subtitle: 'Uji pengetahuan anda tentang hak tempat kerja melalui kuiz interaktif. Pilih bahasa pilihan anda untuk bermula.',
        testYourKnowledge: 'Uji Pengetahuan Anda',
        testYourKnowledgeSubtitle: 'Ambil kuiz interaktif untuk menguji pemahaman anda tentang hak tempat kerja dan undang-undang buruh',
        chooseQuizCategory: 'Pilih Kategori Kuiz',
        selectedLanguage: 'Bahasa yang dipilih',
        questionsAvailable: 'soalan tersedia',
        startQuiz: 'Mula Kuiz',
        disclaimer: {
          title: 'Penafian',
          content: 'Kuiz-kuiz ini disediakan untuk tujuan pembelajaran dan penilaian kendiri sahaja. Ia bukan ujian rasmi dan tidak menjamin pematuhan undang-undang tempat kerja. Sentiasa sahkan maklumat penting dengan sumber rasmi atau profesional yang berkelayakan.'
        }
      },
      insights: {
        title: 'Pulsa Buruh',
        subtitle: 'Memahami Tenaga Kerja Migran Malaysia',
        overview: {
          title: 'Ringkasan Buruh Malaysia',
          totalWorkers: 'Jumlah Pekerja',
          statesCovered: 'Negeri Diliputi',
          topNationalities: 'Kewarganegaraan Utama'
        },
        countryComparison: {
          title: 'Perbandingan Negara',
          selectCountries: 'Pilih Negara',
          compareTop2: 'Bandingkan Negara',
          clearSelection: 'Kosongkan Pilihan',
          selectToCompare: 'Pilih Negara untuk Dibandingkan',
          chooseAtLeast2: 'Pilih sekurang-kurangnya 2 negara dari senarai untuk melihat carta perbandingan',
          countryLabel: 'Negara',
          workersLabel: 'Bilangan Pekerja'
        },
        industry: {
          title: 'Analisis Industri & Keselamatan',
          selected: 'Dipilih',
          shareAnalysis: 'Analisis Bahagian Industri',
          shareDescription: 'Carta ini menunjukkan peratusan bahagian sektor {industry} dalam populasi pekerja migran Malaysia dari 2001 hingga 2023. Angka-angka mewakili berapa peratusan semua pekerja migran di Malaysia bekerja dalam industri ini pada setiap tempoh masa.',
          higherPercentages: 'Peratusan yang lebih tinggi menunjukkan industri ini menggaji lebih ramai pekerja migran berbanding sektor lain',
          stateBreakdown: 'Pecahan Industri Negeri',
          stateDescription: 'Carta ini menunjukkan bagaimana pekerja migran di {state} diagihkan merentasi industri berbeza. Peratusan menunjukkan berapa bahagian pekerja migran {state} bekerja dalam setiap sektor.',
          clearFilter: 'Kosongkan Penapis',
          safetyRiskLevels: 'Tahap Risiko Keselamatan',
          lowRisk: 'Sedikit kemalangan dilaporkan pada 2023',
          mediumRisk: 'Bilangan kemalangan sederhana',
          highRisk: 'Banyak kemalangan—perlu berhati-hati tambahan',
          accidents2023: 'Kemalangan 2023',
          percentageMigrantWorkers: 'Peratusan Pekerja Migran',
          clickToDeselect: 'Klik untuk nyahpilih',
          clickToViewTrend: 'Klik untuk lihat trend'
        },
        map: {
          title: 'Peta Negeri Interaktif',
          clickStates: 'Klik pada negeri untuk melihat pecahan terperinci',
          viewing: 'Melihat',
          selectState: 'Pilih negeri untuk melihat pecahan industri',
          clearSelection: 'Kosongkan Pilihan',
          riskLevelInfo: 'Maklumat Tahap Risiko',
          riskDescription: 'Tahap risiko menunjukkan keselamatan tempat kerja untuk pekerja asing berdasarkan kadar kecederaan, jenis pekerjaan berbahaya, dan perlindungan ekonomi.',
          lowRiskDesc: 'Kurang bahaya dan perlindungan yang lebih baik untuk pekerja',
          highRiskDesc: 'Lebih bahaya dan kurang perlindungan untuk pekerja'
        },
        stats: {
          highestPoint: 'Titik Tertinggi',
          currentLevel: 'Tahap Semasa',
          growthPattern: 'Corak Pertumbuhan',
          growth: 'pertumbuhan',
          decline: 'penurunan',
          since2001: 'sejak 2001'
        },
        industries: {
          manufacturing: 'Pembuatan',
          construction: 'Pembinaan',
          agriculture: 'Pertanian',
          services: 'Perkhidmatan'
        }
      },
      rightsGuide: {
        title: 'Panduan Hak',
        subtitle: 'Pelajari tentang hak tempat kerja anda melalui perbualan animasi antara Maya dan Alex. Pilih topik dan kemudian pilih bahasa pilihan anda untuk menonton animasi.',
        topics: {
          topic1: 'Hak Lengkap',
          topic2: 'Perlindungan Gaji',
          topic3: 'Jam Bekerja',
          topic4: 'Piawaian Keselamatan',
          topic5: 'Penginapan',
          topic6: 'Akses Kesihatan',
          topic7: 'Terma Kontrak',
          topic8: 'Diskriminasi',
          topic9: 'Hak Kesatuan',
          topic10: 'Sokongan Undang-undang'
        },
        interactiveSections: 'bahagian interaktif',
        startLearning: 'Mula Belajar',
        chooseLanguage: 'Pilih bahasa pilihan anda',
        backToTopics: 'Kembali ke Topik',
        back: 'Kembali',
        section: 'Bahagian',
        of: 'daripada',
        dialogue: 'Dialog',
        sectionsAvailable: 'bahagian tersedia',
        interactiveLearning: 'Pembelajaran Interaktif',
        disclaimer: {
          title: 'Penafian',
          content: 'Maklumat yang disediakan dalam Panduan Hak adalah untuk tujuan pendidikan sahaja dan tidak membentuk nasihat undang-undang. Walaupun segala usaha telah dibuat untuk memastikan ketepatan, undang-undang dan peraturan tempat kerja mungkin berubah. Untuk nasihat khusus untuk situasi anda, sila rujuk profesional yang berkelayakan atau pihak berkuasa berkaitan.'
        }
      },
      community: {
        title: 'Hab Komuniti',
        subtitle: '✨ Suara sebenar. Bantuan sebenar. Kehidupan sebenar di Malaysia. ✨',
        searchHelp: 'Cari bantuan',
        searchPlaceholder: "Taipkan apa yang anda perlukan... seperti 'bantuan undang-undang' atau 'perumahan'",
        stats: {
          organizations: 'Organisasi',
          stories: 'Cerita Penyintas',
          resources: 'Petua Hidup'
        },
        tabs: {
          findHelp: {
            label: 'Cari Bantuan',
            description: 'Berhubung dengan organisasi dipercayai'
          },
          stories: {
            label: 'Cerita Penyintas',
            description: 'Belajar dari pengalaman orang lain'
          },
          resources: {
            label: 'Petua Hidup',
            description: 'Panduan praktikal untuk kehidupan harian'
          }
        },
        loading: {
          organizations: 'Memuatkan organisasi...',
          stories: 'Memuatkan cerita...',
          resources: 'Memuatkan sumber...'
        },
        notFound: {
          organizations: 'Tiada organisasi dijumpai.',
          stories: 'Tiada cerita dijumpai.',
          resources: 'Tiada sumber dijumpai.'
        },
        actions: {
          visitWebsite: 'Lawati Laman Web',
          contactAvailable: 'Hubungan Tersedia',
          clickForDetails: 'Klik untuk butiran',
          readFullStory: 'Baca Cerita Penuh',
          tipsAvailable: 'Petua Tersedia',
          clickToReadMore: 'Klik untuk baca lagi',
          clickToExpand: 'Klik untuk kembangkan'
        },
        content: {
          personalExperience: 'Pengalaman Peribadi',
          keyLessonsAndTips: 'Pengajaran & Petua Utama',
          completeStepByStepGuide: 'Panduan Langkah demi Langkah Lengkap',
          whoIsThisFor: 'Untuk siapa ini?',
          whatYouNeed: 'Apa yang anda perlukan',
          costAndTime: 'Kos & Masa',
          legalInformation: 'Maklumat undang-undang',
          problemsAndScams: 'Masalah & Penipuan yang perlu dielakkan',
          whereToGetHelp: 'Di mana untuk mendapatkan bantuan',
          stepByStepGuide: 'Panduan langkah demi langkah'
        },
        helpText: "Tidak jumpa apa yang anda perlukan? Gunakan kotak carian di atas untuk mencari bantuan, atau cuba penapis berbeza untuk menemui lebih banyak sumber."
      },
      support: {
        title: 'Dapatkan Sokongan',
        subtitle: 'Cari bantuan praktikal dan petua hidup untuk keperluan harian anda',
        stats: {
          organizations: 'Organisasi Sokongan',
          resources: 'Sumber Petua Hidup'
        },
        sections: {
          getHelp: {
            title: 'Dapatkan Bantuan',
            subtitle: 'Berhubung dengan NGO dan organisasi sokongan'
          },
          lifeHacks: {
            title: 'Petua Hidup',
            subtitle: 'Sumber praktikal untuk kehidupan harian'
          }
        },
        search: {
          placeholder: 'Cari bantuan dan sumber',
          organizationsPlaceholder: 'Cari organisasi atau petua hidup...',
          storiesPlaceholder: 'Cari cerita...'
        },
        filters: {
          getHelp: {
            allHelp: 'Semua Bantuan',
            legalAid: 'Bantuan Undang-undang',
            healthWellbeing: 'Kesihatan & Kebajikan',
            work: 'Kerja',
            otherSupport: 'Sokongan Lain'
          },
          lifeHacks: {
            allResources: 'Semua Sumber',
            workLegal: 'Kerja & Undang-undang',
            healthSafety: 'Kesihatan & Keselamatan',
            housingEveryday: 'Perumahan & Kehidupan Harian',
            moneyDaily: 'Wang & Kehidupan Harian'
          }
        },
        descriptions: {
          storiesIntro: 'Cerita-cerita ini datang dari pekerja migran sebenar. Pengalaman mereka boleh membantu membimbing dan menyokong orang lain yang menghadapi cabatan serupa.',
          immediateHelp: 'Perlukan bantuan segera? Jangan teragak-agak untuk menghubungi organisasi dan sumber ini.'
        }
      },
      insightsStories: {
        title: 'Wawasan & Cerita',
        subtitle: 'Data pasaran buruh dan pengalaman sebenar pekerja migran',
        sections: {
          labourMarket: {
            title: 'Pasaran Buruh',
            subtitle: 'Trend data dan analisis pekerjaan'
          },
          survivorStories: {
            title: 'Cerita Mangsa',
            subtitle: 'Pengalaman sebenar pekerja migran'
          }
        },
        categories: {
          allStories: 'Semua Cerita',
          legal: 'Undang-undang & Dokumen',
          fairPay: 'Gaji Adil & Upah',
          safety: 'Keselamatan & Kesihatan',
          housing: 'Perumahan & Keadaan Hidup',
          workplaceRights: 'Hak Tempat Kerja & Penghormatan',
          workingHours: 'Waktu Kerja & Syarat',
          resilience: 'Daya Tahan & Kejayaan'
        }
      },
      chatbot: {
        hero: {
          title: 'Pembantu Right4All',
          subtitle: 'Memperkasakan pekerja migran melalui AI pelbagai bahasa, data undang-undang yang disahkan, dan panduan selamat dan berempati.',
          startChatting: 'Mula Berbual'
        },
        architecture: {
          title: 'Seni Bina Sistem',
          subtitle: 'Dibina dengan teknologi AI terkini untuk menyampaikan sokongan yang tepat, selamat, dan pelbagai bahasa',
          hybridRag: {
            title: 'Sistem RAG Hibrid',
            description: 'Menggabungkan carian persamaan vektor dengan sandaran kata kunci, menggunakan API DeepSeek dengan penanaman vektor PostgreSQL dan pemadanan kata kunci yang komprehensif untuk respons yang boleh dipercayai.',
            tags: {
              deepseek: 'API DeepSeek',
              vector: 'Carian Vektor',
              keyword: 'Sandaran Kata Kunci'
            }
          },
          database: {
            title: 'Integrasi Pangkalan Data',
            description: 'Disambungkan ke PostgreSQL dengan jadual untuk panduan hak, undang-undang pekerjaan, Soalan Lazim, statistik migrasi, dan analisis perbualan. Menggunakan prosedur tersimpan untuk carian persamaan vektor.',
            tags: {
              postgresql: 'PostgreSQL',
              vectorDb: 'Pangkalan Data Vektor',
              storedProcedures: 'Prosedur Tersimpan'
            }
          },
          language: {
            title: 'Bahasa & Keselamatan',
            description: 'Menyokong 5 bahasa dengan penguatkuasaan bahasa yang ketat dan penapisan kata kunci yang komprehensif. Menolak soalan di luar topik dan mengekalkan sempadan keselamatan untuk topik pekerja migran sahaja.',
            tags: {
              languages: '5 Bahasa',
              safety: 'Penapis Keselamatan',
              topicGuard: 'Pengawal Topik'
            }
          }
        },
        performance: {
          title: 'Penanda Aras Prestasi',
          subtitle: 'Ujian bebas mengesahkan ketepatan, keselamatan, dan empati Pembantu Right4All',
          perfectPerformance: {
            title: 'Prestasi Sempurna',
            description: 'Diuji merentasi 35 soalan hak buruh — dinilai untuk ketepatan fakta, nada, keselamatan, dan sensitiviti budaya. Keputusan mengesahkan 100% ketepatan dalam penghantaran data yang disahkan dan komunikasi pelbagai bahasa yang sempurna.'
          },
          testResults: {
            title: 'Ringkasan Keputusan Ujian',
            factualAccuracy: 'Ketepatan Fakta',
            safetyTests: 'Ujian Keselamatan',
            languages: 'Bahasa',
            fullSupport: 'Sokongan Penuh'
          },
          testCases: {
            minimumWage: 'Pengiraan gaji minimum',
            overtime: 'Peraturan pembayaran kerja lebih masa',
            passport: 'Rampasan pasport',
            sickLeave: 'Hak cuti sakit',
            accommodation: 'Piawaian penginapan',
            workingHours: 'Had waktu bekerja',
            ngoSupport: 'Akses sokongan NGO',
            wageRights: 'Hak Gaji',
            legalCompliance: 'Pematuhan Undang-undang',
            safetyBoundary: 'Sempadan Keselamatan',
            employmentRights: 'Hak Pekerjaan',
            livingConditions: 'Keadaan Hidup',
            workingConditions: 'Keadaan Kerja',
            supportOrganizations: 'Organisasi Sokongan'
          }
        },
        strengths: {
          title: 'Kekuatan Utama',
          hybridRag: {
            title: 'Sistem RAG hibrid dengan carian vektor',
            description: 'Menggabungkan carian persamaan vektor dengan sandaran kata kunci untuk respons yang boleh dipercayai'
          },
          database: {
            title: 'Integrasi pangkalan data yang disahkan',
            description: 'Disambungkan ke PostgreSQL dengan panduan hak, undang-undang pekerjaan, dan statistik migrasi'
          },
          language: {
            title: 'Penguatkuasaan bahasa yang ketat',
            description: 'Mengekalkan konsistensi bahasa merentasi semua 5 bahasa yang disokong'
          },
          keyword: {
            title: 'Penapisan kata kunci yang komprehensif',
            description: '1000+ kata kunci merentasi 5 bahasa memastikan relevansi topik'
          },
          wage: {
            title: 'Keupayaan pengiraan gaji',
            description: 'Pengiraan gaji dan kerja lebih masa terbina dalam dengan pecahan langkah demi langkah'
          }
        },
        safety: {
          title: 'Ciri Keselamatan',
          topicBoundary: {
            title: 'Penguatkuasaan sempadan topik',
            description: 'Menolak soalan di luar hak pekerja migran dan isu buruh'
          },
          databaseBacked: {
            title: 'Respons berasaskan pangkalan data',
            description: 'Menggunakan data yang disahkan dari panduan hak, undang-undang, dan statistik migrasi'
          },
          fallback: {
            title: 'Perlindungan sandaran',
            description: 'Sandaran anggun kepada carian kata kunci apabila carian vektor gagal'
          },
          analytics: {
            title: 'Analisis perbualan',
            description: 'Log perbualan tanpa nama untuk pemantauan prestasi'
          },
          transparency: {
            title: 'Ketelusan sumber',
            description: 'Menyediakan petikan dan jenis sumber untuk semua respons'
          }
        },
        capabilities: {
          title: 'Apa yang Boleh Dibantu oleh Pembantu',
          subtitle: 'Sokongan komprehensif untuk pekerja migran merentasi semua bidang penting',
          wage: {
            title: 'Soalan Gaji & Gaji',
            description: 'Pengiraan gaji minimum, peraturan bayaran kerja lebih masa, potongan gaji, dan pengesahan slip gaji.'
          },
          hours: {
            title: 'Waktu Bekerja & Cuti',
            description: 'Waktu bekerja harian, hak cuti tahunan, hak cuti sakit, dan peraturan cuti umum.'
          },
          documents: {
            title: 'Dokumen & Hak Undang-undang',
            description: 'Isu pasport, permit kerja, kontrak pekerjaan, dan perlindungan hak undang-undang.'
          },
          accommodation: {
            title: 'Penginapan & Kehidupan',
            description: 'Piawaian perumahan, caj penginapan, keadaan hidup, dan kemudahan asas.'
          },
          support: {
            title: 'Sokongan & NGO',
            description: 'Mencari NGO, memfailkan aduan, kenalan Jabatan Buruh, dan organisasi sokongan.'
          },
          multilingual: {
            title: 'Sokongan Pelbagai Bahasa',
            description: 'Sokongan penuh dalam Bahasa Inggeris, Bahasa Malaysia, Hindi, Nepal, dan Bengali dengan konteks budaya.'
          }
        },
        sdg: {
          title: 'Menyokong Matlamat Pembangunan Lestari',
          description: 'Pembantu Right4All menyumbang kepada SDG 10: Mengurangkan Ketidaksamaan dengan menyediakan akses sama rata kepada maklumat undang-undang untuk semua pekerja migran.'
        }
      }
    }
  },
  ne: {
    translation: {
      app: { title: 'Right4All', tagline: 'आफ्ना अधिकार जान्नुहोस्, सुरक्षित रहनुहोस्' },
      nav: {
        home: 'घर',
        support: 'सहायता प्राप्त गर्नुहोस्',
        rights: 'अधिकार शिक्षा',
        insights: 'अन्तर्दृष्टि र कथाहरू',
        quiz: 'तपाईंको अधिकार जान्नुहोस्',
        tools: 'उपकरण',
        community: 'समुदाय'
      },
      common: { language: 'भाषा', takeQuiz: 'प्रश्नोत्तर लिनुहोस्', learnMore: 'थप जान्नुहोस्', selectLanguage: 'भाषा छान्नुहोस्' },
      home: {
        welcome: 'आफ्ना अधिकार जान्नुहोस्, सुरक्षित रहनुहोस्',
        empowering: 'सशक्तिकरण',
        migrantWorkers: 'आप्रवासी कामदारहरू',
        withDataTools: 'डेटा, उपकरण र समर्थनको साथ',
        description: 'तपाईंको अधिकारको ज्ञान कार्यस्थलको गरिमाको दिशामा पहिलो कदम हो। मलेसियाका सबै कामदारहरूलाई संरक्षण गर्न यो जानकारी साझा गर्नुहोस्।',
        rightsGuide: 'अधिकार गाइड',
        labourMarket: 'श्रम बजार',
        stats: {
          arrivals: 'मलेसियामा मासिक विदेशी आगमन',
          undocumented: 'कागजातरहित आप्रवासी कामदार',
          documented: 'कागजात भएका आप्रवासी कामदार (२०२२ सम्म)'
        },
        vision: {
          title: 'दृष्टिकोण',
          content: 'मलेसियामा प्रत्येक आप्रवासी कामदारलाई उनीहरूको अधिकारको ज्ञानले सशक्त बनाउने समावेशी र पहुँचयोग्य डिजिटल प्लेटफर्म सिर्जना गर्न, उनीहरूलाई गरिमा, सुरक्षा र समानताका साथ बाँच्न र काम गर्न सक्षम पारेर — SDG 10: असमानता घटाउने दिशामा मलेसियाको प्रगतिमा योगदान पुर्याउने।'
        },
        mission: {
          title: 'मिशन',
          content: 'हाम्रो मिशन भनेको मलेसियाका आप्रवासी कामदारहरूलाई बहुभाषिक, सजिलो-देखि-बुझ्ने गाइड र अन्तरक्रियात्मक उपकरणहरू प्रदान गरेर सशक्त बनाउनु हो जसले उनीहरूलाई आफ्ना अधिकारहरू जान्न, आफ्ना कामका अवस्थाहरू जाँच्न, र सुरक्षित सहयोग प्राप्त गर्न मद्दत गर्छ। हामी गरिमालाई बढावा दिंदै र असमानताहरू घटाउँदै आप्रवासी समुदायहरूलाई संरक्षण, शिक्षा र उत्थान गर्ने लक्ष्य राख्छौं।'
        },
        sdg: {
          title: 'असमानता घटाउने यहाँबाट सुरु हुन्छ। हामीसँग सिक्नुहोस्, जोडिनुहोस् र बढ्नुहोस्।',
          description: 'Right4All मार्फत, हामी संयुक्त राष्ट्रसंघको दिगो विकास लक्ष्य 10: असमानता घटाउनेमा योगदान गर्दैछौं। मलेसियामा आप्रवासी कामदारहरूका लागि अधिक न्यायसंगत भविष्य निर्माण गर्न हामीसँग सहभागी हुनुहोस्।'
        },
        faq: {
          sectionTitle: 'सुरक्षित रहनुहोस्, सूचित रहनुहोस्',
          sectionSubtitle: 'आफ्ना अधिकार जान्नुहोस्, सुरक्षित रहनुहोस्',
          sectionDescription: 'यो खण्डले तपाईंलाई अधिकार सिक्न, समर्थन प्राप्त गर्न, वा कथाहरू पढ्नको लागि कहाँ जाने भनेर देखाउँछ।',
          homepageGuidance: 'होमपेज मार्गदर्शन',
          findNGOs: 'एनजीओहरू, संगठनहरू, र व्यावहारिक जीवन सुझावहरू फेला पार्नुहोस्',
          goToGetSupport: 'सहयोग प्राप्त गर्न जानुहोस्',
          chatWithAI: 'प्रश्न छ? हाम्रो AI च्याटबोटसँग कुराकानी गर्नुहोस्',
          learnAboutAI: 'हाम्रो AI सहायकको बारेमा जान्नुहोस्',
          comingSoon: 'छिट्टै आउँदै',
          learnRights: 'सरल भाषामा आफ्ना श्रम अधिकारहरूको बारेमा जान्नुहोस्',
          goToRightsEducation: 'अधिकार शिक्षामा जानुहोस्',
          testKnowledge: 'श्रम अधिकारहरूको आफ्नो ज्ञान परीक्षण गर्नुहोस्',
          exploreJobs: 'जागिर र श्रम बजार जानकारी अन्वेषण गर्नुहोस्',
          goToInsightsStories: 'अन्तर्दृष्टि र कथाहरूमा जानुहोस्',
          readStories: 'आप्रवासी कामदारहरूका वास्तविक जीवनका कथाहरू पढ्नुहोस्',
          aboutWebsite: 'यस वेबसाइटको बारेमा',
          whoIsThisFor: 'यो वेबसाइट कसका लागि हो?',
          whoIsThisForAnswer: 'मुख्यतः मलेसियामा आप्रवासी कामदारहरूका लागि।',
          registerOrPay: 'के मैले दर्ता गर्नु वा पैसा तिर्नु पर्छ?',
          registerOrPayAnswer: 'होइन। यो नि:शुल्क छ र लगइनको आवश्यकता छैन।',
          infoSafe: 'के मेरो जानकारी सुरक्षित छ?',
          infoSafeAnswer: 'हो। हामी व्यक्तिगत डेटा सङ्कलन गर्दैनौं।',
          whyFiveLanguages: 'किन केवल ५ भाषाहरू मात्र?',
          whyFiveLanguagesAnswer: 'किनभने धेरैजसो कामदारहरू इन्डोनेसिया, नेपाल, बंगलादेश र भारतबाट आएका छन्। पछि थप भाषाहरू थपिनेछ।',
          legalAdvice: 'के यो वेबसाइटले कानूनी सल्लाह दिन्छ?',
          legalAdviceAnswer: 'होइन। यो साइटले केवल सामान्य जानकारी दिन्छ। यसले सरकारी सल्लाह वा व्यावसायिक कानूनी सहयोगलाई प्रतिस्थापन गर्दैन। गम्भीर समस्याहरूका लागि, कृपया JTKSM, तपाईंको दूतावास, वा हाम्रो सपोर्ट हबमा एनजीओहरूलाई सम्पर्क गर्नुहोस्।'
        },
        buttons: {
          getSupport: 'सहयोग प्राप्त गर्नुहोस्',
          rightsEducation: 'अधिकार शिक्षा'
        },
        tagline: 'आफ्ना अधिकार जान्नुहोस्, सुरक्षित रहनुहोस्',
        footer: {
          copyright: 'Right4All © 2025 | मलेसियामा आप्रवासी कामदारहरूलाई सशक्त बनाउँदै | SDG 10: असमानता घटाउने सेवा गर्दै | संरक्षण • शिक्षा • उत्थान',
          disclaimer: {
            title: 'अस्वीकरण',
            content: 'यस साइटमा जानकारी केवल शैक्षिक उद्देश्यका लागि हो र कानूनी सल्लाहको गठन गर्दैन। विशिष्ट मार्गदर्शनका लागि सम्बन्धित अधिकारीहरू वा योग्य पेशेवरहरूसँग सल्लाह गर्नुहोस्।'
          }
        }
      },
      quiz: {
        warning: 'कृपया एक विकल्प छान्नुहोस्।',
        correct: 'सही!',
        incorrect: 'गलत!',
        scenario: 'परिस्थिति',
        submit: 'उत्तर पेश गर्नुहोस्',
        next: 'अगला',
        previous: 'अघिल्लो',
        viewResults: 'परिणामहरू हेर्नुहोस्',
        results: 'परिणामहरू',
        takeQuizInLanguage: 'यस भाषामा प्रश्नोत्तर लिनुहोस्',
        interactiveQuizAvailable: 'अन्तरक्रियात्मक प्रश्नोत्तर उपलब्ध',
        title: 'आफ्ना अधिकारहरू प्रश्नोत्तर',
        subtitle: 'अन्तरक्रियात्मक प्रश्नोत्तरहरू मार्फत कार्यस्थल अधिकारहरूको बारेमा आफ्नो ज्ञान परीक्षण गर्नुहोस्। सुरु गर्न आफ्नो मनपर्ने भाषा चयन गर्नुहोस्।',
        testYourKnowledge: 'आफ्नो ज्ञान परीक्षण गर्नुहोस्',
        testYourKnowledgeSubtitle: 'कार्यस्थल अधिकार र श्रम कानूनको आफ्नो बुझाइ परीक्षण गर्न अन्तरक्रियात्मक प्रश्नोत्तरहरू लिनुहोस्',
        chooseQuizCategory: 'प्रश्नोत्तर श्रेणी छान्नुहोस्',
        selectedLanguage: 'चयनित भाषा',
        questionsAvailable: 'प्रश्नहरू उपलब्ध',
        startQuiz: 'प्रश्नोत्तर सुरु गर्नुहोस्',
        disclaimer: {
          title: 'अस्वीकरण',
          content: 'प्रश्नोत्तरहरू केवल सिकाइ र आत्म-मूल्याङ्कनका लागि प्रदान गरिएका हुन्। यी आधिकारिक परीक्षाहरू होइनन् र कार्यक्षेत्रका कानूनहरूको अनुपालनको ग्यारेन्टी गर्दैनन्। महत्वपूर्ण जानकारी सधैं आधिकारिक स्रोत वा योग्य पेशेवरहरूसँग पुष्टि गर्नुहोस्।'
        }
      },
      insights: {
        title: 'श्रम पल्स',
        subtitle: 'मलेसियाको आप्रवासी कार्यबल बुझ्दै',
        overview: {
          title: 'मलेसिया श्रम अवलोकन',
          totalWorkers: 'कुल कामदारहरू',
          statesCovered: 'राज्यहरू कभर गरियो',
          topNationalities: 'शीर्ष राष्ट्रियताहरू'
        },
        countryComparison: {
          title: 'देश तुलना',
          selectCountries: 'देशहरू चयन गर्नुहोस्',
          compareTop2: 'देशहरू तुलना गर्नुहोस्',
          clearSelection: 'चयन खाली गर्नुहोस्',
          selectToCompare: 'तुलना गर्न देशहरू चयन गर्नुहोस्',
          chooseAtLeast2: 'तुलना चार्ट हेर्न सूचीबाट कम्तिमा २ देशहरू छान्नुहोस्',
          countryLabel: 'देश',
          workersLabel: 'कामदारहरूको संख्या'
        },
        industry: {
          title: 'उद्योग विश्लेषण र सुरक्षा',
          selected: 'चयनित',
          shareAnalysis: 'उद्योग साझेदारी विश्लेषण',
          shareDescription: 'यो चार्टले २००१ देखि २०२३ सम्म मलेसियाको आप्रवासी कामदार जनसंख्यामा {industry} क्षेत्रको प्रतिशत साझेदारी देखाउँछ। संख्याहरूले प्रत्येक समयावधिमा मलेसियाका सबै आप्रवासी कामदारहरूको कति प्रतिशत यस उद्योगमा काम गर्छन् भन्ने कुरालाई जनाउँछ।',
          higherPercentages: 'उच्च प्रतिशतले यो उद्योगले अन्य क्षेत्रहरूको तुलनामा धेरै आप्रवासी कामदारहरूलाई रोजगारी दिएको संकेत गर्छ',
          stateBreakdown: 'राज्य उद्योग विभाजन',
          stateDescription: 'यो चार्टले {state} मा आप्रवासी कामदारहरू कसरी विभिन्न उद्योगहरूमा वितरण गरिएका छन् भनेर देखाउँछ। प्रतिशतले {state} का आप्रवासी कामदारहरूको कुन भाग प्रत्येक क्षेत्रमा काम गर्छ भनेर देखाउँछ।',
          clearFilter: 'फिल्टर खाली गर्नुहोस्',
          safetyRiskLevels: 'सुरक्षा जोखिम स्तरहरू',
          lowRisk: '२०२३ मा थोरै दुर्घटनाहरू रिपोर्ट गरियो',
          mediumRisk: 'मध्यम संख्यामा दुर्घटनाहरू',
          highRisk: 'धेरै दुर्घटनाहरू—अतिरिक्त सावधानी आवश्यक',
          accidents2023: 'दुर्घटनाहरू २०२३',
          percentageMigrantWorkers: 'आप्रवासी कामदारहरूको प्रतिशत',
          clickToDeselect: 'अचयन गर्न क्लिक गर्नुहोस्',
          clickToViewTrend: 'प्रवृत्ति हेर्न क्लिक गर्नुहोस्'
        },
        map: {
          title: 'अन्तरक्रियात्मक राज्य नक्सा',
          clickStates: 'विस्तृत विभाजन हेर्न राज्यहरूमा क्लिक गर्नुहोस्',
          viewing: 'हेर्दै',
          selectState: 'उद्योग विभाजन हेर्न राज्य चयन गर्नुहोस्',
          clearSelection: 'चयन खाली गर्नुहोस्',
          riskLevelInfo: 'जोखिम स्तर जानकारी',
          riskDescription: 'जोखिम स्तरले चोटपटक दर, खतरनाक काम प्रकार, र आर्थिक सुरक्षाको आधारमा विदेशी कामदारहरूको लागि कार्यस्थल सुरक्षा देखाउँछ।',
          lowRiskDesc: 'कामदारहरूको लागि कम खतरा र राम्रो सुरक्षा',
          highRiskDesc: 'कामदारहरूको लागि बढी खतरा र कम सुरक्षा'
        },
        stats: {
          highestPoint: 'उच्चतम बिन्दु',
          currentLevel: 'हालको स्तर',
          growthPattern: 'वृद्धि ढाँचा',
          growth: 'वृद्धि',
          decline: 'गिरावट',
          since2001: '२००१ देखि'
        },
        industries: {
          manufacturing: 'निर्माण',
          construction: 'निर्माण कार्य',
          agriculture: 'कृषि',
          services: 'सेवाहरू'
        }
      },
      rightsGuide: {
        title: 'अधिकार गाइड',
        subtitle: 'माया र एलेक्स बीचको एनिमेटेड कुराकानी मार्फत आफ्नो कार्यस्थल अधिकारहरू बारे जान्नुहोस्। एउटा विषय छान्नुहोस् र त्यसपछि एनिमेसन हेर्न आफ्नो मनपर्ने भाषा चयन गर्नुहोस्।',
        topics: {
          topic1: 'पूर्ण अधिकार',
          topic2: 'तलब सुरक्षा',
          topic3: 'कामको समय',
          topic4: 'सुरक्षा मानक',
          topic5: 'बस्ने ठाउँ',
          topic6: 'स्वास्थ्य सेवा पहुँच',
          topic7: 'सम्झौता शर्त',
          topic8: 'भेदभाव',
          topic9: 'युनियन अधिकार',
          topic10: 'कानूनी सहयोग'
        },
        interactiveSections: 'अन्तरक्रियात्मक खण्डहरू',
        startLearning: 'सिक्न सुरु गर्नुहोस्',
        chooseLanguage: 'आफ्नो मनपर्ने भाषा चयन गर्नुहोस्',
        backToTopics: 'विषयहरूमा फर्कनुहोस्',
        back: 'पछाडि',
        section: 'खण्ड',
        of: 'मध्ये',
        dialogue: 'संवाद',
        sectionsAvailable: 'खण्डहरू उपलब्ध',
        interactiveLearning: 'अन्तरक्रियात्मक सिकाइ',
        disclaimer: {
          title: 'अस्वीकरण',
          content: 'अधिकार गाइडमा उपलब्ध गराइएको जानकारी शैक्षिक उद्देश्यका लागि मात्र हो र यसले कानूनी सल्लाहको गठन गर्दैन। सटीकता सुनिश्चित गर्न सबै प्रयासहरू गरिएको भए तापनि, कार्यक्षेत्रका कानून र नियमहरू परिवर्तन हुन सक्छन्। तपाईंको परिस्थितिको लागि विशिष्ट सल्लाहको लागि, कृपया योग्य पेशेवर वा सम्बन्धित अधिकारीहरूसँग सल्लाह गर्नुहोस्।'
        }
      },
      community: {
        title: 'समुदायिक केन्द्र',
        subtitle: '✨ वास्तविक आवाजहरू। वास्तविक सहायता। मलेसियामा वास्तविक जीवन। ✨',
        searchHelp: 'सहायता खोज्नुहोस्',
        searchPlaceholder: "तपाईंलाई के चाहिन्छ टाइप गर्नुहोस्... जस्तै 'कानूनी सहायता' वा 'आवास'",
        stats: {
          organizations: 'संगठनहरू',
          stories: 'बाँचेकाहरूका कथाहरू',
          resources: 'जीवन ह्याकहरू'
        },
        tabs: {
          findHelp: {
            label: 'सहायता फेला पार्नुहोस्',
            description: 'विश्वसनीय संगठनहरूसँग जोडिनुहोस्'
          },
          stories: {
            label: 'बाँचेकाहरूका कथाहरू',
            description: 'अरूका अनुभवहरूबाट सिक्नुहोस्'
          },
          resources: {
            label: 'जीवन ह्याकहरू',
            description: 'दैनिक जीवनका लागि व्यावहारिक गाइडहरू'
          }
        },
        loading: {
          organizations: 'संगठनहरू लोड गर्दै...',
          stories: 'कथाहरू लोड गर्दै...',
          resources: 'स्रोतहरू लोड गर्दै...'
        },
        notFound: {
          organizations: 'कुनै संगठन फेला परेन।',
          stories: 'कुनै कथा फेला परेन।',
          resources: 'कुनै स्रोत फेला परेन।'
        },
        actions: {
          visitWebsite: 'वेबसाइट भ्रमण गर्नुहोस्',
          contactAvailable: 'सम्पर्क उपलब्ध',
          clickForDetails: 'विवरणका लागि क्लिक गर्नुहोस्',
          readFullStory: 'पूरै कथा पढ्नुहोस्',
          tipsAvailable: 'सुझावहरू उपलब्ध',
          clickToReadMore: 'थप पढ्न क्लिक गर्नुहोस्',
          clickToExpand: 'विस्तार गर्न क्लिक गर्नुहोस्'
        },
        content: {
          personalExperience: 'व्यक्तिगत अनुभव',
          keyLessonsAndTips: 'मुख्य सिकाइ र सुझावहरू',
          completeStepByStepGuide: 'पूर्ण चरणबद्ध गाइड',
          whoIsThisFor: 'यो कसका लागि हो?',
          whatYouNeed: 'तपाईंलाई के चाहिन्छ',
          costAndTime: 'लागत र समय',
          legalInformation: 'कानूनी जानकारी',
          problemsAndScams: 'समस्याहरू र घोटालाहरूबाट बच्न',
          whereToGetHelp: 'सहायता कहाँ पाउने',
          stepByStepGuide: 'चरणबद्ध गाइड'
        },
        helpText: "तपाईंलाई चाहिएको कुरा फेला पार्न सक्नुभएन? सहायता फेला पार्न माथिको खोज बाकस प्रयोग गर्नुहोस्, वा थप स्रोतहरू पत्ता लगाउन विभिन्न फिल्टरहरू प्रयास गर्नुहोस्।"
      },
      support: {
        title: 'सहायता प्राप्त गर्नुहोस्',
        subtitle: 'तपाईंको दैनिक आवश्यकताहरूको लागि व्यावहारिक सहायता र जीवन ह्याकहरू फेला पार्नुहोस्',
        stats: {
          organizations: 'सहायता संगठनहरू',
          resources: 'जीवन ह्याक स्रोतहरू'
        },
        sections: {
          getHelp: {
            title: 'सहायता पाउनुहोस्',
            subtitle: 'एनजीओ र सहायता संगठनहरूसँग जडान गर्नुहोस्'
          },
          lifeHacks: {
            title: 'जीवन ह्याकहरू',
            subtitle: 'दैनिक जीवनका लागि व्यावहारिक स्रोतहरू'
          }
        },
        search: {
          placeholder: 'सहायता र स्रोतहरू खोज्नुहोस्',
          organizationsPlaceholder: 'संगठन वा जीवन ह्याकहरू खोज्नुहोस्...',
          storiesPlaceholder: 'कथाहरू खोज्नुहोस्...'
        },
        filters: {
          getHelp: {
            allHelp: 'सबै सहायता',
            legalAid: 'कानूनी सहायता',
            healthWellbeing: 'स्वास्थ्य र कल्याण',
            work: 'काम',
            otherSupport: 'अन्य सहयोग'
          },
          lifeHacks: {
            allResources: 'सबै स्रोतहरू',
            workLegal: 'काम र कानूनी',
            healthSafety: 'स्वास्थ्य र सुरक्षा',
            housingEveryday: 'आवास र दैनिक जीवन',
            moneyDaily: 'पैसा र दैनिक जीवन'
          }
        },
        descriptions: {
          storiesIntro: 'यी कथाहरू वास्तविक प्रवासी कामदारहरूबाट आउँछन्। तिनीहरूका अनुभवहरूले समान चुनौतीहरूको सामना गर्ने अरूलाई मार्गदर्शन र समर्थन गर्न मद्दत गर्न सक्छ।',
          immediateHelp: 'तत्काल सहायता चाहिन्छ? यी संगठन र स्रोतहरूसँग सम्पर्क गर्न हिचकिचाउनुहोस्।'
        }
      },
      insightsStories: {
        title: 'अन्तर्दृष्टि र कथाहरू',
        subtitle: 'श्रम बजार डेटा र आप्रवासी कामदारहरूको वास्तविक अनुभवहरू',
        sections: {
          labourMarket: {
            title: 'श्रम बजार',
            subtitle: 'डेटा प्रवृत्ति र रोजगार विश्लेषण'
          },
          survivorStories: {
            title: 'बाँचेकाहरूका कथाहरू',
            subtitle: 'आप्रवासी कामदारहरूका वास्तविक अनुभवहरू'
          }
        },
        categories: {
          allStories: 'सबै कथाहरू',
          legal: 'कानूनी र कागजातहरू',
          fairPay: 'निष्पक्ष तलब र ज्यालाहरू',
          safety: 'सुरक्षा र स्वास्थ्य',
          housing: 'आवास र बस्ने अवस्था',
          workplaceRights: 'कार्यस्थल अधिकार र सम्मान',
          workingHours: 'काम गर्ने घण्टा र अवस्था',
          resilience: 'लचक र सफलता'
        }
      },
      chatbot: {
        hero: {
          title: 'Right4All सहायक',
          subtitle: 'बहुभाषी AI, प्रमाणित कानूनी डेटा, र सुरक्षित, सहानुभूतिपूर्ण मार्गदर्शन मार्फत आप्रवासी कामदारहरूलाई सशक्त बनाउँदै।',
          startChatting: 'कुराकानी सुरु गर्नुहोस्'
        },
        architecture: {
          title: 'सिस्टम आर्किटेक्चर',
          subtitle: 'सटीक, सुरक्षित र बहुभाषी समर्थन प्रदान गर्न अत्याधुनिक AI प्रविधिसँग निर्मित',
          hybridRag: {
            title: 'हाइब्रिड RAG सिस्टम',
            description: 'भेक्टर समानता खोजलाई कीवर्ड फलब्याकसँग जोड्छ, विश्वसनीय प्रतिक्रियाहरूको लागि PostgreSQL भेक्टर एम्बेडिङ र व्यापक कीवर्ड मिलानको साथ DeepSeek API प्रयोग गर्दछ।',
            tags: {
              deepseek: 'DeepSeek API',
              vector: 'भेक्टर खोज',
              keyword: 'कीवर्ड फलब्याक'
            }
          },
          database: {
            title: 'डेटाबेस एकीकरण',
            description: 'अधिकार गाइडहरू, रोजगार कानूनहरू, FAQs, प्रवासन तथ्याङ्कहरू, र कुराकानी विश्लेषणको लागि तालिकाहरूसँग PostgreSQL मा जडान गरिएको। भेक्टर समानता खोजको लागि भण्डारण प्रक्रियाहरू प्रयोग गर्दछ।',
            tags: {
              postgresql: 'PostgreSQL',
              vectorDb: 'भेक्टर डीबी',
              storedProcedures: 'भण्डारण प्रक्रियाहरू'
            }
          },
          language: {
            title: 'भाषा र सुरक्षा',
            description: 'कडा भाषा प्रवर्तन र व्यापक कीवर्ड फिल्टरिङको साथ ५ भाषाहरू समर्थन गर्दछ। विषयबाहिरका प्रश्नहरू अस्वीकार गर्दछ र केवल आप्रवासी कामदार विषयहरूको लागि सुरक्षा सीमाहरू कायम राख्दछ।',
            tags: {
              languages: '५ भाषाहरू',
              safety: 'सुरक्षा फिल्टर',
              topicGuard: 'विषय गार्ड'
            }
          }
        },
        performance: {
          title: 'प्रदर्शन बेंचमार्क',
          subtitle: 'स्वतन्त्र परीक्षणले Right4All सहायकको सटीकता, सुरक्षा र सहानुभूति प्रमाणित गर्दछ',
          perfectPerformance: {
            title: 'उत्तम प्रदर्शन',
            description: '३५ श्रम अधिकार प्रश्नहरूमा परीक्षण गरियो — तथ्यात्मक शुद्धता, स्वर, सुरक्षा, र सांस्कृतिक संवेदनशीलताको लागि मूल्याङ्कन गरियो। परिणामहरूले प्रमाणित डेटा वितरणमा १००% सटीकता र निर्दोष बहुभाषी संचारको पुष्टि गर्छन्।'
          },
          testResults: {
            title: 'परीक्षण परिणाम सारांश',
            factualAccuracy: 'तथ्यात्मक सटीकता',
            safetyTests: 'सुरक्षा परीक्षणहरू',
            languages: 'भाषाहरू',
            fullSupport: 'पूर्ण समर्थन'
          },
          testCases: {
            minimumWage: 'न्यूनतम तलब गणना',
            overtime: 'ओभरटाइम भुक्तानी नियम',
            passport: 'राहदानी जफत',
            sickLeave: 'बिरामीको छुट्टीको अधिकार',
            accommodation: 'बस्ने ठाउँको मानक',
            workingHours: 'कामको समय सीमा',
            ngoSupport: 'एनजीओ सहायता पहुँच',
            wageRights: 'तलब अधिकार',
            legalCompliance: 'कानूनी अनुपालन',
            safetyBoundary: 'सुरक्षा सीमा',
            employmentRights: 'रोजगार अधिकार',
            livingConditions: 'बस्ने अवस्था',
            workingConditions: 'कामको अवस्था',
            supportOrganizations: 'सहायता संगठनहरू'
          }
        },
        strengths: {
          title: 'मुख्य शक्तिहरू',
          hybridRag: {
            title: 'भेक्टर खोजसँग हाइब्रिड RAG सिस्टम',
            description: 'विश्वसनीय प्रतिक्रियाहरूको लागि भेक्टर समानता खोजलाई कीवर्ड फलब्याकसँग जोड्दछ'
          },
          database: {
            title: 'प्रमाणित डेटाबेस एकीकरण',
            description: 'अधिकार गाइडहरू, रोजगार कानूनहरू, र प्रवासन तथ्याङ्कहरूसँग PostgreSQL मा जडान गरिएको'
          },
          language: {
            title: 'कडा भाषा प्रवर्तन',
            description: 'सबै ५ समर्थित भाषाहरूमा भाषा स्थिरता कायम राख्दछ'
          },
          keyword: {
            title: 'व्यापक कीवर्ड फिल्टरिङ',
            description: '५ भाषाहरूमा १०००+ कीवर्डहरूले विषय प्रासंगिकता सुनिश्चित गर्छन्'
          },
          wage: {
            title: 'तलब गणना क्षमताहरू',
            description: 'चरण-दर-चरण विभाजनसँग अन्तर्निहित तलब र ओभरटाइम गणना'
          }
        },
        safety: {
          title: 'सुरक्षा सुविधाहरू',
          topicBoundary: {
            title: 'विषय सीमा प्रवर्तन',
            description: 'आप्रवासी कामदार अधिकारहरू र श्रम मुद्दाहरू बाहिरका प्रश्नहरू अस्वीकार गर्दछ'
          },
          databaseBacked: {
            title: 'डेटाबेस-समर्थित प्रतिक्रियाहरू',
            description: 'अधिकार गाइडहरू, कानूनहरू, र प्रवासन तथ्याङ्कहरूबाट प्रमाणित डेटा प्रयोग गर्दछ'
          },
          fallback: {
            title: 'फलब्याक सुरक्षा',
            description: 'भेक्टर खोज असफल भएमा कीवर्ड खोजमा सहज फलब्याक'
          },
          analytics: {
            title: 'कुराकानी विश्लेषण',
            description: 'प्रदर्शन निगरानीको लागि अनाम कुराकानी लगिङ'
          },
          transparency: {
            title: 'स्रोत पारदर्शिता',
            description: 'सबै प्रतिक्रियाहरूको लागि उद्धरण र स्रोत प्रकारहरू प्रदान गर्दछ'
          }
        },
        capabilities: {
          title: 'सहायकले केमा मद्दत गर्न सक्छ',
          subtitle: 'सबै आवश्यक क्षेत्रहरूमा आप्रवासी कामदारहरूको लागि व्यापक समर्थन',
          wage: {
            title: 'तलब र वेतन प्रश्नहरू',
            description: 'न्यूनतम तलब गणना, ओभरटाइम भुक्तानी नियम, तलब कटौती, र तलब स्लिप प्रमाणीकरण।'
          },
          hours: {
            title: 'कामको समय र छुट्टी',
            description: 'दैनिक कामको समय, वार्षिक छुट्टीको अधिकार, बिरामीको छुट्टीको अधिकार, र सार्वजनिक बिदाका नियम।'
          },
          documents: {
            title: 'कागजात र कानूनी अधिकार',
            description: 'राहदानी समस्याहरू, काम अनुमतिपत्र, रोजगार सम्झौता, र कानूनी अधिकार सुरक्षा।'
          },
          accommodation: {
            title: 'बस्ने ठाउँ र जीवन',
            description: 'आवास मानक, बस्ने ठाउँको शुल्क, बस्ने अवस्था, र आधारभूत सुविधाहरू।'
          },
          support: {
            title: 'सहायता र एनजीओहरू',
            description: 'एनजीओहरू फेला पार्ने, शिकायत दर्ता गर्ने, श्रम विभाग सम्पर्क, र सहायता संगठनहरू।'
          },
          multilingual: {
            title: 'बहुभाषी समर्थन',
            description: 'अंग्रेजी, बहासा मलेशिया, हिन्दी, नेपाली, र बंगालीमा सांस्कृतिक संदर्भसँग पूर्ण समर्थन।'
          }
        },
        sdg: {
          title: 'सतत विकास लक्ष्यहरूको समर्थन',
          description: 'Right4All सहायकले सबै आप्रवासी कामदारहरूलाई कानूनी जानकारीमा समान पहुँच प्रदान गरेर SDG 10: असमानताहरू घटाउनेमा योगदान दिन्छ।'
        }
      }
    }
  },
  hi: {
    translation: {
      app: { title: 'Right4All', tagline: 'अपने अधिकार जानें, सुरक्षित रहें' },
      nav: {
        home: 'होम',
        support: 'सहायता प्राप्त करें',
        rights: 'अधिकार शिक्षा',
        insights: 'अंतर्दृष्टि और कहानियां',
        quiz: 'अपने अधिकार जानें',
        tools: 'उपकरण',
        community: 'समुदाय'
      },
      common: { language: 'भाषा', takeQuiz: 'क्विज़ लें', learnMore: 'और जानें', selectLanguage: 'भाषा चुनें' },
      home: {
        welcome: 'अपने अधिकार जानें, सुरक्षित रहें',
        empowering: 'सशक्तिकरण',
        migrantWorkers: 'प्रवासी श्रमिक',
        withDataTools: 'डेटा, उपकरण और समर्थन के साथ',
        description: 'आपके अधिकारों की जानकारी कार्यस्थल की गरिमा की दिशा में पहला कदम है। मलेशिया में सभी श्रमिकों की सुरक्षा के लिए इस जानकारी को साझा करें।',
        rightsGuide: 'अधिकार गाइड',
        labourMarket: 'श्रम बाज़ार',
        stats: {
          arrivals: 'मलेशिया में मासिक विदेशी आगमन',
          undocumented: 'बिना दस्तावेज़ प्रवासी श्रमिक',
          documented: 'दस्तावेज़ सहित प्रवासी श्रमिक (2022 तक)'
        },
        vision: {
          title: 'दृष्टि',
          content: 'मलेशिया में प्रत्येक प्रवासी श्रमिक को उनके अधिकारों के ज्ञान से सशक्त बनाने वाला एक समावेशी और सुलभ डिजिटल प्लेटफॉर्म बनाना, जो उन्हें गरिमा, सुरक्षा और समानता के साथ जीने और काम करने में सक्षम बनाए — SDG 10: असमानताओं में कमी की दिशा में मलेशिया की प्रगति में योगदान देते हुए।'
        },
        mission: {
          title: 'मिशन',
          content: 'हमारा मिशन मलेशिया में प्रवासी श्रमिकों को बहुभाषी, समझने में आसान गाइड और इंटरैक्टिव उपकरण प्रदान करके सशक्त बनाना है जो उन्हें अपने अधिकारों को जानने, अपनी कार्य स्थितियों की जांच करने और सुरक्षित सहायता तक पहुंचने में मदद करते हैं। हमारा लक्ष्य गरिमा को बढ़ावा देते हुए और असमानताओं को कम करते हुए प्रवासी समुदायों की सुरक्षा, शिक्षा और उत्थान करना है।'
        },
        sdg: {
          title: 'असमानता कम करना यहाँ से शुरू होता है। हमारे साथ सीखें, जुड़ें और बढ़ें।',
          description: 'Right4All के माध्यम से, हम संयुक्त राष्ट्र सतत विकास लक्ष्य 10: असमानताओं में कमी में योगदान दे रहे हैं। मलेशिया में प्रवासी श्रमिकों के लिए अधिक न्यायसंगत भविष्य बनाने में हमारे साथ जुड़ें।'
        },
        faq: {
          sectionTitle: 'सुरक्षित रहें, सूचित रहें',
          sectionSubtitle: 'अपने अधिकार जानें, सुरक्षित रहें',
          sectionDescription: 'यह अनुभाग आपको दिखाता है कि अधिकार सीखने, समर्थन प्राप्त करने, या कहानियां पढ़ने के लिए कहाँ जाना है।',
          homepageGuidance: 'होमपेज मार्गदर्शन',
          findNGOs: 'एनजीओ, संगठन और व्यावहारिक जीवन सुझाव खोजें',
          goToGetSupport: 'सहायता प्राप्त करने जाएं',
          chatWithAI: 'कोई सवाल है? हमारे AI चैटबॉट से बात करें',
          learnAboutAI: 'हमारे AI सहायक के बारे में जानें',
          comingSoon: 'जल्द आ रहा है',
          learnRights: 'सरल भाषा में अपने श्रम अधिकारों के बारे में जानें',
          goToRightsEducation: 'अधिकार शिक्षा में जाएं',
          testKnowledge: 'श्रम अधिकारों के अपने ज्ञान का परीक्षण करें',
          exploreJobs: 'नौकरियां और श्रम बाज़ार की जानकारी देखें',
          goToInsightsStories: 'अंतर्दृष्टि और कहानियों में जाएं',
          readStories: 'प्रवासी श्रमिकों की वास्तविक जीवन कहानियां पढ़ें',
          aboutWebsite: 'इस वेबसाइट के बारे में',
          whoIsThisFor: 'यह वेबसाइट किसके लिए है?',
          whoIsThisForAnswer: 'मुख्यतः मलेशिया में प्रवासी श्रमिकों के लिए।',
          registerOrPay: 'क्या मुझे रजिस्टर करना या भुगतान करना होगा?',
          registerOrPayAnswer: 'नहीं। यह मुफ्त है और लॉगिन की आवश्यकता नहीं है।',
          infoSafe: 'क्या मेरी जानकारी सुरक्षित है?',
          infoSafeAnswer: 'हाँ। हम व्यक्तिगत डेटा एकत्र नहीं करते हैं।',
          whyFiveLanguages: 'केवल 5 भाषाएं क्यों?',
          whyFiveLanguagesAnswer: 'क्योंकि अधिकांश श्रमिक इंडोनेशिया, नेपाल, बांग्लादेश और भारत से हैं। बाद में और भाषाएं जोड़ी जाएंगी।',
          legalAdvice: 'क्या यह वेबसाइट कानूनी सलाह देती है?',
          legalAdviceAnswer: 'नहीं। यह साइट केवल सामान्य जानकारी देती है। यह सरकारी सलाह या पेशेवर कानूनी सहायता की जगह नहीं लेती। गंभीर समस्याओं के लिए, कृपया JTKSM, अपने दूतावास, या हमारे सहायता केंद्र में एनजीओ से संपर्क करें।'
        },
        buttons: {
          getSupport: 'सहायता प्राप्त करें',
          rightsEducation: 'अधिकार शिक्षा'
        },
        tagline: 'अपने अधिकार जानें, सुरक्षित रहें',
        footer: {
          copyright: 'Right4All © 2025 | मलेशिया में प्रवासी श्रमिकों को सशक्त बनाना | SDG 10: असमानताओं में कमी की सेवा | सुरक्षा • शिक्षा • उत्थान',
          disclaimer: {
            title: 'अस्वीकरण',
            content: 'इस साइट की जानकारी केवल शैक्षणिक उद्देश्यों के लिए है और कानूनी सलाह का गठन नहीं करती है। विशिष्ट मार्गदर्शन के लिए कृपया संबंधित अधिकारियों या योग्य पेशेवरों से सलाह लें।'
          }
        }
      },
      quiz: {
        warning: 'कृपया एक विकल्प चुनें।',
        correct: 'सही!',
        incorrect: 'गलत!',
        scenario: 'स्थिति',
        submit: 'जवाब जमा करें',
        next: 'अगला',
        previous: 'पिछला',
        viewResults: 'परिणाम देखें',
        results: 'परिणाम',
        takeQuizInLanguage: 'इस भाषा में क्विज़ लें',
        interactiveQuizAvailable: 'इंटरैक्टिव क्विज़ उपलब्ध',
        title: 'अपने अधिकारों की क्विज़',
        subtitle: 'इंटरैक्टिव क्विज़ के माध्यम से कार्यस्थल अधिकारों के बारे में अपने ज्ञान का परीक्षण करें। शुरू करने के लिए अपनी पसंदीदा भाषा चुनें।',
        testYourKnowledge: 'अपना ज्ञान परखें',
        testYourKnowledgeSubtitle: 'कार्यस्थल अधिकारों और श्रम कानूनों की अपनी समझ का परीक्षण करने के लिए इंटरैक्टिव क्विज़ लें',
        chooseQuizCategory: 'क्विज़ श्रेणी चुनें',
        selectedLanguage: 'चयनित भाषा',
        questionsAvailable: 'प्रश्न उपलब्ध',
        startQuiz: 'क्विज़ शुरू करें',
        disclaimer: {
          title: 'अस्वीकरण',
          content: 'क्विज़ केवल सीखने और स्व-मूल्यांकन के उद्देश्यों के लिए प्रदान की गई हैं। ये आधिकारिक परीक्षाएं नहीं हैं और कार्यस्थल कानूनों के अनुपालन की गारंटी नहीं देतीं। महत्वपूर्ण जानकारी हमेशा आधिकारिक स्रोतों या योग्य पेशेवरों से पुष्टि करें।'
        }
      },
      insights: {
        title: 'श्रम पल्स',
        subtitle: 'मलेशिया के प्रवासी कार्यबल को समझना',
        overview: {
          title: 'मलेशिया श्रम अवलोकन',
          totalWorkers: 'कुल श्रमिक',
          statesCovered: 'राज्य कवर किए गए',
          topNationalities: 'शीर्ष राष्ट्रीयताएं'
        },
        countryComparison: {
          title: 'देश तुलना',
          selectCountries: 'देश चुनें',
          compareTop2: 'देशों की तुलना करें',
          clearSelection: 'चयन साफ़ करें',
          selectToCompare: 'तुलना के लिए देश चुनें',
          chooseAtLeast2: 'तुलना चार्ट देखने के लिए सूची से कम से कम 2 देश चुनें',
          countryLabel: 'देश',
          workersLabel: 'श्रमिकों की संख्या'
        },
        industry: {
          title: 'उद्योग विश्लेषण और सुरक्षा',
          selected: 'चयनित',
          shareAnalysis: 'उद्योग हिस्सेदारी विश्लेषण',
          shareDescription: 'यह चार्ट 2001 से 2023 तक मलेशिया की प्रवासी श्रमिक आबादी में {industry} सेक्टर की प्रतिशत हिस्सेदारी दिखाता है। संख्याएं बताती हैं कि प्रत्येक समय अवधि में मलेशिया के सभी प्रवासी श्रमिकों का कितना प्रतिशत इस उद्योग में काम करता है।',
          higherPercentages: 'अधिक प्रतिशत दर्शाता है कि इस उद्योग ने अन्य क्षेत्रों की तुलना में अधिक प्रवासी श्रमिकों को रोजगार दिया',
          stateBreakdown: 'राज्य उद्योग विभाजन',
          stateDescription: 'यह चार्ट दिखाता है कि {state} में प्रवासी श्रमिक विभिन्न उद्योगों में कैसे वितरित हैं। प्रतिशत दर्शाता है कि {state} के प्रवासी श्रमिकों का कितना हिस्सा प्रत्येक क्षेत्र में काम करता है।',
          clearFilter: 'फ़िल्टर साफ़ करें',
          safetyRiskLevels: 'सुरक्षा जोखिम स्तर',
          lowRisk: '2023 में कम दुर्घटनाएं रिपोर्ट की गईं',
          mediumRisk: 'मध्यम संख्या में दुर्घटनाएं',
          highRisk: 'अधिक दुर्घटनाएं—अतिरिक्त सावधानी की आवश्यकता',
          accidents2023: 'दुर्घटनाएं 2023',
          percentageMigrantWorkers: 'प्रवासी श्रमिकों का प्रतिशत',
          clickToDeselect: 'अचयन के लिए क्लिक करें',
          clickToViewTrend: 'रुझान देखने के लिए क्लिक करें'
        },
        map: {
          title: 'इंटरैक्टिव राज्य मानचित्र',
          clickStates: 'विस्तृत विभाजन देखने के लिए राज्यों पर क्लिक करें',
          viewing: 'देख रहे हैं',
          selectState: 'उद्योग विभाजन देखने के लिए राज्य चुनें',
          clearSelection: 'चयन साफ़ करें',
          riskLevelInfo: 'जोखिम स्तर की जानकारी',
          riskDescription: 'जोखिम स्तर चोट दर, खतरनाक कार्य प्रकार, और आर्थिक सुरक्षा के आधार पर विदेशी श्रमिकों के लिए कार्यस्थल सुरक्षा दिखाता है।',
          lowRiskDesc: 'श्रमिकों के लिए कम खतरा और बेहतर सुरक्षा',
          highRiskDesc: 'श्रमिकों के लिए अधिक खतरा और कम सुरक्षा'
        },
        stats: {
          highestPoint: 'उच्चतम बिंदु',
          currentLevel: 'वर्तमान स्तर',
          growthPattern: 'विकास पैटर्न',
          growth: 'विकास',
          decline: 'गिरावट',
          since2001: '2001 से'
        },
        industries: {
          manufacturing: 'विनिर्माण',
          construction: 'निर्माण',
          agriculture: 'कृषि',
          services: 'सेवाएं'
        }
      },
      rightsGuide: {
        title: 'अधिकार गाइड',
        subtitle: 'माया और एलेक्स के बीच एनिमेटेड वार्तालाप के माध्यम से अपने कार्यस्थल अधिकारों के बारे में जानें। एक विषय चुनें और फिर एनीमेशन देखने के लिए अपनी पसंदीदा भाषा चुनें।',
        topics: {
          topic1: 'पूर्ण अधिकार',
          topic2: 'वेतन सुरक्षा',
          topic3: 'कार्य घंटे',
          topic4: 'सुरक्षा मानक',
          topic5: 'आवास',
          topic6: 'स्वास्थ्य सेवा पहुंच',
          topic7: 'अनुबंध शर्तें',
          topic8: 'भेदभाव',
          topic9: 'यूनियन अधिकार',
          topic10: 'कानूनी सहायता'
        },
        interactiveSections: 'इंटरैक्टिव सेक्शन',
        startLearning: 'सीखना शुरू करें',
        chooseLanguage: 'अपनी पसंदीदा भाषा चुनें',
        backToTopics: 'विषयों पर वापस जाएं',
        back: 'वापस',
        section: 'सेक्शन',
        of: 'में से',
        dialogue: 'संवाद',
        sectionsAvailable: 'सेक्शन उपलब्ध',
        interactiveLearning: 'इंटरैक्टिव लर्निंग',
        disclaimer: {
          title: 'अस्वीकरण',
          content: 'अधिकार गाइड में प्रदान की गई जानकारी केवल शैक्षणिक उद्देश्यों के लिए है और यह कानूनी सलाह का गठन नहीं करती है। सटीकता सुनिश्चित करने के लिए हर प्रयास किया गया है, लेकिन कार्यस्थल के कानून और नियम बदल सकते हैं। आपकी स्थिति के लिए विशिष्ट सलाह के लिए, कृपया किसी योग्य पेशेवर या संबंधित अधिकारियों से सलाह लें।'
        }
      },
      community: {
        title: 'कम्युनिटी हब',
        subtitle: '✨ वास्तविक आवाजें। वास्तविक मदद। मलेशिया में वास्तविक जीवन। ✨',
        searchHelp: 'मदद खोजें',
        searchPlaceholder: "आपको क्या चाहिए टाइप करें... जैसे 'कानूनी मदद' या 'आवास'",
        stats: {
          organizations: 'संगठन',
          stories: 'बचे हुए लोगों की कहानियां',
          resources: 'लाइफ हैक्स'
        },
        tabs: {
          findHelp: {
            label: 'मदद खोजें',
            description: 'विश्वसनीय संगठनों से जुड़ें'
          },
          stories: {
            label: 'बचे हुए लोगों की कहानियां',
            description: 'दूसरों के अनुभवों से सीखें'
          },
          resources: {
            label: 'लाइफ हैक्स',
            description: 'दैनिक जीवन के लिए व्यावहारिक गाइड'
          }
        },
        loading: {
          organizations: 'संगठन लोड हो रहे हैं...',
          stories: 'कहानियां लोड हो रही हैं...',
          resources: 'संसाधन लोड हो रहे हैं...'
        },
        notFound: {
          organizations: 'कोई संगठन नहीं मिला।',
          stories: 'कोई कहानी नहीं मिली।',
          resources: 'कोई संसाधन नहीं मिला।'
        },
        actions: {
          visitWebsite: 'वेबसाइट पर जाएं',
          contactAvailable: 'संपर्क उपलब्ध',
          clickForDetails: 'विवरण के लिए क्लिक करें',
          readFullStory: 'पूरी कहानी पढ़ें',
          tipsAvailable: 'सुझाव उपलब्ध',
          clickToReadMore: 'और पढ़ने के लिए क्लिक करें',
          clickToExpand: 'विस्तार के लिए क्लिक करें'
        },
        content: {
          personalExperience: 'व्यक्तिगत अनुभव',
          keyLessonsAndTips: 'मुख्य सीख और सुझाव',
          completeStepByStepGuide: 'पूर्ण चरणबद्ध गाइड',
          whoIsThisFor: 'यह किसके लिए है?',
          whatYouNeed: 'आपको क्या चाहिए',
          costAndTime: 'लागत और समय',
          legalInformation: 'कानूनी जानकारी',
          problemsAndScams: 'समस्याएं और घोटाले से बचें',
          whereToGetHelp: 'मदद कहां मिलेगी',
          stepByStepGuide: 'चरणबद्ध गाइड'
        },
        helpText: "आपको जो चाहिए वह नहीं मिल रहा? मदद पाने के लिए ऊपर खोज बॉक्स का उपयोग करें, या अधिक संसाधन खोजने के लिए विभिन्न फिल्टर आज़माएं।"
      },
      support: {
        title: 'सहायता प्राप्त करें',
        subtitle: 'अपनी दैनिक आवश्यकताओं के लिए व्यावहारिक सहायता और जीवन हैक्स खोजें',
        stats: {
          organizations: 'सहायता संगठन',
          resources: 'लाइफ हैक संसाधन'
        },
        sections: {
          getHelp: {
            title: 'सहायता प्राप्त करें',
            subtitle: 'एनजीओ और सहायता संगठनों से जुड़ें'
          },
          lifeHacks: {
            title: 'लाइफ हैक्स',
            subtitle: 'दैनिक जीवन के लिए व्यावहारिक संसाधन'
          }
        },
        search: {
          placeholder: 'मदद और संसाधन खोजें',
          organizationsPlaceholder: 'संगठन या जीवन हैक्स खोजें...',
          storiesPlaceholder: 'कहानियां खोजें...'
        },
        filters: {
          getHelp: {
            allHelp: 'सभी मदद',
            legalAid: 'कानूनी सहायता',
            healthWellbeing: 'स्वास्थ्य और कल्याण',
            work: 'काम',
            otherSupport: 'अन्य सहायता'
          },
          lifeHacks: {
            allResources: 'सभी संसाधन',
            workLegal: 'काम और कानूनी',
            healthSafety: 'स्वास्थ्य और सुरक्षा',
            housingEveryday: 'आवास और दैनिक जीवन',
            moneyDaily: 'पैसा और दैनिक जीवन'
          }
        },
        descriptions: {
          storiesIntro: 'ये कहानियां वास्तविक प्रवासी श्रमिकों से आती हैं। उनके अनुभव समान चुनौतियों का सामना करने वाले अन्य लोगों का मार्गदर्शन और समर्थन करने में मदद कर सकते हैं।',
          immediateHelp: 'तत्काल सहायता चाहिए? इन संगठनों और संसाधनों से संपर्क करने में संकोच न करें।'
        }
      },
      insightsStories: {
        title: 'अंतर्दृष्टि और कहानियां',
        subtitle: 'श्रम बाज़ार डेटा और प्रवासी श्रमिकों के वास्तविक अनुभव',
        sections: {
          labourMarket: {
            title: 'श्रम बाज़ार',
            subtitle: 'डेटा रुझान और रोजगार विश्लेषण'
          },
          survivorStories: {
            title: 'बचे हुए लोगों की कहानियां',
            subtitle: 'प्रवासी श्रमिकों के वास्तविक अनुभव'
          }
        },
        categories: {
          allStories: 'सभी कहानियां',
          legal: 'कानूनी और दस्तावेज',
          fairPay: 'निष्पक्ष वेतन और मजदूरी',
          safety: 'सुरक्षा और स्वास्थ्य',
          housing: 'आवास और रहने की स्थिति',
          workplaceRights: 'कार्यस्थल अधिकार और सम्मान',
          workingHours: 'कार्य घंटे और शर्तें',
          resilience: 'लचीलापन और सफलता'
        }
      },
      chatbot: {
        hero: {
          title: 'Right4All असिस्टेंट',
          subtitle: 'बहुभाषी AI, सत्यापित कानूनी डेटा, और सुरक्षित, सहानुभूतिपूर्ण मार्गदर्शन के माध्यम से प्रवासी श्रमिकों को सशक्त बनाना।',
          startChatting: 'चैटिंग शुरू करें'
        },
        architecture: {
          title: 'सिस्टम आर्किटेक्चर',
          subtitle: 'सटीक, सुरक्षित और बहुभाषी समर्थन देने के लिए अत्याधुनिक AI तकनीक के साथ निर्मित',
          hybridRag: {
            title: 'हाइब्रिड RAG सिस्टम',
            description: 'वेक्टर समानता खोज को कीवर्ड फॉलबैक के साथ जोड़ता है, विश्वसनीय प्रतिक्रियाओं के लिए PostgreSQL वेक्टर एम्बेडिंग और व्यापक कीवर्ड मिलान के साथ DeepSeek API का उपयोग करता है।',
            tags: {
              deepseek: 'DeepSeek API',
              vector: 'वेक्टर खोज',
              keyword: 'कीवर्ड फॉलबैक'
            }
          },
          database: {
            title: 'डेटाबेस एकीकरण',
            description: 'अधिकार गाइड, रोजगार कानून, FAQs, प्रवासन सांख्यिकी, और वार्तालाप विश्लेषण के लिए तालिकाओं के साथ PostgreSQL से जुड़ा हुआ है। वेक्टर समानता खोज के लिए संग्रहीत प्रक्रियाओं का उपयोग करता है।',
            tags: {
              postgresql: 'PostgreSQL',
              vectorDb: 'वेक्टर डीबी',
              storedProcedures: 'संग्रहीत प्रक्रियाएं'
            }
          },
          language: {
            title: 'भाषा और सुरक्षा',
            description: 'सख्त भाषा प्रवर्तन और व्यापक कीवर्ड फ़िल्टरिंग के साथ 5 भाषाओं का समर्थन करता है। ऑफ-टॉपिक प्रश्नों को अस्वीकार करता है और केवल प्रवासी श्रमिक विषयों के लिए सुरक्षा सीमाएं बनाए रखता है।',
            tags: {
              languages: '5 भाषाएं',
              safety: 'सुरक्षा फ़िल्टर',
              topicGuard: 'विषय गार्ड'
            }
          }
        },
        performance: {
          title: 'प्रदर्शन बेंचमार्क',
          subtitle: 'स्वतंत्र परीक्षण Right4All असिस्टेंट की सटीकता, सुरक्षा और सहानुभूति को मान्य करता है',
          perfectPerformance: {
            title: 'परफेक्ट परफॉर्मेंस',
            description: '35 श्रम अधिकार प्रश्नों में परीक्षण किया गया — तथ्यात्मक शुद्धता, स्वर, सुरक्षा और सांस्कृतिक संवेदनशीलता के लिए मूल्यांकन किया गया। परिणाम सत्यापित डेटा वितरण में 100% सटीकता और निर्दोष बहुभाषी संचरण की पुष्टि करते हैं।'
          },
          testResults: {
            title: 'टेस्ट रिजल्ट्स सारांश',
            factualAccuracy: 'तथ्यात्मक सटीकता',
            safetyTests: 'सुरक्षा परीक्षण',
            languages: 'भाषाएं',
            fullSupport: 'पूर्ण समर्थन'
          },
          testCases: {
            minimumWage: 'न्यूनतम वेतन गणना',
            overtime: 'ओवरटाइम भुगतान नियम',
            passport: 'पासपोर्ट जब्ती',
            sickLeave: 'बीमारी की छुट्टी का अधिकार',
            accommodation: 'आवास मानक',
            workingHours: 'कार्य घंटे सीमा',
            ngoSupport: 'एनजीओ सहायता पहुंच',
            wageRights: 'वेतन अधिकार',
            legalCompliance: 'कानूनी अनुपालन',
            safetyBoundary: 'सुरक्षा सीमा',
            employmentRights: 'रोजगार अधिकार',
            livingConditions: 'रहने की स्थिति',
            workingConditions: 'कार्य स्थितियां',
            supportOrganizations: 'सहायता संगठन'
          }
        },
        strengths: {
          title: 'मुख्य शक्तियां',
          hybridRag: {
            title: 'वेक्टर खोज के साथ हाइब्रिड RAG सिस्टम',
            description: 'विश्वसनीय प्रतिक्रियाओं के लिए वेक्टर समानता खोज को कीवर्ड फॉलबैक के साथ जोड़ता है'
          },
          database: {
            title: 'सत्यापित डेटाबेस एकीकरण',
            description: 'अधिकार गाइड, रोजगार कानून, और प्रवासन सांख्यिकी के साथ PostgreSQL से जुड़ा हुआ है'
          },
          language: {
            title: 'सख्त भाषा प्रवर्तन',
            description: 'सभी 5 समर्थित भाषाओं में भाषा स्थिरता बनाए रखता है'
          },
          keyword: {
            title: 'व्यापक कीवर्ड फ़िल्टरिंग',
            description: '5 भाषाओं में 1000+ कीवर्ड विषय प्रासंगिकता सुनिश्चित करते हैं'
          },
          wage: {
            title: 'वेतन गणना क्षमताएं',
            description: 'चरण-दर-चरण विभाजन के साथ अंतर्निहित वेतन और ओवरटाइम गणना'
          }
        },
        safety: {
          title: 'सुरक्षा सुविधाएं',
          topicBoundary: {
            title: 'विषय सीमा प्रवर्तन',
            description: 'प्रवासी श्रमिक अधिकारों और श्रम मुद्दों के बाहर के प्रश्नों को अस्वीकार करता है'
          },
          databaseBacked: {
            title: 'डेटाबेस-समर्थित प्रतिक्रियाएं',
            description: 'अधिकार गाइड, कानूनों, और प्रवासन सांख्यिकी से सत्यापित डेटा का उपयोग करता है'
          },
          fallback: {
            title: 'फॉलबैक सुरक्षा',
            description: 'वेक्टर खोज विफल होने पर कीवर्ड खोज के लिए सहज फॉलबैक'
          },
          analytics: {
            title: 'वार्तालाप विश्लेषण',
            description: 'प्रदर्शन निगरानी के लिए अनाम वार्तालाप लॉगिंग'
          },
          transparency: {
            title: 'स्रोत पारदर्शिता',
            description: 'सभी प्रतिक्रियाओं के लिए उद्धरण और स्रोत प्रकार प्रदान करता है'
          }
        },
        capabilities: {
          title: 'असिस्टेंट किसमें मदद कर सकता है',
          subtitle: 'सभी आवश्यक क्षेत्रों में प्रवासी श्रमिकों के लिए व्यापक समर्थन',
          wage: {
            title: 'वेतन और वेतन प्रश्न',
            description: 'न्यूनतम वेतन गणना, ओवरटाइम भुगतान नियम, वेतन कटौती, और वेतन स्लिप सत्यापन।'
          },
          hours: {
            title: 'कार्य घंटे और छुट्टी',
            description: 'दैनिक कार्य घंटे, वार्षिक छुट्टी का अधिकार, बीमारी की छुट्टी के अधिकार, और सार्वजनिक अवकाश नियम।'
          },
          documents: {
            title: 'दस्तावेज और कानूनी अधिकार',
            description: 'पासपोर्ट मुद्दे, कार्य परमिट, रोजगार अनुबंध, और कानूनी अधिकार संरक्षण।'
          },
          accommodation: {
            title: 'आवास और रहन-सहन',
            description: 'आवास मानक, आवास शुल्क, रहने की स्थिति, और बुनियादी सुविधाएं।'
          },
          support: {
            title: 'सहायता और एनजीओ',
            description: 'एनजीओ ढूंढना, शिकायत दर्ज करना, श्रम विभाग संपर्क, और सहायता संगठन।'
          },
          multilingual: {
            title: 'बहुभाषी समर्थन',
            description: 'अंग्रेजी, बहासा मलेशिया, हिंदी, नेपाली, और बंगाली में सांस्कृतिक संदर्भ के साथ पूर्ण समर्थन।'
          }
        },
        sdg: {
          title: 'सतत विकास लक्ष्यों का समर्थन',
          description: 'Right4All असिस्टेंट सभी प्रवासी श्रमिकों को कानूनी जानकारी तक समान पहुंच प्रदान करके SDG 10: असमानताओं में कमी में योगदान देता है।'
        }
      }
    }
  },
  bn: {
    translation: {
      app: { title: 'Right4All', tagline: 'আপনার অধিকার জানুন, সুরক্ষিত থাকুন' },
      nav: {
        home: 'হোম',
        support: 'সহায়তা পান',
        rights: 'অধিকার শিক্ষা',
        insights: 'অন্তর্দৃষ্টি এবং গল্প',
        quiz: 'আপনার অধিকার জানুন',
        tools: 'টুলস',
        community: 'কমিউনিটি'
      },
      common: { language: 'ভাষা', takeQuiz: 'কুইজ নিন', learnMore: 'আরো জানুন', selectLanguage: 'ভাষা নির্বাচন করুন' },
      home: {
        welcome: 'আপনার অধিকার জানুন, সুরক্ষিত থাকুন',
        empowering: 'ক্ষমতায়ন',
        migrantWorkers: 'অভিবাসী শ্রমিক',
        withDataTools: 'তথ্য, সরঞ্জাম এবং সহায়তা সহ',
        description: 'আপনার অধিকার সম্পর্কে জ্ঞান কর্মক্ষেত্রের মর্যাদার দিকে প্রথম পদক্ষেপ। মালয়েশিয়ার সব শ্রমিকদের সুরক্ষার জন্য এই তথ্য শেয়ার করুন।',
        rightsGuide: 'অধিকার গাইড',
        labourMarket: 'শ্রমবাজার',
        stats: {
          arrivals: 'মালয়েশিয়ায় মাসিক বিদেশি আগমন',
          undocumented: 'নথিবিহীন অভিবাসী শ্রমিক',
          documented: 'নথিসহ অভিবাসী শ্রমিক (২০২২ সাল পর্যন্ত)'
        },
        vision: {
          title: 'দৃষ্টিভঙ্গি',
          content: 'মালয়েশিয়ার প্রতিটি অভিবাসী শ্রমিককে তাদের অধিকারের জ্ঞান দিয়ে ক্ষমতায়ন করে এমন একটি অন্তর্ভুক্তিমূলক এবং অ্যাক্সেসযোগ্য ডিজিটাল প্ল্যাটফর্ম তৈরি করা, যা তাদের মর্যাদা, নিরাপত্তা এবং সমতার সাথে বাঁচতে ও কাজ করতে সক্ষম করে — SDG 10: অসমতা হ্রাসের দিকে মালয়েশিয়ার অগ্রগতিতে অবদান রেখে।'
        },
        mission: {
          title: 'মিশন',
          content: 'আমাদের মিশন হলো মালয়েশিয়ার অভিবাসী শ্রমিকদের বহুভাষিক, সহজবোধ্য গাইড এবং ইন্টারঅ্যাক্টিভ টুল সরবরাহ করে ক্ষমতায়ন করা যা তাদের তাদের অধিকার জানতে, তাদের কাজের অবস্থা পরীক্ষা করতে এবং নিরাপদ সহায়তা অ্যাক্সেস করতে সাহায্য করে। আমাদের লক্ষ্য হলো মর্যাদা প্রচার এবং অসমতা হ্রাস করতে গিয়ে অভিবাসী সম্প্রদায়দের সুরক্ষা, শিক্ষা এবং উন্নতি সাধন করা।'
        },
        sdg: {
          title: 'অসমতা হ্রাস এখানে শুরু হয়। আমাদের সাথে শিখুন, যুক্ত হন এবং বৃদ্ধি করুন।',
          description: 'Right4All-এর মাধ্যমে, আমরা সংযুক্ত জাতিসংঘের সাস্টেইনেবল ডেভেলপমেন্ট গোল 10: অসমতা হ্রাসে অবদান রাখছি। মালয়েশিয়ায় অভিবাসী শ্রমিকদের জন্য আরো ন্যায্য ভবিষ্যৎ গড়তে আমাদের সাথে যুক্ত হন।'
        },
        faq: {
          sectionTitle: 'নিরাপদ থাকুন, অবহিত থাকুন',
          sectionSubtitle: 'আপনার অধিকার জানুন, সুরক্ষিত থাকুন',
          sectionDescription: 'এই বিভাগটি আপনাকে দেখায় যে অধিকার শেখা, সহায়তা পাওয়া বা গল্প পড়ার জন্য কোথায় যেতে হবে।',
          homepageGuidance: 'হোমপেজ গাইডেন্স',
          findNGOs: 'এনজিও, সংস্থা এবং ব্যবহারিক জীবনের টিপস খুঁজুন',
          goToGetSupport: 'সহায়তা পেতে যান',
          chatWithAI: 'কোনো প্রশ্ন আছে? আমাদের AI চ্যাটবটের সাথে কথা বলুন',
          learnAboutAI: 'আমাদের AI সহায়ক সম্পর্কে জানুন',
          comingSoon: 'শীঘ্রই আসছে',
          learnRights: 'সহজ ভাষায় আপনার শ্রম অধিকার সম্পর্কে জানুন',
          goToRightsEducation: 'অধিকার শিক্ষায় যান',
          testKnowledge: 'শ্রম অধিকারের আপনার জ্ঞান পরীক্ষা করুন',
          exploreJobs: 'চাকরি এবং শ্রমবাজারের তথ্য অন্বেষণ করুন',
          goToInsightsStories: 'অন্তর্দৃষ্টি ও গল্পে যান',
          readStories: 'অভিবাসী শ্রমিকদের বাস্তব জীবনের গল্প পড়ুন',
          aboutWebsite: 'এই ওয়েবসাইট সম্পর্কে',
          whoIsThisFor: 'এই ওয়েবসাইট কার জন্য?',
          whoIsThisForAnswer: 'মূলত মালয়েশিয়ার অভিবাসী শ্রমিকদের জন্য।',
          registerOrPay: 'আমার কি নিবন্ধন করতে বা অর্থ প্রদান করতে হবে?',
          registerOrPayAnswer: 'না। এটি বিনামূল্যে এবং লগইনের প্রয়োজন নেই।',
          infoSafe: 'আমার তথ্য কি নিরাপদ?',
          infoSafeAnswer: 'হ্যাঁ। আমরা ব্যক্তিগত ডেটা সংগ্রহ করি না।',
          whyFiveLanguages: 'কেন শুধুমাত্র ৫টি ভাষা?',
          whyFiveLanguagesAnswer: 'কারণ বেশিরভাগ শ্রমিক ইন্দোনেশিয়া, নেপাল, বাংলাদেশ এবং ভারত থেকে এসেছেন। পরে আরো ভাষা যোগ করা হবে।',
          legalAdvice: 'এই ওয়েবসাইট কি আইনি পরামর্শ দেয়?',
          legalAdviceAnswer: 'না। এই সাইট শুধুমাত্র সাধারণ তথ্য প্রদান করে। এটি সরকারি পরামর্শ বা পেশাদার আইনি সহায়তার বিকল্প নয়। গুরুতর সমস্যার জন্য, অনুগ্রহ করে JTKSM, আপনার দূতাবাস, বা আমাদের সাপোর্ট হাবের এনজিওদের সাথে যোগাযোগ করুন।'
        },
        buttons: {
          getSupport: 'সহায়তা পান',
          rightsEducation: 'অধিকার শিক্ষা'
        },
        tagline: 'আপনার অধিকার জানুন, সুরক্ষিত থাকুন',
        footer: {
          copyright: 'Right4All © 2025 | মালয়েশিয়ায় অভিবাসী শ্রমিকদের ক্ষমতায়ন | SDG 10: অসমতা হ্রাসের সেবা | সুরক্ষা • শিক্ষা • উন্নতি',
          disclaimer: {
            title: 'দাবিত্যাগ',
            content: 'এই সাইটের তথ্য শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে এবং আইনগত পরামর্শ গঠন করে না। নির্দিষ্ট নির্দেশনার জন্য অনুগ্রহ করে সংশ্লিষ্ট কর্তৃপক্ষ বা যোগ্য পেশাদারদের সাথে পরামর্শ করুন।'
          }
        }
      },
      quiz: {
        warning: 'অনুগ্রহ করে একটি বিকল্প বেছে নিন।',
        correct: 'সঠিক!',
        incorrect: 'ভুল!',
        scenario: 'পরিস্থিতি',
        submit: 'উত্তর জমা দিন',
        next: 'পরবর্তী',
        previous: 'পূর্ববর্তী',
        viewResults: 'ফলাফল দেখুন',
        results: 'ফলাফল',
        takeQuizInLanguage: 'এই ভাষায় কুইজ নিন',
        interactiveQuizAvailable: 'ইন্টারেক্টিভ কুইজ উপলব্ধ',
        title: 'আপনার অধিকার সম্পর্কে কুইজ',
        subtitle: 'ইন্টারেক্টিভ কুইজের মাধ্যমে কর্মক্ষেত্রের অধিকার সম্পর্কে আপনার জ্ঞান পরীক্ষা করুন। শুরু করতে আপনার পছন্দের ভাষা নির্বাচন করুন।',
        testYourKnowledge: 'আপনার জ্ঞান পরীক্ষা করুন',
        testYourKnowledgeSubtitle: 'কর্মক্ষেত্রের অধিকার এবং শ্রম আইন সম্পর্কে আপনার বোঝা পরীক্ষা করতে ইন্টারেক্টিভ কুইজ নিন',
        chooseQuizCategory: 'কুইজ বিভাগ নির্বাচন করুন',
        selectedLanguage: 'নির্বাচিত ভাষা',
        questionsAvailable: 'প্রশ্ন উপলব্ধ',
        startQuiz: 'কুইজ শুরু করুন',
        disclaimer: {
          title: 'দাবিত্যাগ',
          content: 'কুইজগুলি শুধুমাত্র শিক্ষা এবং স্ব-মূল্যায়নের উদ্দেশ্যে প্রদান করা হয়েছে। এগুলি সরকারি পরীক্ষা নয় এবং কর্মক্ষেত্রের আইন মেনে চলার নিশ্চয়তা দেয় না। গুরুত্বপূর্ণ তথ্য সবসময় সরকারি সূত্র বা যোগ্য পেশাদারদের সাথে নিশ্চিত করুন।'
        }
      },
      insights: {
        title: 'শ্রম পালস',
        subtitle: 'মালয়েশিয়ার অভিবাসী কর্মশক্তি বুঝতে',
        overview: {
          title: 'মালয়েশিয়া শ্রম পর্যালোচনা',
          totalWorkers: 'মোট শ্রমিক',
          statesCovered: 'রাজ্য কভার করা হয়েছে',
          topNationalities: 'শীর্ষ জাতীয়তা'
        },
        countryComparison: {
          title: 'দেশ তুলনা',
          selectCountries: 'দেশ নির্বাচন করুন',
          compareTop2: 'দেশের তুলনা করুন',
          clearSelection: 'নির্বাচন পরিষ্কার করুন',
          selectToCompare: 'তুলনার জন্য দেশ নির্বাচন করুন',
          chooseAtLeast2: 'তুলনা চার্ট দেখতে তালিকা থেকে কমপক্ষে ২টি দেশ বেছে নিন',
          countryLabel: 'দেশ',
          workersLabel: 'শ্রমিকের সংখ্যা'
        },
        industry: {
          title: 'শিল্প বিশ্লেষণ ও নিরাপত্তা',
          selected: 'নির্বাচিত',
          shareAnalysis: 'শিল্প অংশীদারিত্ব বিশ্লেষণ',
          shareDescription: 'এই চার্টটি ২০০১ থেকে ২০২৩ সাল পর্যন্ত মালয়েশিয়ার অভিবাসী শ্রমিক জনসংখ্যায় {industry} সেক্টরের শতাংশ অংশীদারিত্ব দেখায়। সংখ্যাগুলি প্রতিটি সময়কালে মালয়েশিয়ার সমস্ত অভিবাসী শ্রমিকের কত শতাংশ এই শিল্পে কাজ করে তা প্রতিনিধিত্ব করে।',
          higherPercentages: 'উচ্চ শতাংশ নির্দেশ করে যে এই শিল্প অন্যান্য সেক্টরের তুলনায় আরও অভিবাসী শ্রমিকদের কর্মসংস্থান দিয়েছে',
          stateBreakdown: 'রাজ্য শিল্প বিভাজন',
          stateDescription: 'এই চার্টটি দেখায় যে {state} এ অভিবাসী শ্রমিকরা বিভিন্ন শিল্পে কীভাবে বিতরণ করা হয়েছে। শতাংশ দেখায় যে {state} এর অভিবাসী শ্রমিকদের কত অংশ প্রতিটি সেক্টরে কাজ করে।',
          clearFilter: 'ফিল্টার পরিষ্কার করুন',
          safetyRiskLevels: 'নিরাপত্তা ঝুঁকির স্তর',
          lowRisk: '২০২৩ সালে কম দুর্ঘটনার রিপোর্ট',
          mediumRisk: 'মাঝারি সংখ্যক দুর্ঘটনা',
          highRisk: 'অনেক দুর্ঘটনা—অতিরিক্ত সতর্কতা প্রয়োজন',
          accidents2023: 'দুর্ঘটনা ২০২৩',
          percentageMigrantWorkers: 'অভিবাসী শ্রমিকের শতাংশ',
          clickToDeselect: 'বাতিল করতে ক্লিক করুন',
          clickToViewTrend: 'প্রবণতা দেখতে ক্লিক করুন'
        },
        map: {
          title: 'ইন্টারেক্টিভ রাজ্য মানচিত্র',
          clickStates: 'বিস্তারিত বিভাজন দেখতে রাজ্যগুলিতে ক্লিক করুন',
          viewing: 'দেখছি',
          selectState: 'শিল্প বিভাজন দেখতে একটি রাজ্য নির্বাচন করুন',
          clearSelection: 'নির্বাচন পরিষ্কার করুন',
          riskLevelInfo: 'ঝুঁকির স্তরের তথ্য',
          riskDescription: 'ঝুঁকির স্তর আঘাতের হার, বিপজ্জনক কাজের ধরন এবং অর্থনৈতিক সুরক্ষার ভিত্তিতে বিদেশি শ্রমিকদের জন্য কর্মক্ষেত্রের নিরাপত্তা দেখায়।',
          lowRiskDesc: 'শ্রমিকদের জন্য কম বিপদ এবং ভাল সুরক্ষা',
          highRiskDesc: 'শ্রমিকদের জন্য বেশি বিপদ এবং কম সুরক্ষা'
        },
        stats: {
          highestPoint: 'সর্বোচ্চ পয়েন্ট',
          currentLevel: 'বর্তমান স্তর',
          growthPattern: 'বৃদ্ধির প্যাটার্ন',
          growth: 'বৃদ্ধি',
          decline: 'হ্রাস',
          since2001: '২০০১ থেকে'
        },
        industries: {
          manufacturing: 'Manufacturing',
          construction: 'Construction',
          agriculture: 'Agriculture',
          services: 'Services'
        }
      },
      rightsGuide: {
        title: 'অধিকার গাইড',
        subtitle: 'মায়া এবং অ্যালেক্সের মধ্যে অ্যানিমেটেড কথোপকথনের মাধ্যমে আপনার কর্মক্ষেত্রের অধিকার সম্পর্কে জানুন। একটি বিষয় চয়ন করুন এবং তারপর অ্যানিমেশন দেখতে আপনার পছন্দের ভাষা নির্বাচন করুন।',
        topics: {
          topic1: 'সম্পূর্ণ অধিকার',
          topic2: 'মজুরি সুরক্ষা',
          topic3: 'কাজের সময়',
          topic4: 'নিরাপত্তা মান',
          topic5: 'বাসস্থান',
          topic6: 'স্বাস্থ্যসেবা অ্যাক্সেস',
          topic7: 'চুক্তির শর্ত',
          topic8: 'বৈষম্য',
          topic9: 'ইউনিয়ন অধিকার',
          topic10: 'আইনি সহায়তা'
        },
        interactiveSections: 'ইন্টারেক্টিভ বিভাগ',
        startLearning: 'শেখা শুরু করুন',
        chooseLanguage: 'আপনার পছন্দের ভাষা নির্বাচন করুন',
        backToTopics: 'বিষয়গুলিতে ফিরে যান',
        back: 'পিছনে',
        section: 'বিভাগ',
        of: 'এর',
        dialogue: 'সংলাপ',
        sectionsAvailable: 'বিভাগ উপলব্ধ',
        interactiveLearning: 'ইন্টারেক্টিভ লার্নিং',
        disclaimer: {
          title: 'দাবিত্যাগ',
          content: 'অধিকার গাইডে প্রদত্ত তথ্য শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে এবং এটি আইনগত পরামর্শ গঠন করে না। নির্ভুলতা নিশ্চিত করার জন্য সর্বাত্মক চেষ্টা করা হয়েছে, তবে কর্মক্ষেত্রের আইন ও নিয়মকানুন পরিবর্তন হতে পারে। আপনার পরিস্থিতির জন্য নির্দিষ্ট পরামর্শের জন্য, অনুগ্রহ করে একজন যোগ্য পেশাদার বা সংশ্লিষ্ট কর্তৃপক্ষের সাথে পরামর্শ করুন।'
        }
      },
      community: {
        title: 'কমিউনিটি হাব',
        subtitle: '✨ সত্যিকারের কণ্ঠস্বর। সত্যিকারের সাহায্য। মালয়েশিয়ায় সত্যিকারের জীবন। ✨',
        searchHelp: 'সাহায্য খুঁজুন',
        searchPlaceholder: "আপনার কী প্রয়োজন টাইপ করুন... যেমন 'আইনি সাহায্য' বা 'আবাসন'",
        stats: {
          organizations: 'সংস্থা',
          stories: 'বেঁচে থাকা ব্যক্তিদের গল্প',
          resources: 'লাইফ হ্যাকস'
        },
        tabs: {
          findHelp: {
            label: 'সাহায্য খুঁজুন',
            description: 'বিশ্বস্ত সংস্থাগুলির সাথে যোগ দিন'
          },
          stories: {
            label: 'বেঁচে থাকা ব্যক্তিদের গল্প',
            description: 'অন্যদের অভিজ্ঞতা থেকে শিখুন'
          },
          resources: {
            label: 'লাইফ হ্যাকস',
            description: 'দৈনন্দিন জীবনের জন্য ব্যবহারিক গাইড'
          }
        },
        loading: {
          organizations: 'সংস্থা লোড হচ্ছে...',
          stories: 'গল্প লোড হচ্ছে...',
          resources: 'সম্পদ লোড হচ্ছে...'
        },
        notFound: {
          organizations: 'কোনো সংস্থা পাওয়া যায়নি।',
          stories: 'কোনো গল্প পাওয়া যায়নি।',
          resources: 'কোনো সম্পদ পাওয়া যায়নি।'
        },
        actions: {
          visitWebsite: 'ওয়েবসাইট ভিজিট করুন',
          contactAvailable: 'যোগাযোগ উপলব্ধ',
          clickForDetails: 'বিস্তারিতের জন্য ক্লিক করুন',
          readFullStory: 'সম্পূর্ণ গল্প পড়ুন',
          tipsAvailable: 'টিপস উপলব্ধ',
          clickToReadMore: 'আরো পড়তে ক্লিক করুন',
          clickToExpand: 'বিস্তার করতে ক্লিক করুন'
        },
        content: {
          personalExperience: 'ব্যক্তিগত অভিজ্ঞতা',
          keyLessonsAndTips: 'মূল শিক্ষা ও টিপস',
          completeStepByStepGuide: 'সম্পূর্ণ ধাপে ধাপে গাইড',
          whoIsThisFor: 'এটি কার জন্য?',
          whatYouNeed: 'আপনার কী প্রয়োজন',
          costAndTime: 'খরচ ও সময়',
          legalInformation: 'আইনি তথ্য',
          problemsAndScams: 'সমস্যা ও প্রতারণা এড়াতে',
          whereToGetHelp: 'কোথায় সাহায্য পাবেন',
          stepByStepGuide: 'ধাপে ধাপে গাইড'
        },
        helpText: "আপনার প্রয়োজনীয় কিছু খুঁজে পাচ্ছেন না? সাহায্য খুঁজতে উপরের সার্চ বক্স ব্যবহার করুন, অথবা আরো সম্পদ আবিষ্কার করতে বিভিন্ন ফিল্টার চেষ্টা করুন।"
      },
      support: {
        title: 'সহায়তা পান',
        subtitle: 'আপনার দৈনন্দিন প্রয়োজনের জন্য ব্যবহারিক সাহায্য এবং লাইফ হ্যাকস খুঁজুন',
        stats: {
          organizations: 'সহায়তা সংস্থা',
          resources: 'লাইফ হ্যাক সম্পদ'
        },
        sections: {
          getHelp: {
            title: 'সাহায্য পান',
            subtitle: 'এনজিও এবং সহায়তা সংস্থাগুলির সাথে যোগাযোগ করুন'
          },
          lifeHacks: {
            title: 'লাইফ হ্যাকস',
            subtitle: 'দৈনন্দিন জীবনের জন্য ব্যবহারিক সম্পদ'
          }
        },
        search: {
          placeholder: 'সাহায্য ও সম্পদ খুঁজুন',
          organizationsPlaceholder: 'সংস্থা বা জীবন হ্যাক খুঁজুন...',
          storiesPlaceholder: 'গল্প খুঁজুন...'
        },
        filters: {
          getHelp: {
            allHelp: 'সব সাহায্য',
            legalAid: 'আইনি সহায়তা',
            healthWellbeing: 'স্বাস্থ্য ও কল্যাণ',
            work: 'কাজ',
            otherSupport: 'অন্যান্য সহায়তা'
          },
          lifeHacks: {
            allResources: 'সব সম্পদ',
            workLegal: 'কাজ ও আইনি',
            healthSafety: 'স্বাস্থ্য ও নিরাপত্তা',
            housingEveryday: 'আবাসন ও দৈনন্দিন জীবন',
            moneyDaily: 'অর্থ ও দৈনন্দিন জীবন'
          }
        },
        descriptions: {
          storiesIntro: 'এই গল্পগুলি প্রকৃত প্রবাসী শ্রমিকদের কাছ থেকে এসেছে। তাদের অভিজ্ঞতা অনুরূপ চ্যালেঞ্জের মুখোমুখি অন্যদের গাইড এবং সমর্থন করতে সাহায্য করতে পারে।',
          immediateHelp: 'তাত্ক্ষণিক সাহায্য প্রয়োজন? এই সংস্থা এবং সম্পদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।'
        }
      },
      insightsStories: {
        title: 'অন্তর্দৃষ্টি এবং গল্প',
        subtitle: 'শ্রমবাজার ডেটা এবং অভিবাসী শ্রমিকদের বাস্তব অভিজ্ঞতা',
        sections: {
          labourMarket: {
            title: 'শ্রমবাজার',
            subtitle: 'ডেটা প্রবণতা এবং কর্মসংস্থান বিশ্লেষণ'
          },
          survivorStories: {
            title: 'বেঁচে থাকা ব্যক্তিদের গল্প',
            subtitle: 'অভিবাসী শ্রমিকদের বাস্তব অভিজ্ঞতা'
          }
        },
        categories: {
          allStories: 'সব গল্প',
          legal: 'আইনি এবং নথিপত্র',
          fairPay: 'ন্যায্য বেতন এবং মজুরি',
          safety: 'নিরাপত্তা এবং স্বাস্থ্য',
          housing: 'আবাসন এবং বসবাসের অবস্থা',
          workplaceRights: 'কর্মক্ষেত্রের অধিকার এবং সম্মান',
          workingHours: 'কাজের সময় এবং শর্তাবলী',
          resilience: 'স্থিতিস্থাপকতা এবং সাফল্য'
        }
      },
      chatbot: {
        hero: {
          title: 'Right4All সহায়ক',
          subtitle: 'বহুভাষিক AI, যাচাইকৃত আইনি ডেটা, এবং নিরাপদ, সহানুভূতিশীল নির্দেশনার মাধ্যমে অভিবাসী শ্রমিকদের ক্ষমতায়ন করা।',
          startChatting: 'চ্যাটিং শুরু করুন'
        },
        architecture: {
          title: 'সিস্টেম আর্কিটেকচার',
          subtitle: 'সঠিক, নিরাপদ এবং বহুভাষিক সমর্থন প্রদানের জন্য অত্যাধুনিক AI প্রযুক্তি দিয়ে নির্মিত',
          hybridRag: {
            title: 'হাইব্রিড RAG সিস্টেম',
            description: 'ভেক্টর সাদৃশ্য অনুসন্ধানকে কীওয়ার্ড ফলব্যাকের সাথে একত্রিত করে, নির্ভরযোগ্য প্রতিক্রিয়ার জন্য PostgreSQL ভেক্টর এম্বেডিং এবং ব্যাপক কীওয়ার্ড ম্যাচিং সহ DeepSeek API ব্যবহার করে।',
            tags: {
              deepseek: 'DeepSeek API',
              vector: 'ভেক্টর অনুসন্ধান',
              keyword: 'কীওয়ার্ড ফলব্যাক'
            }
          },
          database: {
            title: 'ডেটাবেস ইন্টিগ্রেশন',
            description: 'অধিকার গাইড, কর্মসংস্থান আইন, FAQs, অভিবাসন পরিসংখ্যান, এবং কথোপকথন বিশ্লেষণের জন্য টেবিল সহ PostgreSQL-এর সাথে সংযুক্ত। ভেক্টর সাদৃশ্য অনুসন্ধানের জন্য সংরক্ষিত পদ্ধতি ব্যবহার করে।',
            tags: {
              postgresql: 'PostgreSQL',
              vectorDb: 'ভেক্টর ডিবি',
              storedProcedures: 'সংরক্ষিত পদ্ধতি'
            }
          },
          language: {
            title: 'ভাষা এবং নিরাপত্তা',
            description: 'কঠোর ভাষা প্রয়োগ এবং ব্যাপক কীওয়ার্ড ফিল্টারিং সহ ৫টি ভাষা সমর্থন করে। বিষয়বহির্ভূত প্রশ্ন প্রত্যাখ্যান করে এবং শুধুমাত্র অভিবাসী শ্রমিক বিষয়গুলির জন্য নিরাপত্তা সীমানা বজায় রাখে।',
            tags: {
              languages: '৫টি ভাষা',
              safety: 'নিরাপত্তা ফিল্টার',
              topicGuard: 'বিষয় গার্ড'
            }
          }
        },
        performance: {
          title: 'পারফরম্যান্স বেঞ্চমার্ক',
          subtitle: 'স্বাধীন পরীক্ষা Right4All সহায়কের নির্ভুলতা, নিরাপত্তা এবং সহানুভূতি যাচাই করে',
          perfectPerformance: {
            title: 'নিখুঁত পারফরম্যান্স',
            description: '৩৫টি শ্রম অধিকার প্রশ্নে পরীক্ষিত — সত্যতা, স্বর, নিরাপত্তা এবং সাংস্কৃতিক সংবেদনশীলতার জন্য মূল্যায়ন করা হয়েছে। ফলাফল যাচাইকৃত ডেটা বিতরণে ১০০% নির্ভুলতা এবং নিখুঁত বহুভাষিক যোগাযোগ নিশ্চিত করে।'
          },
          testResults: {
            title: 'পরীক্ষার ফলাফল সারসংক্ষেপ',
            factualAccuracy: 'সত্যতা',
            safetyTests: 'নিরাপত্তা পরীক্ষা',
            languages: 'ভাষা',
            fullSupport: 'সম্পূর্ণ সমর্থন'
          },
          testCases: {
            minimumWage: 'ন্যূনতম মজুরি গণনা',
            overtime: 'ওভারটাইম পেমেন্ট নিয়ম',
            passport: 'পাসপোর্ট বাজেয়াপ্ত',
            sickLeave: 'অসুস্থ ছুটির অধিকার',
            accommodation: 'আবাসন মান',
            workingHours: 'কাজের সময় সীমা',
            ngoSupport: 'এনজিও সহায়তা অ্যাক্সেস',
            wageRights: 'মজুরি অধিকার',
            legalCompliance: 'আইনি সম্মতি',
            safetyBoundary: 'নিরাপত্তা সীমানা',
            employmentRights: 'কর্মসংস্থান অধিকার',
            livingConditions: 'বাসস্থানের অবস্থা',
            workingConditions: 'কাজের অবস্থা',
            supportOrganizations: 'সহায়তা সংস্থা'
          }
        },
        strengths: {
          title: 'প্রধান শক্তি',
          hybridRag: {
            title: 'ভেক্টর অনুসন্ধান সহ হাইব্রিড RAG সিস্টেম',
            description: 'নির্ভরযোগ্য প্রতিক্রিয়ার জন্য ভেক্টর সাদৃশ্য অনুসন্ধানকে কীওয়ার্ড ফলব্যাকের সাথে একত্রিত করে'
          },
          database: {
            title: 'যাচাইকৃত ডেটাবেস ইন্টিগ্রেশন',
            description: 'অধিকার গাইড, কর্মসংস্থান আইন, এবং অভিবাসন পরিসংখ্যান সহ PostgreSQL-এর সাথে সংযুক্ত'
          },
          language: {
            title: 'কঠোর ভাষা প্রয়োগ',
            description: 'সমস্ত ৫টি সমর্থিত ভাষায় ভাষার ধারাবাহিকতা বজায় রাখে'
          },
          keyword: {
            title: 'ব্যাপক কীওয়ার্ড ফিল্টারিং',
            description: '৫টি ভাষায় ১০০০+ কীওয়ার্ড বিষয় প্রাসঙ্গিকতা নিশ্চিত করে'
          },
          wage: {
            title: 'মজুরি গণনা ক্ষমতা',
            description: 'ধাপে ধাপে বিভাজন সহ অন্তর্নির্মিত মজুরি এবং ওভারটাইম গণনা'
          }
        },
        safety: {
          title: 'নিরাপত্তা বৈশিষ্ট্য',
          topicBoundary: {
            title: 'বিষয় সীমানা প্রয়োগ',
            description: 'অভিবাসী শ্রমিক অধিকার এবং শ্রম বিষয়গুলির বাইরের প্রশ্ন প্রত্যাখ্যান করে'
          },
          databaseBacked: {
            title: 'ডেটাবেস-সমর্থিত প্রতিক্রিয়া',
            description: 'অধিকার গাইড, আইন, এবং অভিবাসন পরিসংখ্যান থেকে যাচাইকৃত ডেটা ব্যবহার করে'
          },
          fallback: {
            title: 'ফলব্যাক সুরক্ষা',
            description: 'ভেক্টর অনুসন্ধান ব্যর্থ হলে কীওয়ার্ড অনুসন্ধানে মসৃণ ফলব্যাক'
          },
          analytics: {
            title: 'কথোপকথন বিশ্লেষণ',
            description: 'পারফরম্যান্স পর্যবেক্ষণের জন্য বেনামী কথোপকথন লগিং'
          },
          transparency: {
            title: 'উৎস স্বচ্ছতা',
            description: 'সমস্ত প্রতিক্রিয়ার জন্য উদ্ধৃতি এবং উৎসের ধরন প্রদান করে'
          }
        },
        capabilities: {
          title: 'সহায়ক কীসে সাহায্য করতে পারে',
          subtitle: 'সমস্ত প্রয়োজনীয় ক্ষেত্রে অভিবাসী শ্রমিকদের জন্য ব্যাপক সমর্থন',
          wage: {
            title: 'মজুরি এবং বেতন প্রশ্ন',
            description: 'ন্যূনতম মজুরি গণনা, ওভারটাইম পেমেন্ট নিয়ম, বেতন কর্তন, এবং বেতন স্লিপ যাচাইকরণ।'
          },
          hours: {
            title: 'কাজের সময় এবং ছুটি',
            description: 'দৈনিক কাজের সময়, বার্ষিক ছুটির অধিকার, অসুস্থ ছুটির অধিকার, এবং সরকারি ছুটির নিয়ম।'
          },
          documents: {
            title: 'নথিপত্র এবং আইনি অধিকার',
            description: 'পাসপোর্ট সমস্যা, কাজের অনুমতি, কর্মসংস্থান চুক্তি, এবং আইনি অধিকার সুরক্ষা।'
          },
          accommodation: {
            title: 'আবাসন এবং জীবনযাপন',
            description: 'আবাসন মান, আবাসন চার্জ, বাসস্থানের অবস্থা, এবং মৌলিক সুবিধা।'
          },
          support: {
            title: 'সহায়তা এবং এনজিও',
            description: 'এনজিও খোঁজা, অভিযোগ দায়ের করা, শ্রম বিভাগের যোগাযোগ, এবং সহায়তা সংস্থা।'
          },
          multilingual: {
            title: 'বহুভাষিক সমর্থন',
            description: 'ইংরেজি, বাহাসা মালয়েশিয়া, হিন্দি, নেপালি, এবং বাংলায় সাংস্কৃতিক প্রসঙ্গ সহ সম্পূর্ণ সমর্থন।'
          }
        },
        sdg: {
          title: 'টেকসই উন্নয়ন লক্ষ্য সমর্থন',
          description: 'Right4All সহায়ক সমস্ত অভিবাসী শ্রমিককে আইনি তথ্যে সমান অ্যাক্সেস প্রদান করে SDG 10: অসমতা হ্রাসে অবদান রাখে।'
        }
      }
    }
  }
}

/**
 * Initialize i18n with React integration
 * Sets up language detection, fallback, and interpolation
 */
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: { 
      escapeValue: false // React already escapes values by default
    }
  })

export default i18n
