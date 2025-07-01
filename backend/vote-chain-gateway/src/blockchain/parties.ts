import { Contract } from '@hyperledger/fabric-gateway';
import { TextDecoder } from 'util';
import { Party } from '../entities/party';
import { extractInnerJson } from '../utils/string.utils';
import { MessageDetails } from './candidates';

const utf8Decoder = new TextDecoder();

export const getAllParties = async (contract: Contract): Promise<Party[]> => {
  const resultBytes = await contract.evaluateTransaction(
    'PartyManagementContract:GetAllParties',
  );

  const resultJson = utf8Decoder.decode(resultBytes);
  const result: Party[] = JSON.parse(resultJson);
  return result;
};

export const getParty = async (
  contract: Contract,
  idParty: string,
): Promise<Party | MessageDetails> => {
  try {
    const resultBytes = await contract.evaluateTransaction(
      'PartyManagementContract:GetParty',
      idParty,
    );

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: Party = JSON.parse(resultJson);
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
