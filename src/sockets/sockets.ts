import SocketIO, { Socket } from 'socket.io';
import { Client } from 'pg';

// Local import
import { DataGram } from '../clases/message';
import { usersOnline, bannedUsers } from '../clases/users';
import { User } from '../clases/user';

// TODO
/* 
    * limpiar groserias del chat con expreciones regulares.
*/

const groserias = [
    { key: 'hijo de puta', value: '**** ** ****'},
    { key: 'hijo de perra', value: '**** ** ****' },
    { key: 'puta', value: '****' },
    { key: 'perra', value: '*****' },
    { key: 'puto', value: '****' },
    { key: 'mal parido', value: '*** ******' },
    { key: 'malparido', value: '*********' },
    { key: 'mal nacido', value: '*** ******' },
]

const saveMessageToDB = (payload: DataGram, db: Client) => {
    const query = `INSERT INTO Messages (userlogin, payload) VALUES ('${payload.userlogin}', '${JSON.stringify(payload.payload)}')`;
    db.query(query, (error) => {
        if(error) {throw error}
    });
}

const cleanMessages = ({userlogin, create_at, payload: {color, message, gif}} : DataGram): DataGram => {
    let filterMessage = message 
    for (const { key, value } of groserias) {
        filterMessage = filterMessage.replace(key , value)
    }
    
    return {userlogin, create_at, payload: {color, gif, message: filterMessage} }
}

export const message = (client: Socket, io: SocketIO.Server, db: Client) => {
    client.on('messages', (payload: DataGram) => {
        const filterPayload = cleanMessages(payload);
        saveMessageToDB(filterPayload, db);
        io.emit('messages', filterPayload)
    });
}

export const connectUser = (client: Socket,  io: SocketIO.Server) => {
    const user = new User(client.id);
    usersOnline.addUser(user);
    
}

export const disconnectUser = ( client: Socket, io: SocketIO.Server ) => {
    client.on('disconnect', () => {
        usersOnline.deleteUser( client.id );
        io.emit('active-users', usersOnline.getUsers());
    });
}

export const configUser = (client: Socket,  io: SocketIO.Server) => {
    client.on('config-user', (payload: { login: string, color?: string } ) => { 

        // Function to verify if user is baned
        const verifyBanned = (user: User): void => {
            if(user.name == payload.login) {
                client.disconnect();
                usersOnline.deleteUser(client.id);
            }
        }
        // Verify if user is banned
        bannedUsers.users.forEach(verifyBanned);

        // If user don't have color
        const setColor = (): string => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const endColor = (payload.color) ? payload.color : setColor();

        usersOnline.updateName(client.id, payload.login);
        usersOnline.updateColor(client.id, endColor);
        
        io.emit('active-users', usersOnline.getUsers());
    });
}

export const getUsers = (client: Socket,  io: SocketIO.Server) => {
    client.on('get-users', () => {
        io.to( client.id ).emit('active-users', usersOnline.getUsers());
    });
} 
