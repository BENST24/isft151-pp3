import { getUserByName } from "../Services/UserService.js";
import { incrementFailedLoginCounterUser } from "../Services/UserService.js";
import { resetFailedloginCounterUser } from "../Services/UserService.js";


// --------------------------------------------------------------------------
// Metodos para el Login
// --------------------------------------------------------------------------

export async function authenticateUser(username, password) 
{
	let api_return = 
	{
		status: false,
		result: null,
		type: null
	};

	if (username && password) 
	{
		let user = await getUserByName(username);

		if (user) 
		{
			if (!user.isLocked) 
			{
				if (isPasswordCorrect(user, password))
				{
					resetFailedloginCounter(user);
					api_return.status = true;
					api_return.result = 'USER_AUTHENTICATED';
					api_return.type =  user.type;
				} else 
				{
					incrementFailedLogin(user);
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

function isPasswordCorrect(user, input) 
{
	return user.password === input;
}

function incrementFailedLogin(user) 
{
	let newCounter = user.failedLoginCounter++;

	incrementFailedLoginCounterUser(user.name, newCounter);
}

function resetFailedloginCounter(user)
{
	resetFailedloginCounterUser(user.name);
}