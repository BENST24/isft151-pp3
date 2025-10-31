import { WorkingDayTableWC } from "../Components/WorkingDayTableWC.js";

class WorkingDayTableController
{
    constructor(view)
    {
        this.view = view;
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    onSearchButtonClick()
    {
        let workingDayId = this.view.inputSearch.value;
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');


        if(this.view.getMode() === 'list' && !workingDayId)
        {
            this.listAllActivities(currentUsername, currentUserPassword);
            return;
        }

        if(!workingDayId)
        {
            window.alert('Por favor completar todos los campos');
            return;
        }

        if(isNaN(workingDayId) || workingDayId <=0 )
        {
            window.alert('El ID debe ser mayor a 0');
            return;
        }

        fetch(`http://localhost:3000/api/activity/search?id=${encodeURIComponent(workingDayId)}`,{
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

    listAllActivities(currentUsername, currentUserPassword){
        fetch(`http://localhost:3000/api/activity/list`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            }
        })
        .then(function(response){return response.json();})
        .then(function(result){
            console.log("Respuesta de listar todos: ", result);
            if(result.status || (result.response && result.response.length > 0)){
                const data =  result.response || result.data || result.result || [];
                this.loadData(data);
            }else{
                window.alert('Error: ' +result.result);
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

        const customHeaders=['Id','Actividad', 'Duracion (min)'];

        for(let i = 0 ; i < customHeaders.length; i++){
            let th = document.createElement('th');
            th.textContent = customHeaders[i];
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        this.view.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for(let j = 0; j < dataArray.length; j++){

            let activity = dataArray[j];
            let row = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = activity.id;
            row.appendChild(tdId);

            let tdActivity = document.createElement('td');
            tdActivity.textContent = activity.name;
            row.appendChild(tdActivity);

            let tdDuration = document.createElement('td');
            tdDuration.textContent = activity.duration;
            row.appendChild(tdDuration);

            tbody.appendChild(row);
        }

        this.view.table.appendChild(tbody);

    }
}

export{WorkingDayTableController}