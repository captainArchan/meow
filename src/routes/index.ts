import { Router } from 'express';
import { verifyToken } from '../../middleware/auth';
export const router = Router();

router.get('/', verifyToken,(req, res) => {
  res.send("What's up doc ?!");
});