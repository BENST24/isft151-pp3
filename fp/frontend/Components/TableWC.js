

class TableWC extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = `
            .data-table{
                width: 100%;
                border-collapse: collapse;
                background-color: #979797;
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
                color: black;
            }
        `;

        this.table = document.createElement('table');
        this.table.className = 'data-table';

        shadow.appendChild(this.table);
        shadow.appendChild(style);

        this.fullData = null;
    }

    loadData(data){
        this.fullData = data;
        this.clearTable();
        
        if(!data || data.length === 0){
            this.showNoData();
            return;
        }

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        headerRow.className = 'data-table';

        const customHeaders=['ID', 'Usuario'];

        for(let i = 0 ; i < customHeaders.length; i++){
            let th = document.createElement('th');
            th.textContent = customHeaders[i];
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        this.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for(let j = 0; j < data.length; j++){

            let user = data[j];
            let row = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = user.id;
            row.appendChild(tdId);

            let tdUser = document.createElement('td');
            tdUser.textContent = user.username;
            row.appendChild(tdUser);

            tbody.appendChild(row);
        }

        this.table.appendChild(tbody);

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
        cell.style.color = '#666';
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