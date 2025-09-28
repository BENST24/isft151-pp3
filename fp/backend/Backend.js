import { SupervisorManager } from './Managers/SupervisorManager.js';
import { ReceptionistManager } from './Managers/ReceptionistManager.js';

import Supervisor from './Supervisor.js';
import Receptionist from './Receptionist.js';

class APIModelAccess
{
    constructor()
    {
        this.supervisorManager = new SupervisorManager();
        this.receptionistManager = new ReceptionistManager();

        this._userData = new Map();
        this._maxLoginFailedAttempts = 3;

        this._userData.set(new Supervisor(1, 'supervisor', 123456));
        this._userData.set(new Supervisor(1, 'supervisor2', 123456));
        this._userData.set(new Receptionist(2, 'receptionist', 123456));
        this._userData.set(new Receptionist(2, 'receptionist2', 123456));
    }

    // --------------------------------------------------------------------------
    // Metodos para el Login
    // --------------------------------------------------------------------------

    authenticateUserAPI(username, password) 
	{
		let api_return = 
		{
			status: false,
			result: null,
            type: null
		};

		if (username && password) 
		{
			let user = this._userData.get(username);

			if (user) 
			{
				if (!user.isLocked) 
				{
					if (this.isPasswordCorrect(user, password))
					{
						api_return.status = true;
                        api_return.type =  user.type;
					} else 
					{
						this.incrementFailedLogin(user);
						api_return.status = false;
						api_return.result = user.isLocked ? 'BLOCKED_USER' : 'USER_PASSWORD_FAILED';
					}
				} else 
				{
					api_return.result = 'BLOCKED_USER';
				}
			} else 
			{
				api_return.result = 'USER_NOT_FOUND';
			}
		}

		return api_return;
	}

    isPasswordCorrect(user, input) 
	{
		return user.password === input;
	}

    incrementFailedLogin(user) 
	{
		user.failedLoginCounter++;
		if (user.failedLoginCounter >= this._maxLoginFailedAttempts) 
		{
			user.isLocked = true;
		}
	}

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------
    // Metodos para la gestion de usuarios
    // --------------------------------------------------------------------------

    isAuthorizedUser(currentUsername)
    {
        if(this.supervisorManager.searchSupervisor(currentUsername))
        {
            return true;
        }
        else
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

    createUserAPI(currentUsername, username, password, type)
    {

        if (this.isAuthorizedUser(currentUsername))
        {
            if (!this.supervisorManager.searchSupervisor(username) && !this.receptionistManager.searchReceptionist(username)) 
            {
                if(this.validatePass(password))
                {
                    if (type === 'SUPERVISOR')
                    {
                        this.supervisorManager.createSupervisor(username, password);
                    }
                    else
                    {
                        this.receptionistManager.createReceptionist(username, password);
                    }
                    return { status: true };
                }
                else
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
    
    deleteUserAPI(currentUsername, username)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            let user = this.supervisorManager.searchSupervisor(username) || this.receptionistManager.searchReceptionist(username);

            if (user)
            {
                if (user.type === 'SUPERVISOR')
                {
                    this.supervisorManager.deleteSupervisor(username);
                }
                else
                {
                    this.receptionistManager.deleteReceptionist(username);
                }

                return { status: true, result: 'USER_DELETED' };
            }
            else
            {
                return { status: false, result: 'USER_NOT_FOUND' };
            }
        }
    }

    modifyUserAPI(currentUsername, username, newPassword)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            let user = this.supervisorManager.searchSupervisor(username) || this.receptionistManager.searchReceptionist(username);

            if (user)
            {
                if(this.validatePass(newPassword))
                {
                    if (user.type === 'SUPERVISOR')
                    {
                        this.supervisorManager.modifySupervisor(username, newPassword);
                    }
                    else
                    {
                        this.receptionistManager.modifyReceptionist(username, newPassword);
                    }
                    return { status: true, result: 'USER_UPDATED' };
                }
                else
                {
                    return { status: false, result: 'INVALID_PASSWORD' };
                }
            }
            else
            {
                return { status: false, result: 'USER_NOT_FOUND' };
            }
        }
    }

    searchUserAPI(currentUsername ,username)
    {
        if (this.isAuthorizedUser(currentUsername))
        {   
            let user = this.supervisorManager.searchSupervisor(username) || this.receptionistManager.searchReceptionist(username);

            if (user)
            {
                return { status: true, result: user };
            }
            else
            {
                return { status: false, result: 'USER_NOT_FOUND' };
            }
        }
        else
        {
            return { status: false, result: 'USER_NOT_AUTHORIZED' };
        }
    } 

    listUserAPI(currentUsername)
    {
        if (this.isAuthorizedUser(currentUsername))
        {
            let supervisors = this.supervisorManager.listSupervisors();
            let receptionists = this.receptionistManager.listReceptionists();
            
            let allUsers = {
                supervisors: supervisors,
                receptionists: receptionists
            }

            return { status: true, result: allUsers };
        }    
    }

}

export { APIModelAccess };