
export class DataGram {
    constructor(
        public userlogin: string,
        public create_at: string,
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


