import { authenticateUser } from "./AuthModel.js";
import { resetFailedloginCounterUser } from "../Services/UserService.js";
import { getUserByName } from "../Services/UserService.js";
import { createUserDB } from "../Services/UserService.js";
import { deleteUserDB } from "../Services/UserService.js";
import { updatePasswordUser } from "../Services/UserService.js";
import { updateTypeUser } from "../Services/UserService.js";
import { updateUser } from "../Services/UserService.js";
import { getAllUsers } from "../Services/UserService.js";


// --------------------------------------------------------------------------
// Metodos para la gestion de usuarios
// --------------------------------------------------------------------------

function isAuthorizedUser(type)
{   
    if(type === 'SUPERVISOR')
    {
        return true;
    }else
    {
        return false;
    }
}

// metodo para validar la contraseña
function validatePass(pass) 
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

export async function enableBlockedUser(currentUsername, currentUserPassword, username)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            await resetFailedloginCounterUser(username);
            api_return.status = true; 
            api_return.result = 'USER_ENABLED';
        }
        else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function createUser(currentUsername, currentUserPassword, username, password, type)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            if (! await getUserByName(username))
            {
                if(validatePass(password))
                {
                    await createUserDB(username, password, type);
                    api_return.status = true; 
                    api_return.result = 'USER_CREATED';
                } else
                {
                    api_return.result = 'INVALID_PASSWORD';
                }
            } else 
            {
                api_return.result = 'USER_ALREADY_EXISTS';
            }
        }else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function deleteUser(currentUsername, currentUserPassword, username)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            let user = await getUserByName(username);

            if (user)
            {
                await deleteUserDB(username);
                api_return.status = true;
                api_return.result = 'USER_DELETED';
            }
            else
            {
                api_return.result = 'USER_NOT_FOUND';
            }
        }else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function modifyUserPassword(currentUsername, currentUserPassword, username, newPassword)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            let user = await getUserByName(username);
    
            if (user)
            {
                if(validatePass(newPassword))
                {
                    await updatePasswordUser(username, password)
                    api_return.status = true; 
                    api_return.result = 'USER_UPDATED';
                } else
                {
                    api_return.result = 'INVALID_PASSWORD';
                }
            } else
            {
                api_return.result = 'USER_NOT_FOUND';
            }
        } else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function modifyUserType(currentUsername, currentUserPassword, username, newType)
{
    let api_return = 
    {
        status: false,
        result: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            let user = await getUserByName(username);

            if (user)
            {
                if(newType == 'SUPERVISOR' || newType == 'RECEPTIONIST')
                {                
                    if(user.type != newType)
                    {
                        await updateTypeUser(username, newType)
                        api_return.status = true; 
                        api_return.result = 'USER_UPDATED';
                    } else
                    {
                        api_return.result = 'TYPE_UNCHANGED';
                    }
                } else
                {
                    api_return.result = 'INVALID_TYPE';
                }
            }else
            {
                api_return.result = 'USER_NOT_FOUND';
            }
        }else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }

    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function modifyUser(currentUsername, currentUserPassword, username, newPassword, newType)
{
    let api_return = 
    {
        status: false,
        result: null,
        resultPassword: null,
        resultType: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            let user = await getUserByName(username);

            if (user)
            {
                if(newType == 'SUPERVISOR' || newType == 'RECEPTIONIST')
                {                
                    if(user.type != newType)
                    {
                        if(validatePass(newPassword))
                        {
                            await updateUser(username, newPassword, newType)
                            api_return.status = true; 
                            api_return.result = 'USER_UPDATED';
                            api_return.resultPassword = 'PASSWORD_UPDATE';
                            api_return.resultType = 'TYPE_UPDATE';
                        } else
                        {
                            await updateTypeUser(username, newType)
                            api_return.result = 'USER_UPDATED';
                            api_return.resultType = 'TYPE_UPDATE';
                            api_return.resultPassword = 'INVALID_PASSWORD';
                        }
                    } else
                    {
                        if(validatePass(newPassword))
                        {
                            await updatePasswordUser(username, newPassword)
                            api_return.status = true;
                            api_return.result = 'USER_UPDATED';
                            api_return.resultPassword = 'PASSWORD_UPDATE';
                            api_return.resultType = 'TYPE_UNCHANGED';
                        } else
                        {
                            api_return.result = 'USER_NOT_UPDATED';
                            api_return.resultPassword = 'INVALID_PASSWORD';
                            api_return.resultType = 'TYPE_UNCHANGED';
                        }
                    }
                } else
                {
                    api_return.result = 'USER_NOT_UPDATED';
                    api_return.resultType = 'INVALID_TYPE';
                }
            }else
            {
                api_return.result = 'USER_NOT_FOUND';
            }
        }else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }

    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}

export async function searchUser(currentUsername, currentUserPassword, username)
{
    let api_return = 
    {
        status: false,
        result: null,
        response: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {   
            let user = await getUserByName(username)

            if (user)
            {
                api_return.status = true;
                api_return.response = user;
                api_return.result = 'REQUEST_SUCCESSFUL'
            } else
            {
                api_return.result = 'USER_NOT_FOUND';
            }
        } else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
} 

export async function listUser(currentUsername, currentUserPassword)
{
    let api_return = 
    {
        status: false,
        result: null,
        response: null,
    };

    let respond = await authenticateUser(currentUsername, currentUserPassword);

    if(respond.status)
    {
        if (isAuthorizedUser(respond.type))
        {
            let allUsers = await getAllUsers();
            api_return.response = allUsers;
            api_return.result = 'REQUEST_SUCCESSFUL'
        } else
        {
            api_return.result = 'USER_NOT_AUTHORIZED';
        }
    }else
    {
        api_return.result = respond.result;
    }

    return api_return;
}