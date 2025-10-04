import { Supervisor } from './Supervisor.js';
import { Receptionist } from './Receptionist.js';

class UserManager 
{
    constructor()
    {
        this.users = [];
        this.nextId = this.calculateNextId();

        this.users.push(new Supervisor(this.nextId, 'admin', 'Admin123'));
    }

    calculateNextId()
    {
        if (this.users.length === 0) 
        {
            return 1;
        }

        let maxId = this.users[0].id;

        for (let i = 1; i < this.users.length; i++)
        {
            if (this.users[i].id > maxId)
            {
                maxId = this.users[i].id;
            }
        }

        return maxId + 1;
    }

    createUser(username, password, type)
    {
        if(type === 'SUPERVISOR')
        {
            const newUser = new Supervisor(this.nextId, username, password);
            this.users.push(newUser);
            this.nextId++;
        }else
        {
            const newUser = new Receptionist(this.nextId, username, password);
            this.users.push(newUser);
            this.nextId++;
        }
    }

    deleteUser(username)
    {
        for (let i = 0; i < this.users.length; i++)
        {
            if (this.users[i].username === username)
            {
                this.users.splice(i, 1);
            }
        }
    }

    modifyUser(username, password)
    {
        for (let i = 0; i < this.users.length; i++)
        {
            if (this.users[i].username === username)
            {
                this.users[i].password = password;
            }
        }
    } 

    searchUser(username)
    {
        for (let i = 0; i < this.users.length; i++)
        {
            if (this.users[i].username === username)
            {
                return this.users[i];
            }
        }

        return null;
    }

    listUsers()
    {
        return this.users;
    }

    incrementFailedLoginCounter(username)
    {
        const user = this.searchUser(username);
        if (user)
        {
            user.failedLoginCounter++;
            if (user.failedLoginCounter >= 3)
            {
                user.isLocked = true;
            }
        }
    }

    resetFailedloginCounter(username)
    {
        const user = this.searchUser(username);
        if (user)
        {
            user.failedLoginCounter = 0;
            user.isLocked = false;
        }
    }
}

export { UserManager };