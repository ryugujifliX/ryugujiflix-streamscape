
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all anime
router.get('/', async (req, res) => {
  try {
    const anime = await prisma.anime.findMany();
    res.json(anime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
});

// Get anime by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const anime = await prisma.anime.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!anime) {
      return res.status(404).json({ error: 'Anime not found' });
    }
    
    res.json(anime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime' });
  }
});

export default router;

