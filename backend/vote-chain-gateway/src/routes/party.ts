import { Router } from 'express';
import { invokeTransaction } from '../blockchain/blockchain';
import { getAllParties, getParty } from '../blockchain/parties';
import { Contract } from '@hyperledger/fabric-gateway';

const router: Router = Router();

router.get('/status', (req, res) => {
  res.sendStatus(200);
});

router.get('/', async (req, res) => {
  const response = await invokeTransaction(getAllParties);
  console.log(response);
  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'ID is required' });
  }

  const response = await invokeTransaction(async (contract: Contract) => {
    return await getParty(contract, id);
  });
  res.send(response);
});

export default router;
