# Right4All - Complete Deployment Guide

## Overview

This guide covers the deployment of both frontend and backend components of the Right4All platform to Vercel. The platform consists of a React frontend and Node.js backend with PostgreSQL database.

## Prerequisites

### Required Accounts
1. **Vercel Account**: [Sign up at vercel.com](https://vercel.com)
2. **Google Cloud Account**: For Google Maps API
3. **GitHub/GitLab Account**: For repository hosting
4. **DeepSeek API Account**: For AI chatbot functionality

### Required APIs & Services
- **Google Maps JavaScript API** - For interactive maps
- **DeepSeek API** - For AI chatbot with RAG system
- **PostgreSQL Database** - With pgvector extension for embeddings

## Environment Variables

### Frontend Environment Variables (Vercel)
```
VITE_API_URL = https://your-backend-deployment.vercel.app/api
VITE_GOOGLE_MAPS_API_KEY = your_google_maps_api_key_here
NODE_ENV = production
```

### Backend Environment Variables (Vercel)
```
DATABASE_URL = your_postgresql_connection_string
DEEPSEEK_API_KEY = your_deepseek_api_key
NODE_ENV = production
PORT = 3000
```

## Deployment Steps

### 1. Backend Deployment

#### Option A: Vercel CLI
```bash
cd backend
npm install -g vercel
vercel login
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Select the backend directory
4. Configure build settings:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 2. Frontend Deployment

#### Option A: Vercel CLI
```bash
cd frontend
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Select the frontend directory
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Database Setup

#### PostgreSQL with pgvector
1. Create a PostgreSQL database (Vercel Postgres, Supabase, or other provider)
2. Enable pgvector extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Run the database schema:
   ```sql
   -- Run the schema from backend/src/db/schema.sql
   ```

## Configuration

### Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable **Maps JavaScript API**
3. Create API key with domain restrictions:
   - Your Vercel domain: `https://*.vercel.app`
   - Your custom domain (if applicable)
4. Add API key to frontend environment variables

### DeepSeek API Setup
1. Get API key from [DeepSeek Platform](https://platform.deepseek.com/)
2. Add to backend environment variables
3. Test chatbot functionality after deployment

## Project Structure for Deployment

### Root vercel.json (for monorepo deployment)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/dist/$1"
    }
  ]
}
```

## Testing the Deployment

### Frontend Tests
1. **Homepage**: Loads correctly with all features
2. **Navigation**: All routes functional
3. **Language Switching**: Test all 5 languages (EN, MS, NE, HI, BN)
4. **Google Maps**: Interactive map loads on Insights page
5. **AI Chatbot**: Functional with accurate responses

### Backend Tests
1. **API Health**: `GET /api/health` returns 200
2. **Translation Service**: `POST /api/translation/translate` works
3. **Chatbot Service**: `POST /api/chatbot/chat` provides accurate responses
4. **Database Connection**: All database operations functional

### Integration Tests
1. **Frontend-Backend Connection**: Language switching updates content
2. **Chatbot Integration**: Questions answered accurately across languages
3. **Translation System**: Real-time translation working
4. **Performance**: Response times under 10 seconds

## Performance Optimization

### Frontend Build Optimization
- **Code Splitting**: Dynamic imports for large components
- **Image Compression**: Optimize PNG/WebP assets
- **Bundle Analysis**: Use `npm run build -- --analyze`
- **Caching**: Implement service worker for static assets

### Backend Optimization
- **Database Indexing**: Optimize query performance
- **Caching Layer**: Redis for frequent translations
- **Connection Pooling**: Database connection management
- **Compression**: Enable gzip compression

## Monitoring & Analytics

### Vercel Analytics
- Performance monitoring
- Real user monitoring (RUM)
- Error tracking

### Custom Monitoring
- Chatbot response time tracking
- Translation accuracy monitoring
- User language preference analytics

## Security Considerations

### API Security
- Restrict Google Maps API key to specific domains
- Use environment variables for all secrets
- Implement rate limiting on backend APIs
- Validate and sanitize all user inputs

### Database Security
- Use connection strings with SSL
- Implement proper access controls
- Regular security updates
- Backup and recovery procedures

## Troubleshooting

### Common Issues

1. **Google Maps Not Loading**
   - Check API key restrictions
   - Verify billing is enabled
   - Check browser console for specific errors

2. **Chatbot Not Responding**
   - Verify DeepSeek API key
   - Check database connection
   - Test backend API endpoints

3. **Translation Failures**
   - Check backend translation service
   - Verify environment variables
   - Test with multiple languages

4. **Database Connection Issues**
   - Verify connection string
   - Check pgvector extension
   - Test database queries

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## Cost Management

### Google Maps API
- Free tier: $200 monthly credit
- Monitor usage in Google Cloud Console
- Set up budget alerts

### DeepSeek API
- Check current pricing at platform.deepseek.com
- Monitor usage through API dashboard
- Implement rate limiting

### Vercel
- Free tier available for personal projects
- Monitor usage in Vercel dashboard
- Consider team plans for collaboration

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor performance metrics
- Review security updates
- Backup database regularly

### Scaling Considerations
- Implement CDN for static assets
- Database read replicas for high traffic
- Load balancing for backend services
- Caching strategies for translations

---

**Deployment Status**: Production Ready ✅  
**Last Updated**: October 2025  
**Next Review**: November 2025
