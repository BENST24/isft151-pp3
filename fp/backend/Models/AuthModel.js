import { UserManager } from "./UserManager.js";

class AuthModel
{
    constructor()
    {
        this.userManager = new UserManager();
        this._maxLoginFailedAttempts = 3;
    }

    // --------------------------------------------------------------------------
    // Metodos para el Login
    // --------------------------------------------------------------------------

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
			let user = this.userManager.searchUser(username);

			if (user) 
			{
				if (!user.isLocked) 
				{
					if (this.#isPasswordCorrect(user, password))
					{
                        this.#resetFailedloginCounter(user);
						api_return.status = true;
                        api_return.result = 'USER_AUTHENTICATED';
                        api_return.type =  user.type;
					} else 
					{
						this.#incrementFailedLogin(user);
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

    // --------------------------------------------------------------------------
    // Metodos privados consumidos por authenticateUser
    // --------------------------------------------------------------------------

    #isPasswordCorrect(user, input) 
	{
		return user.password === input;
	}

    #incrementFailedLogin(user) 
	{
        this.userManager.incrementFailedLoginCounter(user.username)
	}

    #resetFailedloginCounter(user)
    {
        this.userManager.resetFailedloginCounter(user.username)
    }
}

export { AuthModel }