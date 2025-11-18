# Right4All - Migrant Worker Rights Platform

A comprehensive platform providing migrant workers in Malaysia with accessible information about their labor rights, wages, working conditions, and legal protections.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development servers (frontend + backend)
npm run dev

# Or start individually
npm run dev:frontend  # Frontend only (http://localhost:5173)
npm run dev:backend   # Backend only (http://localhost:3000)
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router** for navigation
- **Zustand** for state management
- **Three.js** for 3D interactive components
- **Recharts** for data visualization
- **Google Maps API** for interactive maps

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with **pgvector** for RAG system
- **DeepSeek API** for AI chatbot functionality
- **Translation Service** with multiple providers

### Key Features
- **AI-Powered Chatbot** with RAG system for accurate labor rights information
- **Multi-language Support** (English, Bahasa Malaysia, Nepali, Hindi, Bengali)
- **Interactive Rights Guide** with visual storytelling and speech synthesis
- **Scenario-based Quiz** with instant feedback and results
- **Contract Checker** for employment document analysis
- **Community Hub** for worker support and resources
- **Real-time Translation** with caching and fallback providers

## 📱 Application Routes

- **`/`** - Homepage with platform overview
- **`/insights`** - Interactive demographics map & data visualizations
- **`/rights`** - Rights guide with visual mode and speech synthesis
- **`/quiz`** - Scenario-based quiz with instant feedback
- **`/tools`** - AI Chatbot (wage checker) + Contract checker
- **`/community`** - Community hub and support organizations
- **`/support`** - Get help and contact information

## 🎯 Core Capabilities

### AI Chatbot with RAG System
- **100% Accuracy** across 35 benchmark questions
- **5 Language Support** with perfect translation consistency
- **Safety Boundaries** with 100% inappropriate question rejection
- **Average Response Time**: 6.8 seconds
- **Production Ready** with comprehensive testing

### Translation System
- **Dynamic Translation** of all UI content
- **Multiple Providers**: Google Translate, LibreTranslate, Static fallbacks
- **Caching System** for performance optimization
- **Batch Translation** support for multiple texts
- **5 Supported Languages**: EN, MS, NE, HI, BN

### Rights Guide
- **Visual Storytelling** with animated comics
- **Speech Synthesis** for accessibility
- **Interactive Scenarios** for better understanding
- **Multi-language Narration**

## 📊 Performance Metrics

- **Chatbot Accuracy**: 100% (35/35 questions)
- **Language Support**: 100% across 5 languages
- **Safety Compliance**: 100% boundary enforcement
- **Response Time**: Average 6.8 seconds
- **Translation Speed**: Real-time with caching

## 🔧 Development

### Environment Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment files: `cp backend/.env.example backend/.env` and `cp frontend/.env.example frontend/.env`
4. Configure your database and API keys
5. Start development: `npm run dev`

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Frontend (Vercel)
- Automatic deployments from main branch
- Environment variables for API keys
- Google Maps API integration

### Backend (Vercel)
- Node.js runtime with Express
- PostgreSQL database with pgvector
- Environment variables for API configuration

## 📚 Documentation

- [Project Structure](./docs/project-structure.md)
- [Translation System](./docs/translation-system.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Benchmark Testing Report](./backend/BENCHMARK_TESTING_REPORT.md)

## 🤝 Contributing

We welcome contributions to improve the platform and expand support for migrant workers. Please see our contribution guidelines for more information.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Right4All** - Empowering migrant workers with accessible rights information and support.
