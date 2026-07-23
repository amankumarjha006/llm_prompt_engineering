import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { compareProducts } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/compare', async (req, res) => {
  try {
    const { productA, productB } = req.body;
    
    if (!productA || !productA.trim()) {
      return res.status(400).json({ error: 'Product A is required' });
    }
    
    if (!productB || !productB.trim()) {
      return res.status(400).json({ error: 'Product B is required' });
    }

    const aStr = productA.trim();
    const bStr = productB.trim();

    if (aStr.toLowerCase() === bStr.toLowerCase()) {
      return res.status(400).json({ error: 'Please enter two different products to compare' });
    }

    console.log(`Starting comparison: "${aStr}" vs "${bStr}"`);
    const comparisonResult = await compareProducts(aStr, bStr);
    
    res.json(comparisonResult);
  } catch (error) {
    console.error('Comparison API Error:', error);
    res.status(500).json({ 
      error: 'Failed to complete the comparison', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
