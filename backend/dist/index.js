"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const translation_1 = __importDefault(require("./routes/translation"));
const insights_1 = __importDefault(require("./routes/insights"));
const community_1 = __importDefault(require("./routes/community"));
const chatbot_1 = __importDefault(require("./routes/chatbot"));
const databaseService_1 = require("./services/databaseService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Test database connection on startup
async function initializeDatabase() {
    const isConnected = await databaseService_1.db.testConnection();
    if (!isConnected) {
        console.error('❌ Failed to connect to database');
        process.exit(1);
    }
}
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        service: 'right4all-backend',
        time: new Date().toISOString()
    });
});
// Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Right4All Backend API' });
});
// Translation routes
app.use('/api/translation', translation_1.default);
// Insights routes (labor market data from Neon database)
app.use('/api/insights', insights_1.default);
// Community routes (organizations, stories, resources)
app.use('/api/community', community_1.default);
// Chatbot routes (AI assistant with RAG)
app.use('/api/chatbot', chatbot_1.default);
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    await databaseService_1.db.close();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down server...');
    await databaseService_1.db.close();
    process.exit(0);
});
// Start server (for local development)
async function startServer() {
    await initializeDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Labor Market API: http://localhost:${PORT}/api/insights/`);
        console.log(`🌐 Translation API: http://localhost:${PORT}/api/translation/`);
        console.log(`🤖 Chatbot API: http://localhost:${PORT}/api/chatbot/`);
    });
}
// Export for Vercel
exports.default = app;
// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    startServer().catch(console.error);
}
//# sourceMappingURL=index.js.map