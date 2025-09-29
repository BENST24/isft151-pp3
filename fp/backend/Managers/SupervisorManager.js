import { Supervisor } from '../Models/Supervisor.js';

class SupervisorManager 
{
    constructor()
    {
        this.supervisors = [];
        this.nextId = this.calculateNextId();
    }

    calculateNextId()
    {
        if (this.supervisors.length === 0) 
        {
            return 1;
        }

        let maxId = this.supervisors[0].id;

        for (let i = 1; i < this.supervisors.length; i++)
        {
            if (this.supervisors[i].id > maxId)
            {
                maxId = this.supervisors[i].id;
            }
        }

        return maxId + 1;
    }

    createSupervisor(username, password)
    {
        const newSupervisor = new Supervisor(this.nextId, username, password);
        this.supervisors.push(newSupervisor);
        this.nextId++;
        return newSupervisor;
    }

    deleteSupervisor(username)
    {
        for (let i = 0; i < this.supervisors.length; i++)
        {
            if (this.supervisors[i].username === username)
            {
                this.supervisors.splice(i, 1);
            }
        }
    }

    modifySupervisor(username, password)
    {
        for (let i = 0; i < this.supervisors.length; i++)
        {
            if (this.supervisors[i].username === username)
            {
                this.supervisors[i].password = password;
            }
        }
    } 

    searchSupervisor(username)
    {
        for (let i = 0; i < this.supervisors.length; i++)
        {
            if (this.supervisors[i].username === username)
            {
                return this.supervisors[i];
            }
        }

        return null;
    }

    listSupervisors()
    {
        return this.supervisors;
    }

    incrementFailedLoginCounter(username)
    {
        const supervisor = this.searchSupervisor(username);
        if (supervisor)
        {
            supervisor.failedLoginCounter++;
            if (supervisor.failedLoginCounter >= 3)
            {
                supervisor.isLocked = true;
            }
        }
    }

    resetFailedloginCounter(username)
    {
        const supervisor = this.searchSupervisor(username);
        if (supervisor)
        {
            supervisor.failedLoginCounter = 0;
            supervisor.isLocked = false;
        }
    }
}

export { SupervisorManager };