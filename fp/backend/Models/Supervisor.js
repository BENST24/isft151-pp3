import { ReceptionistManager } from "../Managers/ReceptionistManager";

class Supervisor
{
    constructor(id, username, password)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.type = 'SUPERVISOR';
        this.isLocked = false;
    }

    getId()
    {
        return this.id;
    }   

    getUsername()
    {
        return this.username;
    }
    
    getPassword()
    {
        return this.password;
    }

    setId(id)
    {
        this.id = id;
    }   

    setUsername(username)
    {
        this.username = username;
    }   

    setPassword(password)
    {
        this.password = password;
    }

    // loadEmployee()
    // {}
    
    // modifyEmployee()
    // {}

    // deleteEmployee()
    // {}

    // listEmploye()
    // {}

    // searchEmployee()
    // {}

    loadAppointment()
    {}

    modifyAppointment()
    {}

    deleteAppointment()
    {}

    listAppointment()
    {}

    searchAppointment()
    {}
}

export  { Supervisor };