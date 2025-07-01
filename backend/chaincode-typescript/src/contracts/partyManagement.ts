import {
  Context,
  Contract,
  Info,
  Returns,
  Transaction,
} from "fabric-contract-api";
import { Party } from "../entities/party";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";

@Info({
  title: "PartyManagement",
  description: "Smart contract for registering parties",
})
export class PartyManagementContract extends Contract {
  @Transaction()
  public async InitPartiesLedger(ctx: Context): Promise<void> { // Inicializa o ledger com 3 partidos fixos
    const parties: Party[] = [
      {
        idParty: "party1",
        code: 10,
        name: "Party A",
        docType: "party",
      },
      {
        idParty: "party2",
        code: 20,
        name: "Party B",
        docType: "party",
      },
      {
        idParty: "party3",
        code: 30,
        name: "Party C",
        docType: "party",
      },
    ];

    for (const party of parties) {
      await ctx.stub.putState(
        party.idParty,
        Buffer.from(stringify(sortKeysRecursive(party)))
      );
      console.info(`Party ${party.idParty} registered.`);
    }
  }

  // Verifica se um partido existe com o idParty
  @Transaction()
  @Returns("boolean")
  public async PartyExists(ctx: Context, idParty: string): Promise<boolean> {
    const partyJSON = await ctx.stub.getState(idParty);
    return partyJSON.length > 0;
  }

  // Recupera um partido especifico
  @Transaction()
  public async GetParty(ctx: Context, idParty: string): Promise<Party> {
    const partyJSON = await ctx.stub.getState(idParty);

    if (partyJSON.length === 0) {
      throw new Error(
        JSON.stringify({
          code: "PARTY_DOESNT_EXISTS",
          message: `The party with ID ${idParty} doesn't exists.`,
        })
      );
    }

    const party = JSON.parse(partyJSON.toString()) as Party;

    if (party.docType !== "party") {
      throw new Error(
        JSON.stringify({
          code: "ASSET_TYPE_MISMATCH",
          message: `The asset with ID ${idParty} is not a Party.`,
        })
      );
    }
    return party;
  }

  // Busca todos os partidos no ledger
  @Transaction()
  public async GetAllParties(ctx: Context): Promise<Party[]> {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue) as Party;
        if (record.docType == "party") {
          allResults.push(record);
        }
      } catch (err) {
        console.log(err);
      }
      result = await iterator.next();
    }
    return allResults;
  }
}
