

export class User {
    id: string;
    name: string;
    status: boolean;
    color?: string

    constructor(id: string) {
        this.id = id;
        this.name = 'sin-nombre';
        this.status = true;
    }

}

