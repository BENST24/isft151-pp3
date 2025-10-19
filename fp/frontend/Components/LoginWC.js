import { LoginController } from "../Controllers/LoginController.js";

class LoginWC extends HTMLElement
{
    constructor(apiInstance)
    {
        super();
        this.apiInstance = apiInstance;
        this.controller = new LoginController(this, this.apiInstance);
        const shadow = this.attachShadow({mode : 'open'});
        const style = document.createElement('style');
        style.textContent = `
            :host
            {
                background: linear-gradient(rgba( 77, 85, 145, 1), rgba(47, 53, 100, 1), rgba(22, 25, 49, 1));
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                min-height: 100vh;
                display: block;
                margin: 0;
                padding: 0;
                width: 100%;
            }
            
            .title-container
            {
                display: flex;
                flex-direction: row;
                justify-content: center;
                padding: 20px;
            }

            .main-title
            {
                margin: 0;
                color: white;
                font-size: 60px;
                display: block;
                justify-content: center;
                align-content: center;
            }

            .form-container
            {
                display: flex;
                flex-direction: row;
                align-text: center;
                justify-content: center;
                padding: 20px;
            }

            .login-container
            {
                margin-top: 100px;
                padding: 20px;
                background: linear-gradient(rgba(98, 98, 255, 1), rgba(74, 74, 206, 1), rgba(53, 53, 148, 1));
                border-radius: 20px;
                display: block;
                flex-direction: column;
                justify-content: center;
                align-text: center;
            }

            .user-container
            {
                font-size: 30px;
                font-weight: 700;
                color: white;
                margin: 10px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-text: center;
            }

            .password-container
            {
                font-size: 30px;
                font-weight: 700;
                color: white;
                margin: 10px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-text: center;
            }

            .button-container
            {
                margin: 10px;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-text: center;
            }

            .login-button
            {
                font-size: 20px;
                font-weight: 700;
                margin: 10px;
                padding: 20px;
                width: 400px;
                color: white;
                background: rgba(77, 130, 165, 1);
                border-radius: 20px;
                border-color: rgba(98, 98, 255, 1);
            }

            .login-button:hover
            {
                background: rgba(5, 5, 5, 1);
            }

            input
            {
                height: 20px;
                width: 400px;
                padding: 8px;
                border-radius: 20px;
                border-color: rgba(0, 0, 0, 1);
                text-indent: 10px;
            }
            
        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        
        this.titleContainer = document.createElement('div');
        this.titleContainer.className = 'title-container';

        this.titleMain = document.createElement('h1');
        this.titleMain.textContent = 'Gestor de Turnos';
        this.titleMain.className = 'main-title';
        

        this.formContainer = document.createElement('div');
        this.formContainer.className = 'form-container';
        
        /*Contenedor login*/ 
        this.logContainer = document.createElement('div');
        this.logContainer.className = 'login-container';

        /*Casilla Usuario*/ 
        this.userContainer = document.createElement('div');
        this.userContainer.className = 'user-container';
        this.userTitle = document.createElement('label');
        this.userTitle.textContent = 'Usuario: ';
        this.userTitle.className ='user-title';
        this.userInput = document.createElement('input');
        this.userInput.placeholder = 'Ingrese su nombre de usuario';
        this.userInput.className = 'user-input';
        this.userInput.name = 'username';
        this.userInput.type = 'text';
        this.userInput.id = 'userId';
        this.userInput.required = true;
        this.userInput.minLength = 3;

        this.passwordContainer = document.createElement('div');
        this.passwordContainer.className = 'password-container';
        this.passwordTitle = document.createElement('label');
        this.passwordTitle.textContent = 'Contraseña: ';
        this.passwordTitle.className ='password-title';
        this.passwordInput = document.createElement('input');
        this.passwordInput.placeholder = 'Ingrese su contraseña';
        this.passwordInput.type = 'password';
        this.passwordInput.className = 'password-input';
        this.passwordInput.name = 'password';
        this.passwordInput.id = 'passwordId';
        this.passwordInput.required = true;
        this.passwordInput.minLength = 8;

        this.loginButtonContainer = document.createElement('a');
        this.loginButtonContainer.className = 'button-container';
        this.loginButtonContent = document.createElement('button');
        this.loginButtonContent.className = 'login-button';
        this.loginButtonContent.textContent = 'Iniciar Sesion';
        this.loginButtonContent.id = 'loginButtonId';

        this.loginButtonContainer.appendChild(this.loginButtonContent);
        this.passwordContainer.appendChild(this.passwordTitle);
        this.passwordContainer.appendChild(this.passwordInput);
        this.userContainer.appendChild(this.userTitle);
        this.userContainer.appendChild(this.userInput);
        
        this.titleContainer.appendChild(this.titleMain);

        this.logContainer.appendChild(this.userContainer);
        this.logContainer.appendChild(this.passwordContainer);
        this.logContainer.appendChild(this.loginButtonContainer);
        this.formContainer.appendChild(this.logContainer);
        
        shadow.appendChild(this.titleContainer);
        shadow.appendChild(this.formContainer);
        shadow.appendChild(style);
    }

    onLoginSuccess(userType, successMessage)
    {
        window.alert(successMessage);
        
        this.userInput.value ='';
        this.passwordInput.value ='';
    }

    onLoginError(errorMessage)
    {
        window.alert(errorMessage);
    }

    onLoginButtonClick()
    {
        let username = this.userInput.value;
        let password = this.passwordInput.value;
        if(!username || !password){
            this.onLoginError('Por favor complete todos los campos');
            return;
        }

        this.dispatchEvent(new CustomEvent('loginRequest',{
            detail: {username, password}
        }));
    }

    connectedCallback()
    {
        this.loginButtonContent.onclick = this.onLoginButtonClick.bind(this);
        this.controller.init();
    }

    disconnectedCallback()
    {
        if(this.controller && this.controller.release){
            this.controller.release();
        }
        
        this.loginButtonContent = null;
    }
}

customElements.define('x-login', LoginWC);

export{LoginWC}