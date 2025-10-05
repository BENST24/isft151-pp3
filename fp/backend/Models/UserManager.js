class UserManager
{
    constructor()
    {
        
    }

    // --------------------------------------------------------------------------
    // Metodos para la gestion de usuarios
    // --------------------------------------------------------------------------

    isAuthorizedUser(currentUsername)
    {
        let user = this.userManager.searchUser(currentUsername);
        
        if(user.type === 'SUPERVISOR')
        {
            return true;
        }else
        {
            return false;
        }
    }

    // metodo para validar la contraseña
    validatePass(pass) 
    {
        let specialCounter = 0;
        let hasUpper = false;
        let hasDigit = false;

        if (pass.length < 8 || pass.length > 16) 
        {
            return false;
        }

        for (let i = 0; i < pass.length; i++) 
        {
            const c = pass[i];

            if (c >= 'A' && c <= 'Z') hasUpper = true;
            if (c >= '0' && c <= '9') hasDigit = true;
            if (!/[a-zA-Z0-9]/.test(c)) specialCounter++;
        }

        return hasUpper && hasDigit && specialCounter >= 2;
    }

    enableBlockedUserAPI(currentUsername, username)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            this.userManager.resetFailedloginCounter(username);
            return { status: true, result: 'USER_ENABLED' };
        }
        else
        {
            return { status: false, result: 'USER_NOT_AUTHORIZED' };
        }
        
    }

    createUser(currentUsername, username, password, type)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            if (!this.userManager.searchUser(username))
            {
                if(this.validatePass(password))
                {
                    this.userManager.createUser(username, password, type);
                    return { status: true, result: 'USER_CREATED' };
                } else
                {
                    return { status: false, result: 'INVALID_PASSWORD' };
                }
            } else 
            {
                return { status: false, result: 'USER_ALREADY_EXISTS' };
            }
        }
        else
        {
            return { status: false, result: 'USER_NOT_AUTHORIZED' };
        }
    }
    
    deleteUser(currentUsername, username)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            let user = this.userManager.searchUser(username);

            if (user)
            {
                this.userManager.deleteUser(username);
                return { status: true, result: 'USER_DELETED' };
            }
            else
            {
                return { status: false, result: 'USER_NOT_FOUND' };
            }
        }
    }

    modifyUser(currentUsername, username, newPassword)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            let user = this.userManager.searchUser(username);

            if (user)
            {
                if(this.validatePass(newPassword))
                {
                    this.userManager.modifyUser(username, password)
                    return { status: true, result: 'USER_UPDATED' };
                } else
                {
                    return { status: false, result: 'INVALID_PASSWORD' };
                }
            } else
            {
                return { status: false, result: 'USER_NOT_FOUND' };
            }
        }
    }

    searchUser(currentUsername ,username)
    {
        if (this.isAuthorizedUser(currentUsername))
        {   
            let user = this.userManager.searchUser(username)

            if (user)
            {
                return { status: true, result: user };
            } else
            {
                return { status: false, result: 'USER_NOT_FOUND' };
            }
        } else
        {
            return { status: false, result: 'USER_NOT_AUTHORIZED' };
        }
    } 

    listUserAPI(currentUsername)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            let allUsers = this.userManager.listUsers();
            return { status: true, result: allUsers };
        } else
        {
            return { status: false, result: 'USER_NOT_AUTHORIZED' };
        }
    }
}

export { AuthenticatedUserManager }