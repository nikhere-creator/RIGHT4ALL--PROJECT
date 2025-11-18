# Vercel Deployment Setup for Right4All Frontend

## Overview

This guide covers the deployment of the Right4All frontend application to Vercel, including environment configuration, build optimization, and troubleshooting.

## Prerequisites

- **Vercel Account** - [Sign up at vercel.com](https://vercel.com)
- **Git Repository** - Code pushed to GitHub/GitLab
- **Backend API** - Deployed backend for API calls
- **Google Maps API Key** - For interactive map features

## Quick Deployment

### Option 1: Vercel Dashboard (Recommended)

1. **Import Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Right4All repository
   - Select the `frontend` directory as root

2. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Root Directory**: `frontend`

3. **Add Environment Variables**
   ```env
   VITE_API_URL=https://your-backend-deployment.vercel.app/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NODE_ENV=production
   ```

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**
   ```bash
   cd frontend
   vercel login
   vercel --prod
   ```

3. **Follow Prompts**
   - Link to existing project? No
   - Project name: `right4all-frontend`
   - Directory: `./` (current directory)

## Environment Variables Configuration

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://right4all-backend.vercel.app/api` |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | `AIzaSyB...` |
| `NODE_ENV` | Environment | `production` |

### Vercel Dashboard Setup

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add all required variables
4. Ensure they're available for all environments

## Build Configuration

### Vercel Configuration (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Build Optimization

The Vite build process is optimized for production:

- **Code Splitting** - Automatic chunk splitting
- **Tree Shaking** - Remove unused code
- **Asset Optimization** - Compressed images and assets
- **CSS Optimization** - Minified and extracted CSS

## Google Maps Integration

### API Key Setup

1. **Google Cloud Console**
   - Enable **Maps JavaScript API**
   - Create API key with domain restrictions
   - Add Vercel domains: `https://*.vercel.app`

2. **Domain Restrictions**
   ```
   https://your-project.vercel.app/*
   https://your-project-git-branch.vercel.app/*
   http://localhost:*
   ```

### Troubleshooting Maps

**Common Issues:**
- **"This page didn't load Google Maps correctly"**
  - Check API key restrictions
  - Verify billing is enabled
  - Test with different domains

## Multi-language Support

### Translation System

The frontend supports 5 languages:
- **English (en)** - Default
- **Bahasa Malaysia (ms)**
- **Nepali (ne)**
- **Hindi (hi)**
- **Bengali (bn)**

### Backend Integration

- Translations are fetched from backend API
- Caching improves performance
- Fallback to static translations if API unavailable

## Performance Optimization

### Build Analysis

Run bundle analysis to identify optimization opportunities:

```bash
npm run build -- --analyze
```

### Optimization Strategies

1. **Code Splitting**
   - Dynamic imports for large components
   - Route-based code splitting
   - Lazy loading for non-critical components

2. **Asset Optimization**
   - Image compression (WebP format)
   - Font subsetting
   - CSS minification

3. **Caching Strategy**
   - Static asset caching
   - API response caching
   - Translation caching

## Testing Deployment

### Post-Deployment Checklist

1. **Homepage**
   - Loads correctly
   - All features functional
   - Responsive design

2. **Navigation**
   - All routes work
   - No 404 errors
   - Smooth transitions

3. **Language Switching**
   - Test all 5 languages
   - Translation accuracy
   - No broken content

4. **AI Chatbot**
   - Functional responses
   - Multi-language support
   - Safety boundaries

5. **Google Maps**
   - Interactive map loads
   - State markers work
   - Data visualization

### Performance Testing

1. **Load Time**
   - First Contentful Paint < 1.5s
   - Largest Contentful Paint < 2.5s
   - Cumulative Layout Shift < 0.1

2. **API Performance**
   - Translation API response < 2s
   - Chatbot API response < 10s
   - Health check < 500ms

## Troubleshooting

### Common Deployment Issues

#### 1. Build Failures
**Causes:**
- Missing dependencies
- TypeScript errors
- Environment variables not set

**Solutions:**
- Check build logs in Vercel dashboard
- Run `npm run build` locally to identify issues
- Verify all environment variables are set

#### 2. API Connection Issues
**Causes:**
- Incorrect `VITE_API_URL`
- CORS configuration
- Backend not deployed

**Solutions:**
- Verify backend URL in environment variables
- Check backend CORS settings
- Ensure backend is deployed and healthy

#### 3. Google Maps Not Loading
**Causes:**
- API key not set
- Domain restrictions
- Billing issues

**Solutions:**
- Check `VITE_GOOGLE_MAPS_API_KEY` environment variable
- Verify domain restrictions in Google Cloud Console
- Ensure billing is enabled

#### 4. Translation Failures
**Causes:**
- Backend API unavailable
- Network issues
- CORS configuration

**Solutions:**
- Check backend health
- Verify network connectivity
- Test with static fallback translations

### Debug Mode

Enable debug logging by setting:
```env
VITE_DEBUG=true
```

## Monitoring & Analytics

### Vercel Analytics

- **Performance Monitoring** - Core Web Vitals
- **Real User Monitoring** - User experience metrics
- **Error Tracking** - JavaScript errors

### Custom Monitoring

- **Chatbot Performance** - Response times and accuracy
- **Translation Quality** - Language support and accuracy
- **User Engagement** - Feature usage and navigation patterns

## Security Considerations

### Environment Security

- **Never commit** API keys to repository
- **Use Vercel environment variables** for all secrets
- **Restrict API keys** to specific domains
- **Regularly rotate** API keys

### Content Security

- **Input Validation** - Sanitize all user inputs
- **XSS Protection** - Content Security Policy headers
- **CORS Configuration** - Proper cross-origin settings

## Cost Management

### Vercel Pricing

- **Free Tier** - Suitable for personal projects
- **Pro Plan** - Enhanced features and limits
- **Enterprise** - Advanced security and support

### API Costs

- **Google Maps** - $200 monthly free credit
- **DeepSeek API** - Check current pricing
- **Translation API** - Monitor usage and costs

## Maintenance

### Regular Tasks

1. **Dependency Updates**
   - Monthly security updates
   - Major version upgrades
   - Dependency vulnerability scanning

2. **Performance Monitoring**
   - Regular performance audits
   - User experience monitoring
   - Error rate tracking

3. **Security Updates**
   - API key rotation
   - Security patch application
   - Vulnerability scanning

### Scaling Considerations

1. **CDN Optimization**
   - Static asset delivery
   - Global edge caching
   - Image optimization

2. **Performance Optimization**
   - Code splitting strategies
   - Asset compression
   - Caching implementations

## Support Resources

### Vercel Documentation
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Vite Integration](https://vercel.com/guides/deploying-vite-with-vercel)
- [Environment Variables](https://vercel.com/docs/environment-variables)

### Right4All Documentation
- [Project Structure](../../docs/project-structure.md)
- [Backend Deployment](../../DEPLOYMENT.md)
- [Google Maps Setup](./GOOGLE_MAPS_SETUP.md)

---

**Deployment Status**: Production Ready ✅  
**Last Updated**: October 2025  
**Vercel Plan**: Hobby/Pro  
**Next Review**: November 2025
