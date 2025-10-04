import { UpperUlWC } from "./UpperNavBarWC.js";

class DashboardWC extends HTMLElement
{
    constructor(userType)
    {
        super();
        
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
                margin-top: 60px;
                padding: 0;
            }
            .left-list
            {
                background-color: rgba(255, 255, 255, 1);
                display: flex;
                flex-direction: column;
                margin: 10px;
                padding: 10px;
                padding-left: 0;
                border-radius: 20px;
            }

            .left-a-list
            {
                color: rgba(77, 130, 165, 1);
                font-size: 20px;
                text-decoration: none;
                text-align: center;
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
        //rgba(51, 56, 97, 1)  rgba(91, 109, 245, 1)
        this.divMain00 = document.createElement('div');
        this.divMain00.className ='div-main00';

        this.divMain01 = document.createElement('div');
        this.divMain01.className ='div-main01';

        this.upperNav = document.createElement('nav');
        this.upperNav.className = 'upper-nav';


        const user = userType;
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

        this.leftListContainer = document.createElement('div');
        this.leftListContainer.className = 'left-list-container';

        this.uLeftList00 = document.createElement('ul');
        this.uLeftList00.className = 'left-u-list';

        
        this.leftList00 = document.createElement('li');
        this.leftList00.className = 'left-list';
        
        this.aLeftOption00 = document.createElement('a');
        this.aLeftOption00.href='#';
        this.aLeftOption00.textContent = 'Añadir Empleado';
        this.aLeftOption00.className = 'left-a-list';

        this.leftList01 = document.createElement('li');
        this.leftList01.className = 'left-list';
        
        this.aLeftOption01 = document.createElement('a');
        this.aLeftOption01.href='#';
        this.aLeftOption01.textContent = 'Eliminar Empleado';
        this.aLeftOption01.className = 'left-a-list';

        this.leftList02 = document.createElement('li');
        this.leftList02.className = 'left-list';
        
        this.aLeftOption02 = document.createElement('a');
        this.aLeftOption02.href='#';
        this.aLeftOption02.textContent = 'Modificar Empleado';
        this.aLeftOption02.className = 'left-a-list';

        this.leftList03 = document.createElement('li');
        this.leftList03.className = 'left-list';
        
        this.aLeftOption03 = document.createElement('a');
        this.aLeftOption03.href='#';
        this.aLeftOption03.textContent = 'Buscar Empleado';
        this.aLeftOption03.className = 'left-a-list';

        this.leftList04 = document.createElement('li');
        this.leftList04.className = 'left-list';
        
        this.aLeftOption04 = document.createElement('a');
        this.aLeftOption04.href='#';
        this.aLeftOption04.textContent = 'Listar Empleados';
        this.aLeftOption04.className = 'left-a-list';

        this.divDisplayer = document.createElement('div');
        this.divDisplayer.className= 'div-displayer';


        /*--------------------------------------------*/ 


        this.uUpperList = document.createElement('u-upper-ul');

        this.upperNav.appendChild(this.welcomeTitle);
        this.upperNav.appendChild(this.uUpperList);
        this.upperNav.appendChild(this.logOutButton);

        /*---AppendChild left nav*/
        this.leftList00.appendChild(this.aLeftOption00);
        this.leftList01.appendChild(this.aLeftOption01);
        this.leftList02.appendChild(this.aLeftOption02);
        this.leftList03.appendChild(this.aLeftOption03);
        this.leftList04.appendChild(this.aLeftOption04);

        this.uLeftList00.appendChild(this.leftList00);
        this.uLeftList00.appendChild(this.leftList01);
        this.uLeftList00.appendChild(this.leftList02);
        this.uLeftList00.appendChild(this.leftList03);
        this.uLeftList00.appendChild(this.leftList04);

        this.leftListContainer.appendChild(this.uLeftList00);
        this.leftNav.appendChild(this.leftListContainer);

        this.divMain00.appendChild(this.upperNav);
        this.divMain01.appendChild(this.leftNav);
        this.divMain01.appendChild(this.divDisplayer);

        shadow.appendChild(this.divMain00);
        shadow.appendChild(this.divMain01);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        
    }
}

customElements.define('x-dashboard', DashboardWC);

export{DashboardWC}