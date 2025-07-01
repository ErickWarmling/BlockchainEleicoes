import { generateVoteHash } from '../utils/hashVote';
import pool from './db';

/**
 * @param idVote UUID do voto
 * @param votingCode Código de votação do candidato
 * @param createdAt Timestamp em milissegundos
 */
export async function saveVoteToDatabase(
  idVote: string,
  votingCode: number,
  createdAt: number,
  voteHash: string
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO votes (id_vote, voting_code, created_at, vote_hash)
       VALUES ($1, $2, to_timestamp($3 / 1000.0), $4)`,
      [idVote, votingCode, createdAt, voteHash]
    );
    console.log(`[DB] Voto ${idVote} salvo com sucesso no banco.`);
  } catch (error) {
    console.error('[DB] Erro ao salvar voto no banco:', error);
    throw error;
  }
}