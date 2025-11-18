export declare class DatabaseService {
    private pool;
    constructor();
    testConnection(): Promise<boolean>;
    query(text: string, params?: any[]): Promise<any>;
    getStatesData(): Promise<any[]>;
    getSectorsData(): Promise<any[]>;
    getNationalitiesData(): Promise<any[]>;
    getOverviewData(): Promise<any>;
    getOrganizationsData(): Promise<any[]>;
    getSurvivorStoriesData(): Promise<any[]>;
    getPracticalGuidesData(): Promise<any[]>;
    getOrganizationsByCategory(category: string): Promise<any[]>;
    searchOrganizations(searchTerm: string): Promise<any[]>;
    close(): Promise<void>;
}
export declare const db: DatabaseService;
//# sourceMappingURL=databaseService.d.ts.map