
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's watch history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const watchHistory = await prisma.watchHistory.findMany({
      where: { userId: req.user.id },
      include: { anime: true }
    });
    res.json(watchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watch history' });
  }
});

// Update watch history
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { animeId, episodeId, timestamp, completed } = req.body;
    
    const watchHistory = await prisma.watchHistory.upsert({
      where: {
        userId_animeId_episodeId: {
          userId: req.user.id,
          animeId,
          episodeId
        }
      },
      update: {
        timestamp,
        completed,
        lastWatched: new Date()
      },
      create: {
        userId: req.user.id,
        animeId,
        episodeId,
        timestamp,
        completed
      }
    });
    
    res.json(watchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update watch history' });
  }
});

export default router;

