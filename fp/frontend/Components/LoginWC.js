import { LoginController } from "../Controllers/LoginController.js";
import { APIModelAccess } from "../../backend/Backend.js";
import { DashboardWC } from "./DashboardWC.js";
class LoginWC extends HTMLElement
{
    constructor(apiInstance)
    {
        super();
        
        this.controller = new LoginController(this,apiInstance);
        const shadow = this.attachShadow({mode : 'open'});

        const style = document.createElement('style');
        style.textContent = `
            .body-content
            {
                min-lenght: 100vh;
                margin: 0;
                background-color: rgba(104, 93, 82, 1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;

            }

            .main-title
            {
                min-lenght: 100vh;
                margin: 0;
                background-color: rgba(91, 107, 76, 1);
                display: block;
                justify-content: center;
                align-content: center;
            }

            .login-container
            {
                min-lenght: 100vh;
                margin: 0;
                background-color: rgba(171, 177, 226, 1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
            }

            .user-container
            {
            
            }
        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.bodyContainer = document.createElement('body');
        this.bodyContainer.className ='body-content';
        
        this.titleMain = document.createElement('h2');
        this.titleMain.textContent = 'Gestor de Turnos';
        this.titleMain.className = 'main-title';
        

        /*Contenedor login*/ 
        this.container = document.createElement('div');
        this.container.className = 'login-container';

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
        this.userInput.id = 'userId';
        this.userInput.required = 'true';
        this.userInput.minLength = '3';



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
        this.passwordInput.required = 'true';
        this.passwordInput.minLength = '8';


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

        this.container.appendChild(this.userContainer);
        this.container.appendChild(this.passwordContainer);
        this.container.appendChild(this.loginButtonContainer);

        this.bodyContainer.appendChild(this.container);

        shadow.appendChild(style);
        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.container);
        shadow.appendChild(this.bodyContainer);
        
    }

    onLoginSuccess(userType)
    {
        let username = this.userInput.value;
        if(this.parentNode)
        {
            this.parentNode.removeChild(this);
        }
        
        let dashboardInstance = new DashboardWC();

        document.body.appendChild(dashboardInstance);

    }

    onLoginError()
    {
        window.alert('Login incorrecto');
    }

    connectedCallback()
    {
        this.loginButtonContent.onclick = this.controller.onLoginButtonClick.bind(this.controller);
    }

    disconnectedCallback()
    {
        this.loginButtonContent = null;
        this.controller.release();
    }
}

customElements.define('x-login', LoginWC);

export{LoginWC}