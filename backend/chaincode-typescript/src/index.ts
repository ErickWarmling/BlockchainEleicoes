/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { type Contract } from 'fabric-contract-api';
import { VotingContract } from './contracts/voting';
import { CandidateRegisterContract } from './contracts/candidateRegister';
import { PartyManagementContract } from './contracts/partyManagement';

export const contracts: (typeof Contract)[] = [
    VotingContract,
    CandidateRegisterContract,
    PartyManagementContract,
];
