import { Contract } from '@hyperledger/fabric-gateway';
import { TextDecoder } from 'util';
import { extractInnerJson } from '../utils/string.utils';
import { MessageDetails } from './candidates';
import { Vote } from '../entities/vote';

type RegisterVoteResponse = {
  message: string;
  candidateId: string;
  timestamp: string;
};

const utf8Decoder = new TextDecoder();

export const getAllVotes = async (contract: Contract): Promise<Vote[]> => {
  const resultBytes = await contract.evaluateTransaction(
    'VotingContract:GetAllVotes',
  );

  const resultJson = utf8Decoder.decode(resultBytes);
  const result: Vote[] = JSON.parse(resultJson);
  return result;
};

export const getVotesByCandidate = async (
  contract: Contract,
  idCandidate: string,
): Promise<Vote | MessageDetails> => {
  try {
    const resultBytes = await contract.evaluateTransaction(
      'VotingContract:GetVotesByCandidate',
      idCandidate,
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: Vote = JSON.parse(resultJson);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    try {
      const errorDetails = extractInnerJson(error.details);
      if (!errorDetails) {
        throw error;
      }
      console.error('Error details:', errorDetails);
      return errorDetails as unknown as MessageDetails;
    } catch {
      console.error('Erro inesperado', error);
      return { code: 500, message: 'Erro inesperado' };
    }
  }
};

export const registerVote = async (
  contract: Contract,
  idVote: string,
  votingCode: number,
  createdAt: number,
): Promise<RegisterVoteResponse | MessageDetails> => {
  try {
    console.log('Registering vote:', idVote, votingCode, createdAt);
    const resultBytes = await contract.submitTransaction(
      'VotingContract:RegisterVote',
      idVote,
      votingCode.toString(),
      createdAt.toString(),
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: RegisterVoteResponse = JSON.parse(resultJson);

    console.log(
      `Success: ${result.message} (ID: ${result.candidateId}, Timestamp: ${result.timestamp})`,
    );
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    try {
      const errorDetails = extractInnerJson(error.details);
      if (!errorDetails) {
        throw error;
      }
      console.error('Error details:', errorDetails);
      return errorDetails as unknown as MessageDetails;
    } catch {
      console.error('Erro inesperado', error);
      return { code: 500, message: 'Erro inesperado' };
    }
  }
};

export const updateCandidate = async (
  contract: Contract,
  idCandidate: string,
  name: string,
  idParty: string,
  votingCode: number,
): Promise<MessageDetails> => {
  try {
    const resultBytes = await contract.submitTransaction(
      'CandidateRegisterContract:UpdateCandidate',
      idCandidate,
      name,
      idParty,
      votingCode.toString(),
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: MessageDetails = JSON.parse(resultJson);

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    try {
      const errorDetails = extractInnerJson(error.details);
      if (!errorDetails) {
        throw error;
      }
      console.error('Error details:', errorDetails);
      return errorDetails as unknown as MessageDetails;
    } catch {
      console.error('Erro inesperado', error);
      return { code: 500, message: 'Erro inesperado' };
    }
  }
};

export const deleteCandidate = async (
  contract: Contract,
  idCandidate: string,
): Promise<MessageDetails> => {
  try {
    const resultBytes = await contract.submitTransaction(
      'CandidateRegisterContract:DeleteCandidate',
      idCandidate,
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: MessageDetails = JSON.parse(resultJson);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    try {
      const errorDetails = extractInnerJson(error.details);
      if (!errorDetails) {
        throw error;
      }
      console.error('Error details:', errorDetails);
      return errorDetails as unknown as MessageDetails;
    } catch {
      console.error('Erro inesperado', error);
      return { code: 500, message: 'Erro inesperado' };
    }
  }
};
