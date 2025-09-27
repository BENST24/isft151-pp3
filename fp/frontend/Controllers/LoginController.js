class LoginController
{
    constructor(_viewInstance, _modelInstance)
    {
        
        this.viewInstance = _viewInstance;
        this.modelInstance = _modelInstance;

    }

    init()
    {

    }
    
    release()
    {

    }

    run()
    {

    }
    
    stop()
    {

    }

    onLoginButtonClick()
    {
        this.api.authenticateUser(username, password);
    }

    onSuccessLogin()
    {
        
    }
}

export{LoginController}