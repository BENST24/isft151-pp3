import { TableController } from "../Controllers/TableController.js";

class TableWC extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new TableController(this);
        const style = document.createElement('style');
        style.textContent = `
            .data-table{
                width: 100%;
                border-collapse: collapse;
                background-color: #ffffffff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow-x: auto;
            }

            .data-table th{
                background-color: #f5f5f5;
                padding: 12px;
                text-align: left;
                font-weight: bold;
                border-bottom: 2px solid #ddd;
                color: #333;
            }

            .data-table td{
                padding: 10px 12px;
                border-bottom: 1px solid #eee;
                color: #212529;
            }
            
            .input-search
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
        
        this.divSearch = document.createElement('div');
        this.divSearch.className = 'div-search';

        this.labelSearch = document.createElement('label');
        this.labelSearch.className = 'label-search';

        this.inputSearch = document.createElement('input');
        this.inputSearch.className = 'input-search';
        this.inputSearch.placeholder ='Ingrese el nombre de usuario...';

        this.spanSearch = document.createElement('span');
        this.spanSearch.className = 'span-search';

        this.searchIcon = document.createElement('img');
        this.searchIcon.className = 'search-icon';
        this.searchIcon.src ='/fp/frontend/assets/buscar.png';

        this.spanSearch.appendChild(this.searchIcon);
        this.labelSearch.appendChild(this.spanSearch);
        this.labelSearch.appendChild(this.inputSearch);
        this.divSearch.appendChild(this.labelSearch);

        this.table = document.createElement('table');
        this.table.className = 'data-table';

        shadow.appendChild(this.divSearch);
        shadow.appendChild(this.table);
        shadow.appendChild(style);

        this.fullData = null;
    }

    connectedCallback()
    {
        this.spanSearch.onclick = this.controller.onSearchButtonClick.bind(this.controller);
    }

    clearTable(){
        while(this.table.firstChild){
            this.table.removeChild(this.table.firstChild);
        }
    }


    showNoData(){
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.colSpan = 2;
        cell.textContent = 'No hay datos disponibles';
        cell.className = 'data-table';
        cell.style.color = '#000000ff';
        row.appendChild(cell);
        this.table.appendChild(row);
    }

    clear(){
        this.clearTable();
        this.showNoData();
    }
}

customElements.define('table-wc', TableWC);

export{TableWC};