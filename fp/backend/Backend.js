import Supervisor from './Supervisor.js';
import Receptionist from './Receptionist.js';

class APIModelAccess
{
    constructor()
    {
        this._userData = new Map();
        this._maxLoginFailedAttempts = 3;

        this._userData.set(new Supervisor(1, 'supervisor', 123456));
        this._userData.set(new Supervisor(1, 'supervisor2', 123456));
        this._userData.set(new Receptionist(2, 'receptionist', 123456));
        this._userData.set(new Receptionist(2, 'receptionist2', 123456));
    }

    authenticateUser(username, password) 
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

}
export { APIModelAccess };