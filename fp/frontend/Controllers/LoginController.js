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
            this.onLoginSuccess(apiResponse.type, apiResponse.result);
        }else{
            this.onLoginError(apiResponse.result);
        }
    }

    onLoginSuccess(userType)
    {
        let username = this.viewInstance.userInput.value;
        if(this.viewInstance.parentNode)
        {
            this.viewInstance.removeChild(this.viewInstance);
        }
        
        let dashboardInstance = new DashboardWC();

        document.body.appendChild(dashboardInstance);

    }
}



export{LoginController}