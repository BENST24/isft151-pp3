class UpperUlWC extends  HTMLElement
{
    constructor()
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            .upper-u-list
            {
                display: flex;
                display-direction: row;
                margin-left: 500px;
                margin-right: 500px;
                padding: 20px;
                width: 30%;
                margin-top: 50px;
                background-color: rgba(255, 255, 255, 1);
                border-radius: 20px;
            }

            .upper-list
            {
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin: 20px;
                border-color 2px solid black;
                padding-left: 0px;
                margin-top: 0px;
            }

            .upper-list:hover
            {
                background-color:rgba(146, 146, 146, 1); 
                border-radius: 5px;
            }

            .upper-a-list
            {
                font-size: 20px;
                text-decoration: none;
                color: rgba(77, 130, 165, 1);
                text-align: center;
            }
            
            .upper-a-list:hover
            {
                color:rgba(0, 0, 0, 1);
            }
        `;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

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

        this.list00.appendChild(this.aOption00);
        this.list01.appendChild(this.aOption01);

    
        this.uUpperList00.appendChild(this.list00);
        this.uUpperList00.appendChild(this.list01);

        shadow.appendChild(this.uUpperList00);
        shadow.appendChild(style);
    }
}

customElements.define('u-upper-ul', UpperUlWC);

export{UpperUlWC}