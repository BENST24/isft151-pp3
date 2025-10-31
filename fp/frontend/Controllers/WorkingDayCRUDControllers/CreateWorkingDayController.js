    import { CreateWorkingDayWC } from "../../Components/WorkingDayCRUD-WC/CreateWorkingDayWC.js";

    class CreateWorkingDayController
    {
        constructor(view)
        {
            this.view = view;
        }

        onSaveButtonClick()
        {
            let activityName = this.view.inputActivity.value;
            let duration = this.view.inputDuration.value;
            let type = this.selectedType;
            let currentUsername = this.view.getAttribute('current-username');
            let currentUserPassword = this.view.getAttribute('current-userpassword');

            if(!activityName)
            {
                window.alert('Debe ingresar el nombre de la actividad');
                return;
            }

            if(!duration)
            {
                window.alert('Debe ingresar la duracion de la actividad');
                return;
            }

            if(isNaN(duration) || duration <= 0)
            {
                window.alert('La duracion debe ser un numero mayor a 0');
                return;
            }

            let requestBody ={
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                name: activityName,
                duration: parseInt(duration)
            };

            fetch('http://localhost:3000/api/activity/create',{
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
                console.log("Respuesta de la creacion de actividad: ", result);
                if(result.status){
                    window.alert("Actividad creada correctamente");
                    this.onCancelButtonClick();
                }else{
                    window.alert('Error: ' + result.result);
                }
            }.bind(this))
    
        }

        onCancelButtonClick()
        {
            this.view.inputActivity.value = '';
            this.view.inputDuration.value = '';
        }
    }

    export {CreateWorkingDayController}