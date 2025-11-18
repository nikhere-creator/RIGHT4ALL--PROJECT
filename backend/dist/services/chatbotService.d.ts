interface ChatResponse {
    answer: string;
    sourceType: 'database' | 'general' | 'off-topic';
    citations: string[];
    responseTime: number;
}
interface WageCalculation {
    steps: string[];
    citation: string;
    totalOvertimePay?: number;
}
declare class ChatbotService {
    private apiKey;
    private apiUrl;
    private timeoutMs;
    constructor();
    private isRelevantQuestion;
    private searchDatabaseWithTimeout;
    private searchDatabaseRAG;
    private fallbackKeywordSearch;
    private buildSystemPrompt;
    private callDeepSeek;
    chat(question: string, language?: string): Promise<ChatResponse>;
    private generateFallbackAnswer;
    calculateWage(monthlySalary: number, overtimeHours?: number): Promise<WageCalculation>;
    saveConversation(sessionId: string, question: string, response: ChatResponse, language: string): Promise<void>;
}
export declare const chatbotService: ChatbotService;
export {};
//# sourceMappingURL=chatbotService.d.ts.map