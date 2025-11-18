"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const translationService_1 = require("../services/translationService");
const zod_1 = require("zod");
const router = express_1.default.Router();
// Validation schemas
const translateSchema = zod_1.z.object({
    text: zod_1.z.string().min(1).max(5000), // Limit text length
    from: zod_1.z.string().length(2).default('en'),
    to: zod_1.z.string().length(2)
});
const batchTranslateSchema = zod_1.z.object({
    texts: zod_1.z.array(zod_1.z.string().min(1).max(5000)).max(100), // Limit array size
    from: zod_1.z.string().length(2).default('en'),
    to: zod_1.z.string().length(2)
});
// Single text translation
router.post('/translate', async (req, res) => {
    try {
        const { text, from, to } = translateSchema.parse(req.body);
        const translation = await translationService_1.translationService.translate(text, from, to);
        res.json({
            success: true,
            data: {
                originalText: text,
                translatedText: translation,
                from,
                to
            }
        });
    }
    catch (error) {
        console.error('Translation error:', error);
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid input',
                details: error.errors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Translation failed'
        });
    }
});
// Batch text translation
router.post('/translate/batch', async (req, res) => {
    try {
        const { texts, from, to } = batchTranslateSchema.parse(req.body);
        const translations = await translationService_1.translationService.translateBatch(texts, from, to);
        res.json({
            success: true,
            data: {
                translations,
                from,
                to,
                count: texts.length
            }
        });
    }
    catch (error) {
        console.error('Batch translation error:', error);
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Invalid input',
                details: error.errors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Batch translation failed'
        });
    }
});
// Get supported languages
router.get('/languages', (req, res) => {
    const languages = translationService_1.translationService.getSupportedLanguages();
    res.json({
        success: true,
        data: {
            languages,
            count: languages.length
        }
    });
});
// Clear translation cache (admin endpoint)
router.delete('/cache', (req, res) => {
    try {
        translationService_1.translationService.clearCache();
        res.json({
            success: true,
            message: 'Translation cache cleared'
        });
    }
    catch (error) {
        console.error('Cache clear error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear cache'
        });
    }
});
exports.default = router;
//# sourceMappingURL=translation.js.map