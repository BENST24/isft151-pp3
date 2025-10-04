import { DashboardWC } from "../Components/DashboardWC.js";
class LoginController
{
    constructor(_viewInstance)
    {
        this.viewInstance = _viewInstance;
        this.translation = new Map();
        this.init();
    }

    init()
    {
        this.translation.set('USER_AUTHENTICATED','Usuario autenticado correctamente');
        this.translation.set('BLOCKED_USER','Usuario bloqueado');
        this.translation.set('USER_PASSWORD_FAILED','Contraseña incorrecta');
        this.translation.set('USER_NOT_FOUND','Usuario no encontrado');
        this.translation.set('null','Error desconocido');
    }
    
    release()
    {
        this.viewInstance = null;
    }

    run()
    {

    }
    
    stop()
    {

    }

    async onLoginButtonClick()
    {
        let username = this.viewInstance.userInput.value;
        let password = this.viewInstance.passwordInput.value;
        
        try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        this.onAuthenticationRequestResponse(result);
        
        } catch (error) {
            console.error("Error en la solicitud:", error);
            this.onAuthenticationRequestResponse({
                status: false,
                result: "SERVER_ERROR"
            });
        }
        // let result=this.modelInstance.authenticateUserAPI(username, password);
        // this.onAuthenticationRequestResponse(result);  
    }

    onAuthenticationRequestResponse(apiResponse)
    {
        if(apiResponse.status){
            let successKey = apiResponse.result;
            let successMessage = this.translation.get(successKey) || this.translation.get('null');
            this.viewInstance.onLoginSuccess(apiResponse.type, successMessage);
        }else{
            let errorKey = apiResponse.result;
            let errorMessage = this.translation.get(errorKey) || this.translation.get('null');
            this.viewInstance.onLoginError(errorMessage);
        }
    }
}



export{LoginController}