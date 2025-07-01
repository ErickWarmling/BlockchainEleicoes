import { Object, Property } from 'fabric-contract-api';

@Object()
export class Party {
    @Property()
    public docType?: string;

    @Property()
    public idParty: string = '';

    public code: number = 0;

    @Property()
    public name: string = '';
}
