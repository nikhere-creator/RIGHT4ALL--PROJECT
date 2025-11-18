# Translation System Documentation

## Overview

The Right4All platform features a comprehensive translation system that enables dynamic translation of webpage content into 5 languages: English, Bahasa Malaysia, Nepali, Hindi, and Bengali.

## Architecture

### Backend Translation API

**Location**: `backend/src/services/translationService.ts`

**Features**:
- Multiple translation providers (Google Translate, LibreTranslate, Static fallbacks)
- Built-in caching system
- Batch translation support
- Error handling with fallbacks

**API Endpoints**:
- `POST /api/translation/translate` - Single text translation
- `POST /api/translation/translate/batch` - Batch translation
- `GET /api/translation/languages` - Get supported languages
- `DELETE /api/translation/cache` - Clear translation cache

### Frontend Translation System

**Components**:
- `TranslationProvider` - React context provider
- `TranslatedText` - Component for individual text translation
- `TranslatedParagraph` - Component for paragraph translation
- `TranslatedHeading` - Component for heading translation

**Hooks**:
- `useTranslateContent` - Hook for single text translation
- `useTranslateBatch` - Hook for multiple texts translation

## Usage Examples

### Basic Text Translation

```tsx
import { TranslatedText } from '@/components/TranslatedText'

function MyComponent() {
  return (
    <div>
      <TranslatedText>Hello, welcome to our platform</TranslatedText>
    </div>
  )
}
```

### Paragraph Translation

```tsx
import { TranslatedParagraph } from '@/components/TranslatedText'

function MyComponent() {
  return (
    <TranslatedParagraph className="text-lg text-gray-600">
      This is a longer paragraph that will be translated automatically 
      based on the user's selected language.
    </TranslatedParagraph>
  )
}
```

### Custom Hook Usage

```tsx
import { useTranslateContent } from '@/hooks/useTranslateContent'

function MyComponent() {
  const { text, isLoading } = useTranslateContent('Original English text')
  
  return (
    <div>
      {isLoading ? 'Translating...' : text}
    </div>
  )
}
```

### Batch Translation

```tsx
import { useTranslateBatch } from '@/hooks/useTranslateContent'

function MyComponent() {
  const texts = ['Home', 'About', 'Contact', 'Services']
  const { getTranslatedText, isLoading } = useTranslateBatch(texts)
  
  return (
    <nav>
      {texts.map(text => (
        <a key={text} href="#">
          {isLoading ? text : getTranslatedText(text)}
        </a>
      ))}
    </nav>
  )
}
```

## Configuration

### Backend Environment Variables

```env
# Optional: Google Translate API
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# Optional: LibreTranslate API
LIBRETRANSLATE_URL=https://libretranslate.com/translate
LIBRETRANSLATE_API_KEY=your_libretranslate_api_key
```

### Frontend Environment Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

## Translation Providers

### 1. Static Translation Provider (Always Available)
- Contains pre-defined translations for common phrases
- Used as primary fallback
- No external API dependency

### 2. Google Translate API (Optional)
- Requires API key
- High-quality translations
- Supports all target languages

### 3. LibreTranslate API (Optional)
- Free alternative to Google Translate
- Self-hostable or use public instance
- Open source solution

## Supported Languages

| Language | Code | Native Name |
|----------|------|-------------|
| English | `en` | English |
| Bahasa Malaysia | `ms` | Bahasa Malaysia |
| Nepali | `ne` | नेपाली |
| Hindi | `hi` | हिंदी |
| Bengali | `bn` | বাংলা |

## Caching System

- **Frontend Cache**: In-memory caching of translated texts
- **Backend Cache**: Server-side caching for API responses
- **Performance**: Reduces API calls and improves response times
- **Cache Management**: Automatic cleanup and manual clear options

## Error Handling

1. **Translation Failure**: Returns original text if translation fails
2. **API Unavailable**: Falls back to next available provider
3. **Network Issues**: Uses cached translations when possible
4. **Invalid Input**: Validates input and provides meaningful error messages

## Best Practices

### Performance
- Use batch translation for multiple texts
- Leverage caching for repeated content
- Implement loading states for better UX

### Implementation
- Wrap individual phrases/sentences for better accuracy
- Use semantic HTML elements with translation components
- Test translations with actual content, not placeholder text

### Accessibility
- Provide loading indicators during translation
- Ensure translated text maintains readability
- Consider text expansion for different languages

## Troubleshooting

### Common Issues

1. **Translations Not Appearing**
   - Check if TranslationProvider wraps your app
   - Verify API endpoint configuration
   - Check browser console for errors

2. **API Rate Limits**
   - Implement proper caching
   - Use batch translation for multiple texts
   - Consider upgrading to paid API plans

3. **Poor Translation Quality**
   - Review and improve static translations
   - Consider context-specific translations
   - Use shorter, clearer source text

### Debug Mode

Enable debug logging by setting:
```typescript
// In translation service
console.log('Translation request:', { text, from, to })
```

## Future Enhancements

- Support for additional languages
- Translation confidence scoring
- User-contributed translation corrections
- Offline translation capabilities
- Context-aware translations