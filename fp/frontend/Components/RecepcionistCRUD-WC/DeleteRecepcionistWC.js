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

        this.divSearch = document.createElement('div');
        this.divSearch.className = 'div-search';

        this.mainTitle = document.createElement('h2');
        this.mainTitle.className = 'title-main';
        this.mainTitle.textContent = 'Eliminar Empleado';

        this.labelSearch = document.createElement('label');
        this.labelSearch.className = 'label-search';

        this.inputSearch = document.createElement('input');
        this.inputSearch.className = 'input-search';
        this.inputSearch.placeholder ='Ingrese el nombre de usuario...';

        this.spanSearch = document.createElement('span');
        this.spanSearch.className = 'span-search';

        this.searchIcon = document.createElement('img');
        this.searchIcon.className = 'search-icon';
        this.searchIcon.src = './assets/buscar.png';

        this.deleteButton = document.createElement('button');
        this.deleteButton.className= 'delete-button';
        this.deleteButton.textContent ='Eliminar';

        this.spanSearch.appendChild(this.searchIcon);
        this.labelSearch.appendChild(this.spanSearch);
        this.labelSearch.appendChild(this.inputSearch);
        this.divSearch.appendChild(this.labelSearch);
        this.divMainTitle.appendChild(this.mainTitle);

        this.table = new TableWC();
        
        shadow.appendChild(this.divMainTitle);
        shadow.appendChild(this.divSearch);
        shadow.appendChild(this.table);
        shadow.appendChild(this.deleteButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        this.spanSearch.onclick = this.table.loadData.bind(this.table);
    }

    disconnectedCallback()
    {

    }
}

customElements.define('r-delete', DeleteRecepcionistWC);
export{DeleteRecepcionistWC}