import { Router } from 'express';

const router: Router = Router();

router.get('/status', (req, res) => {
  res.sendStatus(200);
});

export default router;
