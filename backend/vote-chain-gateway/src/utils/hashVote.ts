import crypto from 'crypto';

export function generateVoteHash(
  idVote: string,
  votingCode: number,
  createdAt: number
): string {
  const data = `${idVote}:${votingCode}:${createdAt}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}
