"use strict";
/**
 * Migration script to generate embeddings for existing database content
 * Run this script once to populate the embedding columns with vector data
 *
 * Usage: npx tsx src/scripts/generate-embeddings.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databaseService_1 = require("../services/databaseService");
const embeddingService_1 = require("../services/embeddingService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function generateEmbeddingsForTable(tableName, contentBuilder) {
    console.log(`\n📊 Processing ${tableName}...`);
    try {
        // Fetch all rows from the table
        const result = await databaseService_1.db.query(`SELECT * FROM ${tableName}`);
        const rows = result.rows;
        if (rows.length === 0) {
            console.log(`  ⚠️  No data found in ${tableName}`);
            return;
        }
        console.log(`  Found ${rows.length} rows`);
        // Generate content for embeddings
        const contentRows = rows.map((row) => ({
            id: row.id,
            content: contentBuilder(row)
        }));
        // Generate embeddings in batches
        console.log(`  🔄 Generating embeddings...`);
        const texts = contentRows.map(r => r.content);
        const embeddings = await embeddingService_1.embeddingService.generateEmbeddings(texts);
        // Update database with embeddings
        console.log(`  💾 Saving embeddings to database...`);
        let updateCount = 0;
        for (let i = 0; i < contentRows.length; i++) {
            const { id } = contentRows[i];
            const embedding = embeddings[i];
            await databaseService_1.db.query(`UPDATE ${tableName} SET embedding = $1 WHERE id = $2`, [JSON.stringify(embedding), id]);
            updateCount++;
            // Progress indicator
            if (updateCount % 10 === 0 || updateCount === contentRows.length) {
                process.stdout.write(`\r  Progress: ${updateCount}/${contentRows.length}`);
            }
        }
        console.log(`\n  ✅ Successfully updated ${updateCount} rows in ${tableName}`);
    }
    catch (error) {
        console.error(`  ❌ Error processing ${tableName}:`, error.message);
        throw error;
    }
}
async function main() {
    console.log('🚀 Starting embedding generation for RAG system...');
    console.log('This may take several minutes depending on the amount of data.\n');
    try {
        // Test database connection
        const connected = await databaseService_1.db.testConnection();
        if (!connected) {
            throw new Error('Failed to connect to database');
        }
        // 1. Generate embeddings for rights_guide
        await generateEmbeddingsForTable('rights_guide', (row) => {
            return `Question: ${row.question}\nAnswer: ${row.answer}\nCategory: ${row.category || ''}`;
        });
        // 2. Generate embeddings for employment_laws
        await generateEmbeddingsForTable('employment_laws', (row) => {
            return `${row.title} - ${row.section || ''}\n${row.content}\nType: ${row.law_type || ''}`;
        });
        // 3. Generate embeddings for faq
        await generateEmbeddingsForTable('faq', (row) => {
            return `Question: ${row.question}\nAnswer: ${row.answer}\nCategory: ${row.category || ''}`;
        });
        // 4. Generate embeddings for wage_rules
        await generateEmbeddingsForTable('wage_rules', (row) => {
            return `${row.rule_name}: ${row.description}\nFormula: ${row.formula || 'N/A'}\nType: ${row.rule_type}`;
        });
        console.log('\n\n✨ All embeddings generated successfully!');
        console.log('\n📌 Next steps:');
        console.log('1. Verify embeddings: SELECT COUNT(*) FROM rights_guide WHERE embedding IS NOT NULL;');
        console.log('2. Test vector search in your chatbot');
        console.log('3. Monitor response quality and relevance');
    }
    catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        process.exit(1);
    }
    finally {
        await databaseService_1.db.close();
    }
}
// Run the script
main();
//# sourceMappingURL=generate-embeddings.js.map