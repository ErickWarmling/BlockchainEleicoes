import { Router } from 'express';
import {
  deleteCandidate,
  getAllCandidates,
  getCandidate,
  getCandidateByVotingCode,
  registerCandidate,
  updateCandidate,
} from '../blockchain/candidates';
import { invokeTransaction } from '../blockchain/blockchain';
import { Candidate } from '../entities/candidate';
import { Contract } from '@hyperledger/fabric-gateway';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

router.get('/', async (req, res) => {
  const { votingCode } = req.query;

  if (votingCode) {
    const response = await invokeTransaction(async (contract: Contract) => {
      return await getCandidateByVotingCode(contract, votingCode.toString());
    });
    res.send(response);
    return;
  }

  const response = await invokeTransaction(getAllCandidates);
  console.log(response);
  res.send(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'ID is required' });
  }

  const response = await invokeTransaction(async (contract: Contract) => {
    return await getCandidate(contract, id);
  });
  res.send(response);
});

/**
 * POST /api/candidates
 */
router.post('/', async (req, res) => {
  const { name, idParty, votingCode } = req.body;
  console.log('API CALL (saveCandidate):', req.body);
  const candidate: Candidate = {
    idCandidate: uuidv4(),
    name,
    idParty,
    votingCode: Number(votingCode),
  };

  const response = await invokeTransaction(async (contract: Contract) => {
    return await registerCandidate(
      contract,
      candidate.idCandidate,
      candidate.name,
      candidate.idParty,
      candidate.votingCode,
    );
  });
  res.send(response);
});

router.put('/', async (req, res) => {
  const { idCandidate, name, idParty, votingCode } = req.body;
  const candidate: Candidate = {
    idCandidate,
    name,
    idParty,
    votingCode: Number(votingCode),
  };

  const response = await invokeTransaction(async (contract: Contract) => {
    return await updateCandidate(
      contract,
      candidate.idCandidate,
      candidate.name,
      candidate.idParty,
      candidate.votingCode,
    );
  });
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'ID is required' });
  }

  const response = await invokeTransaction(async (contract: Contract) => {
    return await deleteCandidate(contract, id);
  });
  res.send(response);
});

export default router;
