import {Router} from 'express';
import {authRoutes} from './auth';

const router = Router();
authRoutes(router);
router.get('/', (req, res) => {
  return res.json({message: 'Hello, World!'});
});

export default router;