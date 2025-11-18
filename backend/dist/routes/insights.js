"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseService_1 = require("../services/databaseService");
const router = express_1.default.Router();
// Get overview/summary data
router.get('/overview', async (req, res) => {
    try {
        const data = await databaseService_1.db.getOverviewData();
        res.json(data);
    }
    catch (error) {
        console.error('Overview endpoint error:', error);
        res.status(500).json({
            error: 'Failed to fetch overview data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get all states data
router.get('/states', async (req, res) => {
    try {
        const rows = await databaseService_1.db.getStatesData();
        res.json({ rows });
    }
    catch (error) {
        console.error('States endpoint error:', error);
        res.status(500).json({
            error: 'Failed to fetch states data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get all sectors data
router.get('/sectors', async (req, res) => {
    try {
        const rows = await databaseService_1.db.getSectorsData();
        res.json({ rows });
    }
    catch (error) {
        console.error('Sectors endpoint error:', error);
        res.status(500).json({
            error: 'Failed to fetch sectors data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get all nationalities data
router.get('/nationalities', async (req, res) => {
    try {
        const rows = await databaseService_1.db.getNationalitiesData();
        res.json({ rows });
    }
    catch (error) {
        console.error('Nationalities endpoint error:', error);
        res.status(500).json({
            error: 'Failed to fetch nationalities data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get specific state data
router.get('/states/:stateCode', async (req, res) => {
    try {
        const { stateCode } = req.params;
        const query = `
      SELECT 
        state_code,
        state_name_en,
        migrant_number,
        risk_level,
        manuf_perc_in_state,
        const_perc_in_state,
        agric_percent_in_state
      FROM states 
      WHERE state_code = $1
    `;
        const result = await databaseService_1.db.query(query, [stateCode]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'State not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('State detail endpoint error:', error);
        res.status(500).json({
            error: 'Failed to fetch state data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Get specific sector data
router.get('/sectors/:sectorId', async (req, res) => {
    try {
        const { sectorId } = req.params;
        const query = `
      SELECT 
        sector_id,
        sector_name,
        description,
        total_accidents_2023,
        accident_risk_level,
        "2001_perc",
        "2005_perc", 
        "2010_perc",
        "2015_perc",
        "2020_perc",
        "2023_perc"
      FROM sectors
      WHERE sector_id = $1
    `;
        const result = await databaseService_1.db.query(query, [sectorId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Sector not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Sector detail endpoint error:', error);
        res.status(500).json({
            error: 'Failed to fetch sector data',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=insights.js.map