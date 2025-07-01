import {
  Context,
  Contract,
  Info,
  Returns,
  Transaction,
} from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { Vote } from "../entities/vote";
import { CandidateRegisterContract } from "./candidateRegister";
import { Candidate } from "../entities/candidate";
import errors from "../messages/errors";
import success from "../messages/success";
import { PartyManagementContract } from "./partyManagement";
import * as crypto from "crypto"; //Para criptografar --> Hash

@Info({
  title: "VotingContract",
  description: "Smart contract for voting",
})

export class VotingContract extends Contract {
  @Transaction()
  @Returns("string")
  public async RegisterVote(
    ctx: Context,
    idVote: string,
    votingCode: number,
    createdAt: number
  ): Promise<string> {
    // Queries the candidate by it's voting code
    const candidateContract = new CandidateRegisterContract();
    const candidates: Candidate[] =
      await candidateContract.QueryCandidateByVotingCode(ctx, votingCode);

    // Checks if the candidate exists
    if (!candidates.length || candidates.length === 0) {
      throw new Error(JSON.stringify(errors.CANDIDATE_DOESNT_EXISTS));
    }

    const isValidTimestamp = (timestamp: number): boolean => {
      const date = new Date(timestamp);
      return !isNaN(date.getTime());
    };

    // Checks if the timestamp is valid
    if (!isValidTimestamp(createdAt)) {
      throw new Error(JSON.stringify(errors.VOTE_INVALID_TIMESTAMP));
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const candidate: Candidate = candidates[0];

      const vote = {
        //docType: "vote",
        idVote,
        createdAt,
        idCandidate: candidate.idCandidate,
      };

      
      //console.info(`Vote (HASH) ${idVote} registered ON BLOCKCHAIN -------------------------`);

      //Include HASH code
      const voteString = JSON.stringify(sortKeysRecursive(vote));
      const voteHash = crypto.createHash("sha256").update(voteString).digest("hex");

      
      const voteRecord = {
        docType: "voteHash",
        idVote,
        hash: voteHash,
        idCandidate: candidate.idCandidate,
        createdAt,
      };


      console.info("DEBUG voteRecord: ", voteRecord);
      await ctx.stub.putState(
        idVote,
        Buffer.from(stringify(sortKeysRecursive(voteRecord)))
       
      );
      //To see the message in: Log do container do peer que rodou a chaincode
      //
     console.info(`Vote (HASH) ${idVote} registered ON BLOCKCHAIN`);

      return JSON.stringify({
        message: success.VOTE_REGISTERED,
        voteHash,
        idVote,
        idCandidate: candidate.idCandidate,
        createdAt,
      });

    } catch (error) {
      console.error("Error registering vote", error);
      throw new Error(JSON.stringify(errors.VOTE_REGISTER_ERROR));
    }
  }

  @Transaction()
  public async GetAllVotes(ctx: Context): Promise<Vote[]> {
    const candidateContract = new CandidateRegisterContract();
    const candidates: Candidate[] = await candidateContract.GetAllCandidates(
      ctx
    );

    const partyContract = new PartyManagementContract();

    if (!candidates.length || candidates.length === 0) {
      throw new Error(JSON.stringify(errors.NO_CANDIDATES_REGISTERED));
    }

    const allResults: Vote[] = [];
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record: Vote;
      try {
        record = JSON.parse(strValue) as Vote;
        const candidate = candidates.find(
          (candidate) => candidate.idCandidate === record.idCandidate
        );

        if (candidate) {
          // Includes the candidate name in the vote object
          record.candidateName = candidate.name;
          const candidateParty = await partyContract.GetParty(
            ctx,
            candidate.idParty
          );
          // Includes the candidate party in the vote object
          record.candidateParty = candidateParty.name;
        }

        if (record.docType === "voteHash") {
          allResults.push(record);
        }
      } catch (err) {
        console.log("Error querying votes:", err);
      }
      result = await iterator.next();
    }
    return allResults;
  }

  @Transaction()
  public async GetVotesByCandidate(
    ctx: Context,
    idCandidate: string
  ): Promise<Vote[]> {
    const allResults: Vote[] = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record: Vote;
      try {
        record = JSON.parse(strValue) as Vote;
        if (record.docType === "voteHash" && record.idCandidate === idCandidate) {
          allResults.push(record);
        }
      } catch (err) {
        console.log("Error querying votes:", err);
      }
      result = await iterator.next();
    }
    return allResults;
  }
}
