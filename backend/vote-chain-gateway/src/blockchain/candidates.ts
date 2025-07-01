import { Contract } from '@hyperledger/fabric-gateway';
import { TextDecoder } from 'util';
import { Candidate } from '../entities/candidate';
import { extractInnerJson } from '../utils/string.utils';

type RegisterCandidateResponse = {
  message: string;
  candidateId: string;
  timestamp: string;
};

export type MessageDetails = {
  code: number;
  message: string;
};

const utf8Decoder = new TextDecoder();

export const getAllCandidates = async (
  contract: Contract,
): Promise<Candidate[]> => {
  const resultBytes = await contract.evaluateTransaction(
    'CandidateRegisterContract:GetAllCandidates',
  );

  const resultJson = utf8Decoder.decode(resultBytes);
  const result: Candidate[] = JSON.parse(resultJson);
  return result;
};

export const getCandidate = async (
  contract: Contract,
  idCandidate: string,
): Promise<Candidate | MessageDetails> => {
  try {
    const resultBytes = await contract.evaluateTransaction(
      'CandidateRegisterContract:QueryCandidate',
      idCandidate,
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: Candidate = JSON.parse(resultJson);
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

export const getCandidateByVotingCode = async (
  contract: Contract,
  votingCode: string,
): Promise<Candidate | MessageDetails> => {
  try {
    const resultBytes = await contract.evaluateTransaction(
      'CandidateRegisterContract:QueryCandidateByVotingCode',
      votingCode,
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: Candidate = JSON.parse(resultJson);
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

export const registerCandidate = async (
  contract: Contract,
  idCandidate: string,
  name: string,
  idParty: string,
  votingCode: number,
): Promise<RegisterCandidateResponse | MessageDetails> => {
  try {
    const resultBytes = await contract.submitTransaction(
      'CandidateRegisterContract:RegisterCandidate',
      idCandidate,
      name,
      idParty,
      votingCode.toString(),
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: RegisterCandidateResponse = JSON.parse(resultJson);

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
): Promise<RegisterCandidateResponse | MessageDetails> => {
  try {
    const resultBytes = await contract.submitTransaction(
      'CandidateRegisterContract:UpdateCandidate',
      idCandidate,
      name,
      idParty,
      votingCode.toString(),
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: RegisterCandidateResponse = JSON.parse(resultJson);

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
