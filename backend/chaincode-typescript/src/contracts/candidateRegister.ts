import {
  Context,
  Contract,
  Info,
  Returns,
  Transaction,
} from "fabric-contract-api";
import { Candidate } from "../entities/candidate";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { PartyManagementContract } from "./partyManagement";
import { VotingContract } from "./voting";
import errors from "../messages/errors";
import success from "../messages/success";

@Info({
  title: "CandidateRegister",
  description: "Smart contract for registering candidates",
})
export class CandidateRegisterContract extends Contract {
  @Transaction()
  @Returns("string")
  public async RegisterCandidate(
    ctx: Context,
    idCandidate: string,
    name: string,
    idParty: string,
    votingCode: number
  ): Promise<string> {
    // Candidate must not exist
    if (await this.CandidateExists(ctx, idCandidate)) {
      throw new Error(JSON.stringify(errors.CANDIDATE_ALREADY_EXISTS));
    }

    // Party must exist
    if (!(await this.PartyExists(ctx, idParty))) {
      throw new Error(JSON.stringify(errors.PARTY_NOT_FOUND));
    }

    // Voting code must be a 5-digit number
    if (!this.IsVotingCodeValid(votingCode)) {
      throw new Error(JSON.stringify(errors.INVALID_VOTING_CODE));
    }

    // Voting code must be unique
    const votingCodeExists = await this.QueryCandidateByVotingCode(
      ctx,
      votingCode
    );
    if (votingCodeExists.length > 0) {
      throw new Error(JSON.stringify(errors.VOTING_CODE_ALREADY_EXISTS));
    }

    const candidate: Candidate = {
      idCandidate,
      name,
      idParty,
      votingCode,
      docType: "candidate",
    };

    await ctx.stub.putState(
      idCandidate,
      Buffer.from(stringify(sortKeysRecursive(candidate)))
    );

    console.info(`Candidate ${name} registered.`);
    return JSON.stringify(success.CANDIDATE_REGISTERED);
  }

  @Transaction()
  public async QueryCandidate(ctx: Context, id: string): Promise<Candidate> {
    const candidateJSON = await ctx.stub.getState(id);
    if (candidateJSON.length === 0) {
      throw new Error(JSON.stringify(errors.CANDIDATE_DOESNT_EXISTS));
    }

    const candidate: Candidate = JSON.parse(
      candidateJSON.toString()
    ) as Candidate;

    if (candidate.docType !== "candidate") {
      throw new Error(JSON.stringify(errors.ASSET_TYPE_MISMATCH));
    }

    return candidate;
  }

  @Transaction()
  public async QueryCandidateByVotingCode(
    ctx: Context,
    votingCode: number
  ): Promise<Candidate[]> {
    const query = {
      selector: {
        docType: "candidate",
        votingCode,
      },
    };

    const queryString = JSON.stringify(query);
    const iterator = await ctx.stub.getQueryResult(queryString);

    const results: Candidate[] = [];
    let result = await iterator.next();
    while (!result.done) {
      const record = result.value.value.toString();
      const candidate = JSON.parse(record) as Candidate;
      results.push(candidate);
      result = await iterator.next();
    }
    await iterator.close();
    return results;
  }

  @Transaction()
  @Returns("string")
  public async UpdateCandidate(
    ctx: Context,
    idCandidate: string,
    name: string,
    idParty: string,
    votingCode: number
  ): Promise<string> {
    // Candidate must not exist
    if (!(await this.CandidateExists(ctx, idCandidate))) {
      throw new Error(JSON.stringify(errors.CANDIDATE_DOESNT_EXISTS));
    }

    // Won't update candidate if it has votes
    if (await this.CandidateHasVotes(ctx, idCandidate)) {
      throw new Error(JSON.stringify(errors.CANDIDATE_HAS_VOTES));
    }

    // Party must exist
    if (!(await this.PartyExists(ctx, idParty))) {
      throw new Error(JSON.stringify(errors.PARTY_NOT_FOUND));
    }

    // Voting code must be a 5-digit number
    if (!this.IsVotingCodeValid(votingCode)) {
      throw new Error(JSON.stringify(errors.INVALID_VOTING_CODE));
    }

    // Voting code must be unique
    const votingCodeExists = await this.QueryCandidateByVotingCode(
      ctx,
      votingCode
    );
    if (
      votingCodeExists.length > 0 &&
      votingCodeExists[0].idCandidate !== idCandidate
    ) {
      throw new Error(JSON.stringify(errors.VOTING_CODE_ALREADY_EXISTS));
    }

    try {
      const candidate: Candidate = {
        idCandidate,
        name,
        idParty,
        votingCode,
        docType: "candidate",
      };
      await ctx.stub.putState(
        idCandidate,
        Buffer.from(stringify(sortKeysRecursive(candidate)))
      );
      console.info(`Candidate ${name} updated.`);

      return JSON.stringify(success.CANDIDATE_UPDATED);
    } catch (error) {
      console.error("Error updating candidate", error);
      throw new Error(JSON.stringify(errors.CANDIDATE_UPDATE_ERROR));
    }
  }

  @Transaction()
  public async DeleteCandidate(
    ctx: Context,
    idCandidate: string
  ): Promise<string> {
    const exists = await this.CandidateExists(ctx, idCandidate);
    if (!exists) {
      throw new Error(JSON.stringify(errors.CANDIDATE_DOESNT_EXISTS));
    }

    // Won't delete candidate if it has votes
    const hasVotes = await this.CandidateHasVotes(ctx, idCandidate);
    if (hasVotes) {
      throw new Error(JSON.stringify(errors.CANDIDATE_HAS_VOTES));
    }

    try {
      await ctx.stub.deleteState(idCandidate);
      console.info(`Candidate ${idCandidate} deleted.`);
      return JSON.stringify(success.CANDIDATE_DELETED);
    } catch (error) {
      console.error("Error deleting candidate", error);
      throw new Error(JSON.stringify(errors.CANDIDATE_DELETE_ERROR));
    }
  }

  @Transaction()
  public async GetAllCandidates(ctx: Context): Promise<Candidate[]> {
    const allResults: Candidate[] = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record: Candidate;
      try {
        record = JSON.parse(strValue) as Candidate;
        if (record.docType === "candidate") {
          allResults.push(record);
        }
      } catch (err) {
        console.log("Error querying candidates:", err);
      }
      result = await iterator.next();
    }
    return allResults;
  }

  @Transaction(false)
  @Returns("boolean")
  public async CandidateExists(ctx: Context, id: string): Promise<boolean> {
    const candidateJSON = await ctx.stub.getState(id);
    return candidateJSON.length > 0;
  }

  // Verifica se ja recebeu votos
  @Transaction(false)
  @Returns("boolean")
  public async CandidateHasVotes(
    ctx: Context,
    idCandidate: string
  ): Promise<boolean> {
    const votingContract = new VotingContract();
    const candidateVotes = await votingContract.GetVotesByCandidate(
      ctx,
      idCandidate
    );
    return candidateVotes.length > 0;
  }

  @Transaction(false)
  @Returns("boolean")
  public async PartyExists(ctx: Context, idParty: string): Promise<boolean> {
    const partyContract = new PartyManagementContract();
    const partyExists = await partyContract.PartyExists(
      ctx,
      idParty.toString()
    );

    return partyExists;
  }

  @Transaction()
  @Returns("boolean")
  public IsVotingCodeValid(votingCode: number): boolean {
    // Voting code must be a 5-digit number
    if (votingCode < 10000 || votingCode > 99999) {
      return false;
    }
    return true;
  }
}
