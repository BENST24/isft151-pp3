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
        this.loginView = new LoginWC();
        this.dashboardView = null;
        this.innerController = new ApplicationController(this, this.apiInstance);
        this.currentView = this.loginView;

        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.currentView);
    }

    changeViewToDashboard(userData)
    {
        const newView = new DashboardWC(userData);
        if(this.currentView && this.currentView.parentNode)
        {
            this.currentView.parentNode.replaceChild(newView, this.currentView);
        }else{
            this.shadowRoot.appendChild(newView);
        }

        this.dashboardView = newView;
        this.currentView = newView;

        this.setupDashboardEvents();
    }

    changeViewToLogin()
    {
        const newView = new LoginWC();

        if(this.currentView && this.currentView.parentNode)
        {
            this.currentView.parentNode.replaceChild(newView, this.currentView);
        }else{
            this.shadowRoot.appendChild(newView);
        }

        this.loginView = newView;
        this.currentView = newView;
        this.dashboardView = null;

        this.setupLoginEvents();
    }

    setupLoginEvents()
    {
        this.loginView.addEventListener('loginRequest', function(event){
            this.innerController.onLoginRequestEvent(event.detail);
        }.bind(this));
    }

    setupDashboardEvents()
    {
        this.dashboardView.addEventListener('logout', function(event){
            this.innerController.onUserLogout();
        }.bind(this));
    }
    connectedCallback()
    {
        this.setupLoginEvents();
        this.innerController.init();
    }

    disconnectedCallback()
    {
        if(this.dashboardView){
            this.dashboardView = null;
        }
        this.loginView = null;
        this.innerController.release();
    }
}

customElements.define('a-application-wc', ApplicationWC);

export{ApplicationWC}