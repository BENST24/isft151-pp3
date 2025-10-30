import { TableWC } from "../Components/TableWC.js";

class TableController
{
    constructor(view)
    {
        this.view = view;
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    onSearchButtonClick()
    {
        let username = this.view.inputSearch.value;
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');


        if(!username)
        {
            window.alert('Por favor completar todos los campos');
            return;
        }
        fetch(`http://localhost:3000/api/user/search?username=${encodeURIComponent(username)}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            }
        })
        .then(function(response){return response.json();})
        .then(function(result){
                console.log("Respuesta de busqueda:", result);
                if(result.status){
                    const data = result.response ? [result.response] :result.data || result.result;
                    this.loadData(data);
                }else{
                    window.alert('Error: '+ result.result);
                    this.view.clear();
                }
        }.bind(this))
    }

    loadData(data){
        this.fullData = data;
        this.view.clearTable();
        
        const dataArray = Array.isArray(data) ? data : [data];

        if(!dataArray || dataArray.length === 0){
            this.view.showNoData();
            return;
        }

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        headerRow.className = 'data-table';

        const customHeaders=['Usuario', 'Rol'];

        for(let i = 0 ; i < customHeaders.length; i++){
            let th = document.createElement('th');
            th.textContent = customHeaders[i];
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        this.view.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for(let j = 0; j < data.length; j++){

            let user = dataArray[j];
            let row = document.createElement('tr');

            let tdUser = document.createElement('td');
            tdUser.textContent = user.name || user.username;
            row.appendChild(tdUser);

            let tdType = document.createElement('td');
            tdType.textContent = user.type;
            row.appendChild(tdType);

            tbody.appendChild(row);
        }

        this.view.table.appendChild(tbody);

    }
}

export{TableController}