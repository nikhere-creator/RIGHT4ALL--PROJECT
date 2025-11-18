# Right4All Backend API

REST API server for the Right4All platform, providing AI-powered chatbot functionality, translation services, and data management for migrant worker rights information.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Configure your environment variables
# Edit .env file with your API keys and database URL

# Start development server
npm run dev
```

## 🛠️ Technology Stack

- **Node.js** with Express framework
- **TypeScript** for type safety
- **PostgreSQL** with **pgvector** for RAG system
- **DeepSeek API** for AI chatbot functionality
- **Translation Service** with multiple providers
- **Zod** for request validation
- **CORS** for cross-origin requests

## 📡 API Endpoints

### Health & Status
- `GET /api/health` - Health check and server status

### AI Chatbot Service
- `POST /api/chatbot/chat` - AI-powered chatbot with RAG system
- `POST /api/chatbot/stream` - Stream chatbot responses
- `GET /api/chatbot/status` - Chatbot service status

### Translation Service
- `POST /api/translation/translate` - Single text translation
- `POST /api/translation/translate/batch` - Batch translation for multiple texts
- `GET /api/translation/languages` - Get supported languages
- `DELETE /api/translation/cache` - Clear translation cache

### Insights & Data
- `GET /api/insights/overview` - Platform overview statistics
- `GET /api/insights/states` - State-wise migrant worker data
- `GET /api/insights/sectors` - Sector distribution data
- `GET /api/insights/nationalities` - Nationality breakdown

### Community & Support
- `GET /api/community/organizations` - Support organizations list
- `GET /api/community/resources` - Educational resources
- `POST /api/community/feedback` - Submit user feedback

## 🔧 Development

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# AI Services
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Translation Services (Optional)
GOOGLE_TRANSLATE_API_KEY=your_google_translate_key
LIBRETRANSLATE_URL=https://libretranslate.com/translate
LIBRETRANSLATE_API_KEY=your_libretranslate_key

# Server Configuration
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🗄️ Database Setup

### PostgreSQL with pgvector

1. **Create Database**:
   ```sql
   CREATE DATABASE right4all;
   ```

2. **Enable pgvector Extension**:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

3. **Run Schema**:
   ```sql
   -- Execute the schema from src/db/schema.sql
   ```

### Database Schema

The database includes:
- **chat_history** - Store chatbot conversations
- **embeddings** - Vector embeddings for RAG system
- **translations** - Cached translation results
- **organizations** - Support organizations data

## 🤖 AI Chatbot System

### RAG (Retrieval-Augmented Generation) Architecture

1. **Vector Embeddings**: Store labor rights information as embeddings
2. **Semantic Search**: Find relevant context using vector similarity
3. **AI Generation**: Generate responses using DeepSeek API
4. **Safety Filtering**: Implement content boundaries and safety checks

### Performance Metrics
- **Accuracy**: 100% across 35 benchmark questions
- **Response Time**: Average 6.8 seconds
- **Language Support**: 5 languages (EN, MS, NE, HI, BN)
- **Safety Compliance**: 100% inappropriate question rejection

## 🌐 Translation System

### Supported Providers
1. **Static Translations** - Pre-defined translations (always available)
2. **Google Translate** - High-quality translations (requires API key)
3. **LibreTranslate** - Free alternative (optional)

### Supported Languages
- English (en)
- Bahasa Malaysia (ms)
- Nepali (ne)
- Hindi (hi)
- Bengali (bn)

### Caching Strategy
- **In-memory cache** for frequent translations
- **Database cache** for persistent storage
- **Performance optimization** with batch requests

## 🔒 Security Features

- **Input Validation** with Zod schemas
- **Rate Limiting** for API endpoints
- **CORS Configuration** for frontend access
- **Environment Variable Protection**
- **API Key Validation** for external services

## 📊 Monitoring & Logging

### Health Checks
- Database connection status
- External API availability
- Memory usage monitoring
- Response time tracking

### Error Handling
- Structured error responses
- Comprehensive logging
- Graceful degradation
- Fallback mechanisms

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Environment Configuration
- Set all environment variables in Vercel dashboard
- Configure database connection string
- Add API keys for external services

## 🧪 Testing

### Test Categories
- **Unit Tests** - Individual service functions
- **Integration Tests** - API endpoint testing
- **Performance Tests** - Response time validation
- **Security Tests** - Input validation and security checks

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testNamePattern="chatbot"
```

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Detailed API reference
- [Database Schema](./src/db/schema.sql) - Database structure
- [Benchmark Report](../BENCHMARK_TESTING_REPORT.md) - Performance testing results

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify DATABASE_URL environment variable
   - Check PostgreSQL server status
   - Ensure pgvector extension is enabled

2. **Chatbot Not Responding**
   - Verify DEEPSEEK_API_KEY is set
   - Check API quota and limits
   - Test with simple health check

3. **Translation Service Down**
   - Check translation provider API keys
   - Verify network connectivity
   - Test with static fallback translations

### Debug Mode
Enable detailed logging by setting:
```env
DEBUG=true
NODE_ENV=development
```

---

**Backend Status**: Production Ready ✅  
**Last Updated**: October 2025  
**API Version**: 1.0.0
