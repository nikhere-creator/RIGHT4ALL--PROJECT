export declare class TranslationService {
    private providers;
    private cache;
    constructor();
    private getCacheKey;
    translate(text: string, from: string | undefined, to: string): Promise<string>;
    translateBatch(texts: string[], from: string | undefined, to: string): Promise<Record<string, string>>;
    clearCache(): void;
    getSupportedLanguages(): string[];
}
export declare const translationService: TranslationService;
//# sourceMappingURL=translationService.d.ts.map