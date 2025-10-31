import { CreateWorkingDayWC } from "../../Components/WorkingDayCRUD-WC/CreateWorkingDayWC.js";

class CreateWorkingDayController
{
    constructor(view)
    {
        this.view = view;
        this.selectedDay = null;
    }

    onHandleDayChange(event)
    {
        if(event.target.checked)
        {
            this.selectedDay = event.target.value;
        }
    }

    autoFormatTime(input)
    {
        
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + ':' + value.substring(2, 4);
        }
        
        input.value = value;
    }

    onSaveButtonClick()
    {
        
        let activityId = this.view.inputActivity.value;
        let startHour = this.view.inputStart.value;
        let endHour = this.view.inputEnd.value;
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');

        
        if(!this.selectedDay)
        {
            window.alert('Debe seleccionar un día de la semana');
            return;
        }

        if(!activityId)
        {
            window.alert('Debe ingresar el ID de la actividad');
            return;
        }

        if(isNaN(activityId) || activityId <= 0)
        {
            window.alert('El ID de actividad debe ser un número mayor a 0');
            return;
        }

        if(!startHour || !endHour)
        {
            window.alert('Debe ingresar tanto la hora de inicio como la de fin');
            return;
        }

        
        let requestBody = {
            currentUsername: currentUsername,
            currentUserPassword: currentUserPassword,
            day: this.selectedDay,
            start_hour: startHour,
            end_hour: endHour,
            id_activity: parseInt(activityId)
        };

        console.log("Enviando datos:", requestBody);

        fetch('http://localhost:3000/api/workingday/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log("Respuesta de la creación de día laborable: ", result);
            if(result.status){
                window.alert("Día laborable creado correctamente");
                this.onCancelButtonClick();
            }else{
                window.alert('Error: ' + result.result);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error:', error);
            window.alert('Error al crear el día laborable');
        });
    }

    onCancelButtonClick()
    {
        
        this.view.inputActivity.value = '';
        this.view.inputStart.value = '';
        this.view.inputEnd.value = '';
        
        
        this.view.typeInputOption00.checked = false;
        this.view.typeInputOption01.checked = false;
        this.view.typeInputOption02.checked = false;
        this.view.typeInputOption03.checked = false;
        this.view.typeInputOption04.checked = false;
        this.view.typeInputOption05.checked = false;
        this.view.typeInputOption06.checked = false;
        
        this.selectedDay = null;
    }
}

export {CreateWorkingDayController}