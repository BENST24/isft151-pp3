import { DeleteWorkingDayWC } from "../../Components/WorkingDayCRUD-WC/DeleteWorkingDayWC.js";

class DeleteWorkingDayController
{
    constructor(view)
    {
        this.view = view;
    }

    onDeleteButtonClick()
    {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const workingDayData = this.view.table.controller.fullData;

        if(!workingDayData || workingDayData.length === 0)
        {
            window.alert('Primero debe seleccionar un día laborable para eliminar');
            return;
        }

        const workingDay = workingDayData[0];
        const day = workingDay.day;

        if(!day){
            window.alert('No se puede identificar el día laborable a eliminar');
            return;
        }

        const dayNames = {
            'MONDAY': 'Lunes',
            'TUESDAY': 'Martes',
            'WEDNESDAY': 'Miércoles', 
            'THURSDAY': 'Jueves',
            'FRIDAY': 'Viernes',
            'SATURDAY': 'Sábado',
            'SUNDAY': 'Domingo'
        };

        const confirmDelete = window.confirm('¿Está seguro que desea eliminar el día laborable del ' + (dayNames[day] || day) + '?');

        if(!confirmDelete){
            return;
        }

        fetch('http://localhost:3000/api/workingday/delete',{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                day: day
            })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log("Respuesta de eliminación:", result);
            if(result.status)
            {
                window.alert("Día laborable eliminado correctamente");
                this.view.table.clear();
                this.view.table.controller.clearRadioSelection();
            }else
            {
                let errorMessage = 'Error: ' + result.result;
                if (result.result === 'WORKING_DAY_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró el día laborable';
                } else if (result.result === 'USER_NOT_AUTHORIZED') {
                    errorMessage = 'Error: Usuario no autorizado para esta acción';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error en la eliminación:', error);
            window.alert('Error al eliminar el día laborable');
        });   
    }
}

export {DeleteWorkingDayController}