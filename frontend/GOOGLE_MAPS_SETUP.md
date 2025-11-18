# Google Maps API Setup Guide

## Overview

This guide covers the setup and configuration of Google Maps API for the Right4All platform's interactive map features on the Insights page.

## Prerequisites

1. **Google Cloud Platform Account** - [Sign up here](https://console.cloud.google.com/)
2. **Billing Enabled** - Google Maps requires billing to be enabled
3. **Google Maps JavaScript API** - Must be enabled in your project

## Step-by-Step Setup

### 1. Create or Select Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project

### 2. Enable Required APIs

1. Navigate to "APIs & Services" > "Library"
2. Search for and enable the following APIs:
   - **Maps JavaScript API** - Required for interactive maps
   - **Geocoding API** - Optional, for address lookups
   - **Places API** - Optional, for location search

### 3. Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### 4. Configure API Key Restrictions (Security Best Practice)

#### Application Restrictions
- Select "HTTP referrers (web sites)"
- Add the following domains:
  ```
  http://localhost:*
  https://*.vercel.app/*
  https://your-production-domain.com/*
  ```

#### API Restrictions
- Select "Restrict key"
- Choose only the Maps JavaScript API (and optionally Geocoding/Places APIs)

### 5. Update Environment Variables

Add the API key to your frontend environment:

```env
# In frontend/.env file
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 6. Restart Development Server

If the development server is running, restart it to load the new environment variable.

## Integration with Right4All

### Map Features
- **Interactive Malaysian States Map** - Color-coded by migrant worker density
- **Clickable Markers** - Detailed state information on click
- **Responsive Design** - Works on all device sizes
- **Data Visualization** - Real-time data display

### Component Usage
The Google Maps integration is used in:
- `src/pages/Insights.tsx` - Main insights page
- `src/components/GoogleMalaysiaMap.tsx` - Map component
- `src/data/malaysiaMap.ts` - Map data and configuration

## Troubleshooting

### Common Issues

#### 1. "This page didn't load Google Maps correctly"
**Causes:**
- API key not configured
- Billing not enabled
- Domain restrictions incorrect
- API not enabled

**Solutions:**
1. Verify API key in environment variables
2. Check billing status in Google Cloud Console
3. Add `http://localhost:*` to domain restrictions
4. Enable Maps JavaScript API

#### 2. "RefererNotAllowedMapError"
**Solution:** Add your domain to API key HTTP referrer restrictions

#### 3. "ApiNotActivatedMapError"
**Solution:** Enable Maps JavaScript API in Google Cloud Console

#### 4. "InvalidKeyMapError"
**Solution:** Verify API key is correct and properly restricted

### Debug Steps

1. **Check Browser Console** - Look for specific error messages
2. **Verify Environment Variables** - Ensure API key is loaded
3. **Test API Key** - Use Google's API key tester
4. **Check Billing** - Ensure billing account is active

## Cost Management

### Free Tier
- **$200 monthly credit** for Maps API usage
- **Most applications** stay within free tier limits
- **Monitor usage** in Google Cloud Console

### Cost Optimization
- Implement map caching
- Use static maps for simple displays
- Monitor usage with budget alerts
- Set up usage quotas

## Security Best Practices

### API Key Security
- **Never commit** API keys to version control
- **Use environment variables** for all secrets
- **Restrict API keys** to specific domains and APIs
- **Rotate API keys** regularly

### Domain Restrictions
- Add all development domains (`http://localhost:*`)
- Add all production domains (`https://*.vercel.app`)
- Remove unused domains regularly

### Monitoring
- Set up budget alerts in Google Cloud Console
- Monitor API usage patterns
- Review security logs regularly

## Performance Optimization

### Map Loading
- Implement lazy loading for maps
- Use appropriate zoom levels
- Optimize marker clustering
- Cache map tiles when possible

### Data Optimization
- Load data asynchronously
- Implement pagination for large datasets
- Use efficient data structures
- Minimize API calls

## Testing

### Local Development Testing
1. Start development server: `npm run dev`
2. Navigate to `/insights` page
3. Verify map loads correctly
4. Test interactive features
5. Check console for errors

### Production Testing
1. Deploy to Vercel
2. Test on production domain
3. Verify domain restrictions work
4. Test all map interactions
5. Monitor performance metrics

## Migration & Updates

### API Version Updates
- Google Maps API versions are updated regularly
- Monitor Google's release notes
- Test new versions in staging
- Update implementation as needed

### Key Rotation
- Rotate API keys every 6-12 months
- Update environment variables
- Test with new keys before disabling old ones
- Update deployment configurations

## Support Resources

### Google Maps Documentation
- [Maps JavaScript API Guide](https://developers.google.com/maps/documentation/javascript)
- [API Reference](https://developers.google.com/maps/documentation/javascript/reference)
- [Troubleshooting Guide](https://developers.google.com/maps/troubleshooting)

### Right4All Resources
- [Frontend README](../README.md)
- [Deployment Guide](../../DEPLOYMENT.md)
- [Project Structure](../../docs/project-structure.md)

---

**Last Updated**: October 2025  
**Google Maps API Version**: 3.55  
**Compatibility**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
