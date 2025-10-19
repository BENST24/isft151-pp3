import {TableWC} from "../../Components/TableWC.js";
class DeleteRecepcionistWC extends HTMLElement
{
    constructor()
    {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const style= document.createElement('style');
        style.textContent =`
            :host
            {
                background-color: rgba(102, 174, 202, 1);
                min-height: 100vh;
                width: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
            }
            
            .title-main 
            {
                margin: 0;
                padding: 30px;
                color: rgba(255, 255, 255, 1);
                font-size: 40px;
                font-weight: 700;
            }
            
            .input-delete
            {
                height: 30px;
            }

            .span-search
            {
                margin: 20px;
                width: 40px;
                height: 40px;
                background-color: rgba(204, 204, 204, 1);
                color: black;
            }

            .search-icon
            {
                width: 40px;
                height: 40px;
                background-color: rgba(204, 204, 204, 1);
                color: black;
            }
        `;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.divMainTitle = document.createElement('div');
        this.divMainTitle.className = 'div-title';

        this.mainTitle = document.createElement('h2');
        this.mainTitle.className = 'title-main';
        this.mainTitle.textContent = 'Eliminar Empleado';
        
        this.deleteButton = document.createElement('button');
        this.deleteButton.className= 'delete-button';
        this.deleteButton.textContent ='Eliminar';

        this.divMainTitle.appendChild(this.mainTitle);

        this.table = new TableWC();
        
        shadow.appendChild(this.divMainTitle);
        shadow.appendChild(this.table);
        shadow.appendChild(this.deleteButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        
    }

    disconnectedCallback()
    {

    }
}

customElements.define('r-delete', DeleteRecepcionistWC);
export{DeleteRecepcionistWC}