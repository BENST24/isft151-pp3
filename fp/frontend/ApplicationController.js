class ApplicationController 
{
    constructor(view, model)
    {
        this.view= view;
        this.model = model;
    }

    init()
    {
        this.model.addEventListener('userlogged', this.onUserLogged.bind(this));
        this.model.addEventListener('loginerror', this.onLoginError.bind(this));
        this.model.addEventListener('userlogout', this.onUserLogout.bind(this));
    }

    release()
    {
        this.view = null;
        this.model = null;
    }

    onUserLogout()
    {
        this.view.changeViewToLogin();
    }

    onUserLogged(event)
    {
        window.alert(event.detail.message);

        const userData = {
            username: event.detail.username,
            type: event.detail.type,
            message: event.detail.message,
            password: event.detail.password || '',
        };
        this.view.changeViewToDashboard(userData);
    }

    onLoginError(event)
    {
        window.alert(event.detail);
    }

    onLoginRequestEvent(loginData)
    {
        this.model.login(loginData.username, loginData.password);
    }
}

export{ApplicationController}