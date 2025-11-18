import React from 'react'
import { useTranslateContent } from '../hooks/useTranslateContent'

interface TranslatedTextProps {
  children: string
  from?: string
  enabled?: boolean
  className?: string
  loading?: React.ReactNode
  error?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  [key: string]: any // Allow passing through other props
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({
  children,
  from = 'en',
  enabled = true,
  className,
  loading,
  error: errorComponent,
  as: Component = 'span',
  ...props
}) => {
  const { text, isLoading, error } = useTranslateContent(children, {
    from,
    enabled
  })

  if (isLoading && loading) {
    return <>{loading}</>
  }

  if (error && errorComponent) {
    return <>{errorComponent}</>
  }

  return (
    <Component className={className} {...props}>
      {text}
      {isLoading && (
        <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" 
              title="Translating..." 
              aria-label="Translating" />
      )}
    </Component>
  )
}

// Pre-configured components for common use cases
export const TranslatedHeading: React.FC<Omit<TranslatedTextProps, 'as'>> = (props) => (
  <TranslatedText as="h1" {...props} />
)

export const TranslatedParagraph: React.FC<Omit<TranslatedTextProps, 'as'>> = (props) => (
  <TranslatedText as="p" {...props} />
)

export const TranslatedButton: React.FC<Omit<TranslatedTextProps, 'as'>> = (props) => (
  <TranslatedText as="button" {...props} />
)

export const TranslatedSpan: React.FC<Omit<TranslatedTextProps, 'as'>> = (props) => (
  <TranslatedText as="span" {...props} />
)

// Higher-order component for translating content
export const withTranslation = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  textExtractor?: (props: P) => string
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const textToTranslate = textExtractor ? textExtractor(props) : ''
    const { text } = useTranslateContent(textToTranslate)
    
    const enhancedProps = textExtractor
      ? { ...props, translatedText: text }
      : props
    
    return <WrappedComponent ref={ref} {...enhancedProps} />
  })
}