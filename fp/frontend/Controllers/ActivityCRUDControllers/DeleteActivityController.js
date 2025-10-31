import { DeleteActivityWC } from "../../Components/ActivityCRUD-WC/DeleteActivityWC.js";

class DeleteActivityController
{
    constructor(view)
    {
        this.view = view;
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    onDeleteButtonClick()
    {
        
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');

        const tableController = this.view.table.controller;
        const activityData = tableController.fullData;

        if(!activityData || activityData.length === 0)
        {
            window.alert('Primero debe buscar un usuario para eliminar');
            return;
        }

        const activity = activityData[0];
        const activityId = activity.id;

        if(!activityId){
            window.alert('No se puede indentificar la actividad a eliminar');
            return;
        }

        const confirmDelete = window.confirm(`¿Estas seguro que desea eliminar la actividad"${activity.name}?"`);

        if(!confirmDelete){
            return;
        }

        fetch(`http://localhost:3000/api/activity/delete`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                id: activityId
            })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log("Respuesta de eliminacion", result);
            if(result.status)
            {
                window.alert("Actividad eliminada correctamente");
                this.view.table.clear();
                this.view.table.inputSearch.value = '';
            }else
            {
                window.alert('Error: '+ result.result);
            }
        }.bind(this));   
    }
}

export {DeleteActivityController}