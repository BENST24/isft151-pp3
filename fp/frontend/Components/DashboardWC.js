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
                background-color: rgba(126, 126, 126, 1);
                display: flex;
                display-direction: row;
                margin: 0;
                padding: 0;
                height: 100px;
            }

            .upper-list-container
            {
                background-color: rgba(136, 99, 99, 1);
                display: flex;
                display-direction: row;
                margin-left: 40%;
            }

            .upper-u-list
            {
                background-color: rgba(172, 76, 76, 1);
                display: flex;
                display-direction: row;
                margin: 10px;
                padding: 10px;
            }

            .upper-list
            {
                background-color: rgba(172, 166, 76, 1);
                display: flex;
                flex-direction: row;
                margin: 10px;
                padding: 10px;
            }

            .upper-a-list
            {
                font-size: 20px;
                text-decoration: none;
            }

            .left-nav
            {
                margin: 0;
                background-color: rgba(174, 240, 143, 1);
                min-height: 100vh;
                width: 20%;
            }

            .left-list-container
            {
                background-color: rgba(115, 156, 180, 1);
                
            }

            .left-u-list
            {
                background-color: rgba(111, 70, 187, 1);
            }

            .left-list
            {
                background-color: rgba(172, 52, 102, 1);
                display: flex;
                flex-direction: column;
                margin: 10px;
                padding: 10px;
            }

            .left-a-list
            {
                font-size: 20px;
                text-decoration: none;
            }

            .div-displayer
            {
                background-color: rgba(172, 116, 52, 1);
                width: 40%;
                min-height: calc(80vh - 200px);
                
                padding: 20%;
                
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

        this.upperListContainer = document.createElement('div');
        this.upperListContainer.className = 'upper-list-container';

        this.welcomeContainer = document.createElement('div');
        this.welcomeContainer.className ='welcome-container';

        const user = userType;
        this.welcomeTitle = document.createElement('h2');
        this.welcomeTitle.className = 'welcome-Title';
        this.welcomeTitle.textContent = `Bienvenido ${user}`;

        this.uUpperList00 = document.createElement('ul');
        this.uUpperList00.className = 'upper-u-list';

        this.list00 = document.createElement('li');
        this.list00.className = 'upper-list';
        
        this.aOption00 = document.createElement('a');
        this.aOption00.href='#';
        this.aOption00.textContent = 'Gestionar Empleados';
        this.aOption00.className = 'upper-a-list';

        this.list01 = document.createElement('li');
        this.list01.className = 'upper-list';
        
        this.aOption01 = document.createElement('a');
        this.aOption01.href='#';
        this.aOption01.textContent = 'Gestionar Actividades';
        this.aOption01.className = 'upper-a-list';


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

        this. welcomeContainer.appendChild(this.welcomeTitle);

        this.list00.appendChild(this.aOption00);
        this.list01.appendChild(this.aOption01);
        
        this.uUpperList00.appendChild(this.list00);
        this.uUpperList00.appendChild(this.list01);

        this.upperListContainer.appendChild(this.welcomeTitle);
        this.upperListContainer.appendChild(this.uUpperList00);
        this.upperListContainer.appendChild(this.logOutButton);
        this.upperNav.appendChild(this.upperListContainer);

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