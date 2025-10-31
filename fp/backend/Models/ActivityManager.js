import { authenticateUser } from "./AuthModel.js";
import { getActivityByName, getActivityById, createActivityDB, updateActivity, deleteActivityDB, getAllActivities } from "../Services/ActivityService.js"

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

export async function createActivity(currentUsername, currentUserPassword, name, duration)
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
            if (!await getActivityByName(name))
            {
                await createActivityDB(name, duration);
                api_return.status = true; 
                api_return.result = 'ACTIVITY_CREATED';
            } else 
            {
                api_return.result = 'ACTIVITY_ALREADY_EXISTS';
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

export async function deleteActivity(currentUsername, currentUserPassword, id)
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
            let activity = await getActivityById(id);

            if(activity)
            {
                await deleteActivityDB(activity.id);
                api_return.status = true;
                api_return.result = 'ACTIVITY_DELETED';
            }
            else
            {
                api_return.result = 'ACTIVITY_NOT_FOUND';
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

export async function modifyActivity(currentUsername, currentUserPassword, id, newName, newDuration)
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
            let activity = await getActivityById(id);
            
            if (activity)
            {
                if(activity.name !== newName)
                {
                    let activityName = await getActivityByName(newName);
                    if(!activityName)
                    {                    
                        await updateActivity(activity.id, newName, newDuration);
                        api_return.status = true;
                        api_return.result = 'ACTIVITY_UPDATED';
                    }else
                    {
                        api_return.result = 'ACTIVITY_NAME_NOT_AVAILABLE'
                    }
                }else
                {
                    await updateActivity(activity.id, newName, newDuration);
                    api_return.status = true;
                    api_return.result = 'ACTIVITY_UPDATED';
                }
            }else
            {
                api_return.result = 'ACTIVITY_NOT_FOUND';
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

export async function searchActivity(currentUsername, currentUserPassword, id)
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
            let activity = await getActivityById(id)

            if (activity)
            {
                api_return.status = true;
                api_return.response = activity;
                api_return.result = 'REQUEST_SUCCESSFUL'
            } else
            {
                api_return.result = 'ACTIVITY_NOT_FOUND';
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

export async function listActivity(currentUsername, currentUserPassword)
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
            let allActivities = await getAllActivities();
            api_return.response = allActivities;
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