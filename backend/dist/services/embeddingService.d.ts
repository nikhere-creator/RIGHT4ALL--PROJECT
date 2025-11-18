interface EmbeddingResponse {
    embedding: number[];
    model: string;
    tokens: number;
}
declare class EmbeddingService {
    private model;
    private extractor;
    private isInitialized;
    private initPromise;
    constructor();
    /**
     * Initialize the local embedding model (lazy loading)
     */
    private initialize;
    /**
     * Generate embedding for a single text
     */
    generateEmbedding(text: string): Promise<EmbeddingResponse>;
    /**
     * Generate embeddings for multiple texts (batch processing)
     */
    generateEmbeddings(texts: string[]): Promise<number[][]>;
    /**
     * Clean text for embedding generation
     */
    private cleanText;
    /**
     * Sleep utility for retry delays
     */
    private sleep;
    /**
     * Calculate cosine similarity between two vectors
     */
    cosineSimilarity(a: number[], b: number[]): number;
}
export declare const embeddingService: EmbeddingService;
export {};
//# sourceMappingURL=embeddingService.d.ts.map