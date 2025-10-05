import { UserService } from "../Services/UserService.js";

class AuthModel
{
    constructor()
    {
		this.userService = new UserService();
        // this._maxLoginFailedAttempts = 3;
    }

    // --------------------------------------------------------------------------
    // Metodos para el Login
    // --------------------------------------------------------------------------

    async authenticateUser(username, password) 
	{
		let api_return = 
		{
			status: false,
			result: null,
            type: null
		};

		if (username && password) 
		{
			let user = await this.userService.getUserByName(username);

			if (user) 
			{
				if (!user.isLocked) 
				{
					if (this.#isPasswordCorrect(user, password))
					{
                        // this.#resetFailedloginCounter(user);
						api_return.status = true;
                        api_return.result = 'USER_AUTHENTICATED';
                        api_return.type =  user.type;
					} else 
					{
						// this.#incrementFailedLogin(user);
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

        this.userService.incrementFailedLoginCounterUser(user.username, user.failedLoginCounter++);
	}

    #resetFailedloginCounter(user)
    {
        this.userService.resetFailedloginCounterUser(user.username);
    }
}

export { AuthModel }