class ApplicationController 
{
    constructor(view, model)
    {
        this.view= view;
        this.model = model;

        this.onUserLogged = this.onUserLogged.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
        this.onUserLogout = this.onUserLogout.bind(this);
        this.onLoginRequestEvent = this.onLoginRequestEvent.bind(this);
    }

    init()
    {
        this.model.addEventListener('userlogged', this.onUserLogged);
        this.model.addEventListener('loginerror', this.onLoginError);
        this.model.addEventListener('userlogout', this.onUserLogout);
    }

    release()
    {
        this.model.removeEventListener('userlogged', this.onUserLogged);
        this.model.removeEventListener('loginerror', this.onLoginError);
        this.model.removeEventListener('userlogout', this.onUserLogout);
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

    onLoginRequestEvent(event)
    {
        this.model.login(event.detail.username, event.detail.password);
    }
}

export{ApplicationController}