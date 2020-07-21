import { User } from './user';

class Users {

    users: User[] = [];

    getUser(id: string) {
        return this.users.find( user => user.id === id );
    }

    getUserByName(name: string) {
        const user = this.users.find( user => user.name === name );
        return user ? user : null;
    }

    getUsers(): User[] {
        return this.users.filter( user => user.name !== 'sin-nombre' );
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    updateName(id: string, name: string): void {
        for( let user of this.users ) {

            if ( user.id === id ) {
                user.name = name;
                break;
            }
        }
    }

    updateColor(id: string, color: string) {
        for( let user of this.users ) {
            if ( user.id === id ) {
                user.color = color;
                break;
            }
        }
    }

    toggleStatus(id: string) {
        for( let user of this.users ) {
            if ( user.id === id ) {
                user.status = !user.status;
                break;
            }
        }
    }

    deleteUser(id: string) {
        const tmpuser = this.getUser(id);
        this.users = this.users.filter( user => user.id !== id )
        return tmpuser;
    }



}

const usersOnline = new Users();
const bannedUsers = new Users();


export {
    Users,
    usersOnline,
    bannedUsers
}