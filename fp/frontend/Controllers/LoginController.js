import { DashboardWC } from "../Components/DashboardWC.js";
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
        this.viewInstance = null;
        this.modelInstance = null;
    }

    run()
    {

    }
    
    stop()
    {

    }

    onLoginButtonClick()
    {
        let username = this.viewInstance.userInput.value;
        let password = this.viewInstance.passwordInput.value;
        let result=this.modelInstance.authenticateUserAPI(username, password);
        this.onAuthenticationRequestResponse(result);  
    }

    onAuthenticationRequestResponse(apiResponse)
    {
        if(apiResponse.status){
            this.viewInstance.onLoginSuccess(apiResponse.type, apiResponse.result);
        }else{
            let textAlert = apiResponse.result;
            this.viewInstance.onLoginError(textAlert);
        }
    }
}



export{LoginController}