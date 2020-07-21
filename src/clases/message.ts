
export class DataGram {
    constructor(
        public from: string,
        public date: string,
        public payload: DataGramPayload
    ) {

    }
}

export class DataGramPayload {
    constructor(
        public color: string,
        public message?: any,
        public gif?: string,
    ) {}
}


