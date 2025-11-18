# Right4All Project Structure

## Overview

Right4All is organized as a monorepo with clear separation between frontend and backend components, following modern web development best practices with TypeScript, React, and Node.js.

## Repository Structure

```
Right4All/
├── frontend/                 # React/Vite frontend application
├── backend/                  # Node.js/Express backend API
├── shared/                   # Shared code and types
├── docs/                     # Project documentation
└── package.json             # Root package.json for workspace management
```

## Frontend Structure (`frontend/`)

### Application Architecture

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Chatbot/        # AI chatbot interface components
│   │   ├── Quiz/           # Interactive quiz components
│   │   ├── RightsGuide/    # Rights education components
│   │   ├── Three/          # 3D interactive components
│   │   └── ui/             # Base UI components
│   ├── pages/              # Page-level components
│   │   ├── Home.tsx        # Landing page with platform overview
│   │   ├── Insights.tsx    # Data visualization and maps
│   │   ├── RightsGuide.tsx # Rights education interface
│   │   ├── Quiz.tsx        # Interactive learning quiz
│   │   ├── Tools.tsx       # AI tools (chatbot + contract checker)
│   │   ├── Community.tsx   # Support organizations hub
│   │   ├── Support.tsx     # Get help and contact information
│   │   └── AboutRight4AllAI.tsx # Platform information
│   ├── hooks/              # Custom React hooks
│   │   ├── useChatbot.ts   # Chatbot functionality management
│   │   ├── useTranslateContent.ts # Translation hooks
│   │   ├── useLanguageSync.ts     # Language synchronization
│   │   └── useAPIData.ts   # Data fetching utilities
│   ├── api/                # API client and data fetching
│   │   ├── client.ts       # HTTP client configuration
│   │   ├── chatbotApi.ts   # Chatbot API integration
│   │   ├── translationAPI.ts # Translation API integration
│   │   └── communityApi.ts # Community data API
│   ├── store/              # State management
│   │   └── appStore.ts     # Global application state (Zustand)
│   ├── contexts/           # React contexts
│   │   └── TranslationContext.tsx # Translation provider
│   ├── lib/                # Library configurations
│   │   └── i18n.ts         # Internationalization setup
│   ├── data/               # Static data and content
│   │   ├── quizData.json   # Quiz questions and answers
│   │   ├── rightsGuideDialogues.ts # Rights guide content
│   │   ├── malaysiaMap.ts  # Map data for insights
│   │   └── animationDialogues.json # Animation dialogues
│   ├── styles/             # CSS and styling
│   │   └── index.css       # Global styles and Tailwind imports
│   ├── constants/          # Application constants
│   │   └── law.ts          # Legal and rights constants
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared type definitions
│   ├── utils/              # Utility functions
│   │   └── contractCheck.ts # Contract analysis utilities
│   ├── scripts/            # Build and utility scripts
│   │   └── parseQuiz.js    # Quiz data parsing script
│   ├── services/           # Service layer
│   │   ├── chatbotAPI.ts   # Chatbot service integration
│   │   ├── translationAPI.ts # Translation service
│   │   └── communityApi.ts # Community service
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Static assets
│   └── images/             # Image assets
│       └── sdg-10.png      # Sustainable Development Goal image
├── package.json           # Frontend dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── index.html             # HTML template
```

### Key Frontend Components

#### Chatbot System
- **ChatWidget.tsx** - Main chatbot interface component
- **useChatbot.ts** - Hook for chatbot functionality
- **chatbotAPI.ts** - API integration layer

#### Translation System
- **TranslationContext.tsx** - Context provider for translations
- **TranslatedText.tsx** - Component for text translation
- **useTranslateContent.ts** - Hook for dynamic translation

#### 3D Components
- **HeroScene.tsx** - Three.js 3D scene for homepage
- **Three.js integration** - Enhanced user engagement

#### Quiz System
- **QuizCategorySelection.tsx** - Category selection interface
- **QuizInterface.tsx** - Main quiz component
- **QuizLanguageSelection.tsx** - Language selection for quiz

## Backend Structure (`backend/`)

### API Architecture

```
backend/
├── src/
│   ├── routes/             # API route definitions
│   │   ├── chatbot.ts      # Chatbot API endpoints
│   │   ├── translation.ts  # Translation API endpoints
│   │   ├── insights.ts     # Data insights endpoints
│   │   └── community.ts    # Community endpoints
│   ├── services/           # Business logic services
│   │   ├── chatbotService.ts # AI chatbot service
│   │   ├── translationService.ts # Translation service
│   │   ├── databaseService.ts # Database operations
│   │   └── embeddingService.ts # Vector embeddings service
│   ├── db/                 # Database configuration
│   │   ├── schema.sql      # Database schema
│   │   └── setup-pgvector.sql # pgvector extension setup
│   ├── scripts/            # Utility scripts
│   │   └── generate-embeddings.ts # Embedding generation
│   ├── index.ts            # Application entry point
│   └── types/              # Backend type definitions
├── api/                    # Vercel serverless functions
│   └── index.ts           # API entry point for Vercel
├── reports/               # Benchmark and test reports
│   ├── benchmark-report-*.json # Performance test results
│   └── benchmark-report-with-answers-*.json # Detailed results
├── package.json           # Backend dependencies
├── tsconfig.json          # TypeScript configuration
└── benchmark-testing-report.js # Performance testing script
```

### Key Backend Services

#### Chatbot Service
- **RAG Architecture** - Retrieval-Augmented Generation
- **DeepSeek API Integration** - AI model integration
- **Vector Database** - PostgreSQL with pgvector
- **Safety Filtering** - Content boundary enforcement

#### Translation Service
- **Multiple Providers** - Google Translate, LibreTranslate, Static
- **Caching System** - Performance optimization
- **Batch Translation** - Efficient multi-text translation
- **5 Language Support** - EN, MS, NE, HI, BN

#### Database Layer
- **PostgreSQL** - Primary database
- **pgvector Extension** - Vector similarity search
- **Schema Design** - Optimized for RAG system
- **Connection Pooling** - Performance optimization

## Shared Structure (`shared/`)

### Shared Resources

```
shared/
├── types.ts               # Shared TypeScript type definitions
└── Quizquestion.json      # Shared quiz data
```

### Type Definitions
- **API Response Types** - Consistent API responses
- **Chatbot Types** - Chat message and response types
- **Translation Types** - Language and translation types
- **Data Types** - Application data structures

## Development Workflow

### Development Scripts

#### Root Level
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm run install:all      # Install all dependencies
```

#### Frontend Specific
```bash
npm run dev:frontend     # Start frontend development server
npm run build:frontend   # Build frontend for production
npm run preview          # Preview production build
```

#### Backend Specific
```bash
npm run dev:backend      # Start backend development server
npm run build:backend    # Build backend for production
npm run start            # Start production backend
```

### Environment Configuration

#### Frontend Environment
```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

#### Backend Environment
```env
DATABASE_URL=postgresql://user:pass@host/db
DEEPSEEK_API_KEY=your_deepseek_key
PORT=3000
```

## Technology Stack

### Frontend Technologies
- **React 18** - UI library with hooks
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Three.js** - 3D graphics library
- **Recharts** - Data visualization library

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type safety
- **PostgreSQL** - Relational database
- **pgvector** - Vector similarity search
- **DeepSeek API** - AI language model
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **Vercel** - Deployment platform

## Deployment Architecture

### Frontend Deployment (Vercel)
- **Static Site Generation** - Optimized performance
- **CDN Distribution** - Global edge caching
- **Environment Variables** - Secure configuration
- **Automatic Deployments** - CI/CD pipeline

### Backend Deployment (Vercel)
- **Serverless Functions** - Scalable API endpoints
- **Database Integration** - PostgreSQL connection
- **Environment Configuration** - Secure API keys
- **Monitoring** - Performance and error tracking

## Data Flow

### User Request Flow
1. **Frontend Request** - User interacts with React components
2. **API Call** - Frontend makes HTTP request to backend
3. **Backend Processing** - Service layer handles business logic
4. **Database Query** - Data retrieval and processing
5. **Response** - Structured JSON response to frontend
6. **UI Update** - Frontend updates based on response

### Translation Flow
1. **Content Detection** - Identify translatable content
2. **Language Preference** - User-selected language
3. **Translation Request** - Backend translation service
4. **Caching Check** - Check for existing translations
5. **Provider Selection** - Choose translation provider
6. **Response** - Return translated content

### Chatbot Flow
1. **User Question** - Input from chat interface
2. **Language Detection** - Identify question language
3. **Vector Search** - Find relevant context from database
4. **AI Generation** - Generate response using DeepSeek
5. **Safety Filtering** - Apply content boundaries
6. **Response** - Return formatted answer

## Performance Considerations

### Frontend Optimization
- **Code Splitting** - Route-based chunk splitting
- **Lazy Loading** - Dynamic imports for large components
- **Image Optimization** - WebP format and compression
- **Bundle Analysis** - Regular performance audits

### Backend Optimization
- **Database Indexing** - Optimized query performance
- **Caching Layer** - Translation and API response caching
- **Connection Pooling** - Database connection management
- **Error Handling** - Graceful degradation

## Security Architecture

### Frontend Security
- **Environment Variables** - Secure API key management
- **Input Validation** - Client-side validation
- **XSS Protection** - Content Security Policy
- **CORS Configuration** - Proper cross-origin settings

### Backend Security
- **Input Validation** - Zod schema validation
- **API Key Protection** - Secure storage and rotation
- **Rate Limiting** - API endpoint protection
- **Database Security** - Connection encryption

## Monitoring and Analytics

### Performance Monitoring
- **Frontend Metrics** - Core Web Vitals
- **Backend Metrics** - Response times and error rates
- **Database Metrics** - Query performance
- **User Analytics** - Feature usage and engagement

### Error Tracking
- **Frontend Errors** - JavaScript error tracking
- **Backend Errors** - API error logging
- **Database Errors** - Connection and query errors
- **User Feedback** - Direct user reporting

---

**Architecture Version**: 2.0  
**Last Updated**: October 2025  
**Next Review**: November 2025
