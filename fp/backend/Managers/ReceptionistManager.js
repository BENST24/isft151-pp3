import { Receptionist } from "../Models/Receptionist";

class ReceptionistManager
{
    constructor()
    {
        this.receptionists = [];
        this.nextId = this.calculateNextId();
    }

    calculateNextId()
    {
        if (this.receptionists.length === 0) 
        {
            return 1;
        }

        let maxId = this.receptionists[0].id;

        for (let i = 1; i < this.receptionists.length; i++)
        {
            if (this.receptionists[i].id > maxId)
            {
                maxId = this.receptionists[i].id;
            }
        }

        return maxId + 1;
    }

    createReceptionist(username, password)
    {
        const newReceptionist = new Receptionist(this.nextId, username, password);
        this.receptionists.push(newReceptionist);
        this.nextId++;
        return newReceptionist;
    }

    deleteReceptionist(username)
    {
        for (let i = 0; i < this.receptionists.length; i++)
        {
            if (this.receptionists[i].username === username)
            {
                this.receptionists.splice(i, 1);
            }
        }
    }  

    modifyReceptionist(username, password)
    {
        for (let i = 0; i < this.receptionists.length; i++)
        {
            if (this.receptionists[i].username === username)
            {
                this.receptionists[i].password = password;
            }
        }
    }

    searchReceptionist(username)
    {
        for (let i = 0; i < this.receptionists.length; i++)
        {
            if (this.receptionists[i].username === username)
            {
                return this.receptionists[i];
            }
        }

        return null;
    }
    
    listReceptionists()
    {
        return this.receptionists;
    }
}

export { ReceptionistManager };