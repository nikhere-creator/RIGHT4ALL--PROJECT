# Right4All Frontend

React application for the Right4All platform, providing migrant workers with accessible information about their labor rights, wages, and legal protections in Malaysia.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 🛠️ Technology Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive and modern styling
- **React Router** for client-side navigation
- **Zustand** for lightweight state management
- **Three.js** for 3D interactive components
- **Recharts** for data visualization
- **Google Maps API** for interactive maps
- **Custom Translation System** for multi-language support

## 📱 Application Features

### Core Pages
- **Home** - Platform overview and key features
- **Insights** - Interactive demographics map with state-wise data
- **Rights Guide** - Visual storytelling with speech synthesis
- **Quiz** - Scenario-based learning with instant feedback
- **Tools** - AI Chatbot and Contract Checker
- **Community** - Support organizations and resources
- **Support** - Get help and contact information

### Key Functionality
- **AI-Powered Chatbot** - RAG system for accurate labor rights information
- **Multi-language Support** - 5 languages (EN, MS, NE, HI, BN)
- **Real-time Translation** - Dynamic content translation
- **Interactive Maps** - Google Maps integration for data visualization
- **3D Components** - Engaging user experience with Three.js
- **Responsive Design** - Mobile-first approach

## 🔧 Development

### Environment Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Required Environment Variables**:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Chatbot/         # AI chatbot components
│   ├── Quiz/            # Quiz interface components
│   ├── RightsGuide/     # Rights guide components
│   ├── Three/           # 3D interactive components
│   └── ui/              # Base UI components
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Insights.tsx     # Data visualization
│   ├── RightsGuide.tsx  # Rights education
│   ├── Quiz.tsx         # Interactive quiz
│   └── Tools.tsx        # AI tools
├── hooks/               # Custom React hooks
│   ├── useChatbot.ts    # Chatbot functionality
│   ├── useTranslateContent.ts # Translation hooks
│   └── useLanguageSync.ts     # Language synchronization
├── api/                 # API client and data fetching
│   ├── client.ts        # HTTP client configuration
│   ├── chatbotApi.ts    # Chatbot API integration
│   └── translationAPI.ts # Translation API integration
├── store/               # State management
│   └── appStore.ts      # Global application state
├── contexts/            # React contexts
│   └── TranslationContext.tsx # Translation provider
├── lib/                 # Library configurations
│   └── i18n.ts          # Internationalization setup
├── data/                # Static data and content
│   ├── quizData.json    # Quiz questions and answers
│   ├── rightsGuideDialogues.ts # Rights guide content
│   └── malaysiaMap.ts   # Map data for insights
├── styles/              # CSS and styling
│   └── index.css        # Global styles
└── utils/               # Utility functions
    └── contractCheck.ts # Contract analysis utilities
```

## 🌐 Multi-language Support

### Supported Languages
- **English (en)** - Default language
- **Bahasa Malaysia (ms)** - Local language
- **Nepali (ne)** - Major migrant worker language
- **Hindi (hi)** - Major migrant worker language
- **Bengali (bn)** - Major migrant worker language

### Translation System
- **Dynamic Translation** - All UI content translated in real-time
- **Backend Integration** - Uses backend translation service
- **Caching** - Optimized performance with translation caching
- **Fallback Support** - Graceful degradation if translation fails

### Usage Examples
```tsx
import { TranslatedText } from '@/components/TranslatedText'

function MyComponent() {
  return (
    <TranslatedText>Hello, welcome to our platform</TranslatedText>
  )
}
```

## 🗺️ Google Maps Integration

### Features
- **Interactive Map** - Malaysian states with migrant worker data
- **State Markers** - Clickable markers with detailed information
- **Data Visualization** - Color-coded states based on worker density
- **Responsive Design** - Works on all device sizes

### Setup
1. Get Google Maps API key from Google Cloud Console
2. Add to environment variables: `VITE_GOOGLE_MAPS_API_KEY`
3. Configure API key restrictions for your domains

## 🤖 AI Chatbot Integration

### Features
- **RAG System** - Retrieval-Augmented Generation for accurate responses
- **Multi-language** - Chat in 5 supported languages
- **Safety Boundaries** - Content filtering and safety checks
- **Streaming Responses** - Real-time response display

### Performance
- **100% Accuracy** - Across 35 benchmark questions
- **6.8s Average Response Time** - Fast and reliable
- **5 Language Support** - Perfect translation consistency

## 🎨 Styling & Design

### Tailwind CSS
- **Utility-first** approach for rapid development
- **Responsive design** with mobile-first breakpoints
- **Custom components** with consistent design system
- **Dark mode** ready (future enhancement)

### Three.js Integration
- **3D Hero Scene** - Engaging landing page experience
- **Interactive Elements** - Enhanced user engagement
- **Performance Optimized** - Efficient rendering

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Build Optimization
- **Code Splitting** - Dynamic imports for better performance
- **Asset Optimization** - Compressed images and assets
- **Bundle Analysis** - Identify and optimize large dependencies

## 🧪 Testing

### Test Categories
- **Component Testing** - Individual component functionality
- **Integration Testing** - Page-level functionality
- **E2E Testing** - User workflow testing
- **Performance Testing** - Load time and responsiveness

### Running Tests
```bash
# Run test suite
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="Home"
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🔒 Security Considerations

- **Environment Variables** - Never commit API keys
- **Input Validation** - Sanitize all user inputs
- **CORS Configuration** - Proper cross-origin settings
- **Content Security Policy** - Protect against XSS attacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Google Maps Not Loading**
   - Check API key in environment variables
   - Verify domain restrictions in Google Cloud Console
   - Check browser console for specific errors

2. **Translation Not Working**
   - Verify backend API is running
   - Check network connectivity
   - Test with different languages

3. **Build Failures**
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Check environment variable configuration

### Debug Mode
Enable detailed logging by setting:
```env
VITE_DEBUG=true
```

---

**Frontend Status**: Production Ready ✅  
**Last Updated**: October 2025  
**React Version**: 18.2.0
