import { UpperNavListWC } from "./UpperNavListWC.js";
import { RecepcionistListWC } from "./RecepcionistListWC.js";
import { ActivityListWC } from "./ActivityListWC .js";
import { DashboardController } from "../Controllers/DashboardController.js";

class DashboardWC extends HTMLElement
{
    constructor(userType)
    {
        super();
        this.controller = new DashboardController();
        this.upperNavComponent = new UpperNavListWC();
        this.uRecepcionistList = new RecepcionistListWC();
        this.uActivityList = new ActivityListWC();
        const user = userType;
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            :host
            {
                background-color: rgba(255, 255, 255, 1);
                min-height: 100vh;
                display: block;
                margin: 0;
                padding: 0;
                width: 100%;
            }
            
            .div-main01
            {
                display: flex;
                flex-direction: row;
            }

            .upper-nav
            {
                background: linear-gradient(rgba( 77, 85, 145, 1),rgba(51, 56, 97, 1));
                display: flex;
                display-direction: row;
                height: 100px;
                font-size: 20px;
            }
            
            .welcome-title
            {
                margin-top: 50px;
                margin-left: 30px;
                color: rgba(255, 255, 255, 1);
            }
        
            .log-out-button
            {
                margin-top: 50px;
            }

            .left-nav
            {
                margin: 0;
                background: linear-gradient(rgba( 77, 85, 145, 1),rgba(51, 56, 97, 1) ,rgba( 77, 85, 145, 1), rgba(91, 109, 245, 1));
                min-height: calc(100vh - 100px);
                width: 20%;
            }
            
            .left-list-container
            {
                margin-top: 40px;
                padding: 0;
                margin-left: 30px;
            }

            .div-displayer
            {
                background-color: rgba(146, 146, 146, 1);
                width: 80%;
                min-height: calc(80vh - 800px);
            }
        `;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.divMain00 = document.createElement('div');
        this.divMain00.className ='div-main00';

        this.divMain01 = document.createElement('div');
        this.divMain01.className ='div-main01';

        this.upperNav = document.createElement('nav');
        this.upperNav.className = 'upper-nav';

        this.welcomeTitle = document.createElement('h2');
        this.welcomeTitle.className = 'welcome-title';
        this.welcomeTitle.textContent = `Bienvenido ${user}`;

        this.logOutButton = document.createElement('a');
        this.logOutButton.href='';
        this.logOutButton.textContent = 'Cerrar Sesion';
        this.logOutButton.className ='log-out-button';

        /*---------------------NAV VERTICAL--------------------------*/
        this.leftNav =document.createElement('nav');
        this.leftNav.className ='left-nav';

        this.divDisplayer = document.createElement('div');
        this.divDisplayer.className= 'div-displayer';
        /*--------------------------------------------*/ 
        
        this.uRecepcionistList.style.display= 'none';
        this.uActivityList.style.display= 'none';

        this.upperNav.appendChild(this.welcomeTitle);
        this.upperNav.appendChild(this.upperNavComponent);
        this.upperNav.appendChild(this.logOutButton);

        this.leftNav.appendChild(this.uRecepcionistList);
        this.leftNav.appendChild(this.uActivityList);

        this.divMain00.appendChild(this.upperNav);
        this.divMain01.appendChild(this.leftNav);
        this.divMain01.appendChild(this.divDisplayer);

        shadow.appendChild(this.divMain00);
        shadow.appendChild(this.divMain01);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        
        this.upperNavComponent.aOption00.onclick = this.controller.onManageEmployees.bind(this.controller);
        this.upperNavComponent.aOption01.onclick = this.controller.onManageActivities.bind(this.controller);
    }

    disconnectedCallback()
    {

    }
}

customElements.define('x-dashboard', DashboardWC);

export{DashboardWC}