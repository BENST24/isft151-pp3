import{LoginWC} from "./Components/LoginWC.js";
import { DashboardWC } from "./Components/DashboardWC.js";
import {ApplicationController} from"./ApplicationController.js"
import { ApplicationAPI } from "./ApplicationAPI.js";

class ApplicationWC extends HTMLElement
{
    constructor()
    {
        super();
        this.apiInstance = new ApplicationAPI();
        this.innerController = new ApplicationController(this, this.apiInstance);

        const shadow = this.attachShadow({mode: 'open'});
        this.currentView = new LoginWC(this.apiInstance);

        shadow.appendChild(this.currentView);

        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleLogoutRequest = this.handleLogoutRequest.bind(this);
    }

    changeViewToDashboard(userData)
    {

        const newView = new DashboardWC(this.apiInstance, userData);

        if(this.currentView && this.currentView.parentNode)
        {
            this.currentView.parentNode.replaceChild(newView, this.currentView);
        }else{
            this.shadowRoot.appendChild(newView);
        }
    
        this.currentView = newView;

        this.currentView.addEventListener('logoutRequest', this.handleLogoutRequest);
        
    }

    changeViewToLogin()
    {

        const newView = new LoginWC(this.apiInstance);

        if(this.currentView && this.currentView.parentNode)
        {
            this.currentView.parentNode.replaceChild(newView, this.currentView);
        }else{
            this.shadowRoot.appendChild(newView);
        }
        
        this.currentView = newView;

        this.currentView.addEventListener('loginRequest', this.handleLoginRequest);
    }
    
    handleLoginRequest(event)
    {
        this.innerController.onLoginRequestEvent(event);
    }

    handleLogoutRequest(event)
    {
        this.innerController.onUserLogout();
    }

    connectedCallback()
    {
        this.currentView.addEventListener('loginRequest', this.handleLoginRequest);

        this.innerController.init();
    }

    disconnectedCallback()
    {
        this.innerController.release();
    }
}

customElements.define('a-application-wc', ApplicationWC);

export{ApplicationWC}