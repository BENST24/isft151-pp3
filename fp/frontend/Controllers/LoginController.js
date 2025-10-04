import { DashboardWC } from "../Components/DashboardWC.js";
class LoginController
{
    constructor(_viewInstance)
    {
        this.viewInstance = _viewInstance;

    }

    init()
    {

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
            let success = apiResponse.result;
            this.viewInstance.onLoginSuccess(apiResponse.type, success);
        }else{
            let textAlert = apiResponse.result;
            this.viewInstance.onLoginError(textAlert);
        }
    }
}



export{LoginController}