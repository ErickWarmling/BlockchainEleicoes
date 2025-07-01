import { Object, Property } from "fabric-contract-api";

@Object()
export class Vote {
  @Property()
  public docType?: string;

  @Property()
  public idVote: string = "";

  @Property()
  public createdAt: string = "";

  @Property()
  public idCandidate: string = "";

  @Property()
  public candidateName?: string = "";

  @Property()
  public candidateParty?: string = "";
}
