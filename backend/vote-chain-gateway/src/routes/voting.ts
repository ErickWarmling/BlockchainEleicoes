import { Router } from 'express';
import { invokeTransaction } from '../blockchain/blockchain';
import { Contract } from '@hyperledger/fabric-gateway';
import { getAllVotes, registerVote } from '../blockchain/voting';
import { v4 as uuidv4 } from 'uuid';
import { saveVoteToDatabase } from '../dao/voteRepository'
import { hasVoted, markAsVoted } from '../dao/voteControlRepository';
import { hashCPF } from '../utils/hashCpf';
import { validateCPF } from '../utils/validateCpf';
import { generateVoteHash } from '../utils/hashVote';

const router: Router = Router();

router.get('/status', (req, res) => {
  res.sendStatus(200);
});

router.get('/', async (req, res) => {
  const response = await invokeTransaction(getAllVotes);
  console.log(response);
  res.send(response);
});

router.post('/', async (req, res): Promise<void> => {
  const { votingCode, cpf } = req.body;

  if (!votingCode || !cpf) {
    res.status(400).json({ error: 'Código de votação e CPF são obrigatórios.'});
    return;
  }

  if (!validateCPF(cpf)) {
    res.status(400).json({ error:'CPF inválido.' })
    return;
  }

  const cpfHashed = hashCPF(cpf);
  const alreadyVoted = await hasVoted(cpfHashed);

  if (alreadyVoted) {
    res.status(400).json( {error: 'Este CPF já votou.' });
    return;
  }

  const idVote = uuidv4();
  const createdAt = Date.now();
  const voteHash = generateVoteHash(idVote, votingCode, createdAt);

  try {
    // 1. Salvar no banco de dados PostgreSQL
    await saveVoteToDatabase(idVote, votingCode, createdAt, voteHash);

    // 2. Salvar na blockchain (somente o hash do voto)
    const response = await invokeTransaction(async (contract: Contract) => {
      return await registerVote(contract, idVote, votingCode, createdAt);
    });

    // 3. Marcar CPF como votado
    await markAsVoted(cpfHashed, createdAt);

    res.status(201).json({
      message: 'Voto registrado com sucesso!',
      idVote,
      blockchain: response,
    });
  } catch (err) {
    console.error('Erro ao registrar voto:', err);
    res.status(500).json({ error: 'Erro ao registrar voto.' });
  }
});

export default router;