    import { ModifyWorkingDayWC } from "../../Components/WorkingDayCRUD-WC/ModifyWorkingDayWC.js";

    class ModifyWorkingDayController
    {
        constructor(view)
        {
            this.view = view;
            this.currentActivityId = null;
            this.originalActivityName = null;
        }

        setUpTableListeners(table)
        {

            this.table = table;
            const controller = this;

            const originalLoadData = this.table.controller.loadData;
            this.table.controller.loadData = function(data){
                originalLoadData.call(this, data);

                if(data && (Array.isArray(data) ? data.length > 0 : data)){
                    const activity = Array.isArray(data) ? data[0] : data;
                    controller.autofillForm([activity]);
                }
            }.bind(this.table.controller);
        }

        onModifyButtonClick()
        {
            
            let newName = this.view.inputActivity.value;
            let newDuration = this.view.inputDuration.value;
            let currentUsername = this.view.getAttribute('current-username');
            let currentUserPassword = this.view.getAttribute('current-userpassword');

            if(!this.currentActivityId)
            {
                window.alert('Debe buscar una actividad primero');
                return;
            }

            if(!newName && !newDuration)
            {
                window.alert('Debe especificar al menos un cambio(nombre o duración)');
                return;
            }

            if(newDuration && (isNaN(newDuration) || newDuration <=0))
            {
                window.alert('La duración debe ser un número mayo a 0');
                return;
            }

            let requestBody ={
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                id: this.currentActivityId
            };

            if(newName)
            {
                requestBody.newName = newName;
            }
            if(newDuration)
            {
                requestBody.newDuration = parseInt(newDuration);
            }

            fetch('http://localhost:3000/api/activity/modify',{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(function(response){
                return response.json();
            })
            .then(function(result){
                console.log("Respuesta de modificación", result);
                if(result.status){
                    window.alert("Actividad modificada correctamente");
                    this.onCancelButtonClick();
                    this.view.table.clear();
                }else{
                    window.alert('Error: ' + result.result);
                }
            }.bind(this));
            
        }

        autofillForm(activityData)
        {
            if(activityData && activityData.length > 0)
            {
                const activity = activityData[0];

                this.currentActivityId = activity.id;
                this.originalActivityName = activity.name;

                this.view.inputActivity.placeholder = `Actual: ${activity.name}`;
                this.view.inputDuration.placeholder = `Actual: ${activity.duration} minutos`;

                this.view.inputActivity.value = '';
                this.view.inputDuration.value = '';
            }
        }
        onCancelButtonClick()
        {
            this.view.inputActivity.value = '';
            this.view.inputDuration.value = '';
            this.view.inputActivity.placeholder = 'Ingrese el nuevo nombre';
            this.view.inputDuration.placeholder = 'Ingrese la nueva duracion en minutos';
            this.currentActivityId = null;
            this.originalActivityName = null;
        }
    }

    export {ModifyWorkingDayController}