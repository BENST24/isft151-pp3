class LoginController
{
    constructor(viewInstance, apiInstance)
    {
        this.viewInstance = viewInstance;
        this.apiInstance = apiInstance;

        this.onUserLogged = this.onUserLogged.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
    }

    init()
    {
        this.apiInstance.addEventListener('userlogged', this.onUserLogged);
        this.apiInstance.addEventListener('loginerror', this.onLoginError);
    }

    release()
    {
        this.apiInstance.removeEventListener('userlogged', this.onUserLogged);
        this.apiInstance.removeEventListener('loginerror', this.onLoginError);
        this.viewInstance = null;
        this.apiInstance = null;
    }

    onUserLogged(event)
    {
        this.viewInstance.onLoginSuccess(event.detail.type, event.detail.message);
    }

    onLoginError(event)
    {
        this.viewInstance.onLoginError(event.detail);
    }
}

export{LoginController}