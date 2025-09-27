class Receptionist
{
    constructor(id, username, password)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.type = 'RECEPTIONIST';
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

export { Receptionist };