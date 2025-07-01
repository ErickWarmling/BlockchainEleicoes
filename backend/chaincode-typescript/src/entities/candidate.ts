import { Object, Property } from 'fabric-contract-api';

@Object()
export class Candidate {
    @Property()
    public docType?: string;

    @Property()
    public idCandidate: string = '';

    @Property()
    public name: string = '';

    @Property()
    public idParty: string = '';

    @Property()
    public votingCode: number = 0;
}
