import { ModifyWorkingDayWC } from "../../Components/WorkingDayCRUD-WC/ModifyWorkingDayWC.js";

class ModifyWorkingDayController
{
    constructor(view)
    {
        this.view = view;
        this.selectedDay = null;
        this.originalData = null;
    }

    setUpTableListeners(table)
    {
        this.table = table;
        const controller = this;

        const originalLoadData = this.table.controller.loadData;
        this.table.controller.loadData = function(data){
            originalLoadData.call(this, data);

            if(data && (Array.isArray(data) ? data.length > 0 : data)){
                const workingDay = Array.isArray(data) ? data[0] : data;
                controller.autofillForm(workingDay);
            }
        }.bind(this.table.controller);

        // Capturar el día seleccionado de los radio buttons
        const originalOnHandleDayChange = this.table.controller.onHandleDayChange;
        this.table.controller.onHandleDayChange = function(event){
            originalOnHandleDayChange.call(this, event);
            if(event.target.checked){
                controller.selectedDay = event.target.value;
            }
        }.bind(this.table.controller);
    }

    autoFormatTime(input)
    {
        
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + ':' + value.substring(2, 4);
        }
        
        input.value = value;
    }

    onModifyButtonClick()
    {
        const newStartHour = this.view.inputStart.value;
        const newEndHour = this.view.inputEnd.value;
        const newActivityId = this.view.inputActivity.value;
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');

        if(!this.selectedDay)
        {
            window.alert('Debe seleccionar un día primero');
            return;
        }

        // Validar que al menos un campo tenga cambios
        if(!newStartHour && !newEndHour && !newActivityId)
        {
            window.alert('Debe especificar al menos un cambio (hora inicio, hora fin o ID actividad)');
            return;
        }

        // Validar formato de horas si se proporcionan
        if(newStartHour && !this.isValidTimeFormat(newStartHour))
        {
            window.alert('Formato de hora de inicio inválido. Use HH:MM (24 horas)');
            return;
        }

        if(newEndHour && !this.isValidTimeFormat(newEndHour))
        {
            window.alert('Formato de hora de fin inválido. Use HH:MM (24 horas)');
            return;
        }

        // Validar que la hora de inicio sea antes que la de fin si ambas se proporcionan
        if(newStartHour && newEndHour && !this.isStartBeforeEnd(newStartHour, newEndHour))
        {
            window.alert('La hora de inicio debe ser anterior a la hora de fin');
            return;
        }

        // Validar ID de actividad si se proporciona
        if(newActivityId && (isNaN(newActivityId) || newActivityId <= 0))
        {
            window.alert('El ID de actividad debe ser un número mayor a 0');
            return;
        }

        // Usar la ruta correcta para modificar días laborales
        fetch('http://localhost:3000/api/workingday/modify',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                day: this.selectedDay,
                new_start_hour: newStartHour || null,
                new_end_hour: newEndHour || null,
                new_id_activity: newActivityId ? parseInt(newActivityId) : null
            })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log("Respuesta de modificación:", result);
            if(result.status){
                window.alert("Día laborable modificado correctamente");
                this.onCancelButtonClick();
                // Refrescar la búsqueda para mostrar los nuevos datos
                if(this.table && this.table.controller) {
                    this.table.controller.searchWorkingDayAutomatically();
                }
            }else{
                let errorMessage = 'Error: ' + result.result;
                if(result.result === 'ACTIVITY_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró la actividad con el ID proporcionado';
                } else if(result.result === 'WORKING_DAY_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró el día laborable';
                } else if(result.result === 'INVALID_TIME_FORMAT') {
                    errorMessage = 'Error: Formato de hora inválido';
                } else if(result.result === 'INVALID_TIME_ORDER') {
                    errorMessage = 'Error: La hora de inicio debe ser anterior a la hora de fin';
                } else if(result.result === 'USER_NOT_AUTHORIZED') {
                    errorMessage = 'Error: Usuario no autorizado para esta acción';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error en la modificación:', error);
            window.alert('Error al modificar el día laborable');
        });
    }

    autofillForm(workingDayData)
    {
        if(workingDayData)
        {
            this.originalData = workingDayData;
            
            // Establecer placeholders con valores actuales del día laboral
            this.view.inputActivity.placeholder = `Actual: ${workingDayData.id_activity}`;
            this.view.inputStart.placeholder = `Actual: ${workingDayData.start_hour}`;
            this.view.inputEnd.placeholder = `Actual: ${workingDayData.end_hour}`;

            // Limpiar valores de entrada
            this.view.inputActivity.value = '';
            this.view.inputStart.value = '';
            this.view.inputEnd.value = '';
        }
    }

    onCancelButtonClick()
    {
        this.view.inputActivity.value = '';
        this.view.inputStart.value = '';
        this.view.inputEnd.value = '';
        
        this.view.inputActivity.placeholder = 'Ingrese el ID de la actividad';
        this.view.inputStart.placeholder = 'HH:MM (ej: 08:00)';
        this.view.inputEnd.placeholder = 'HH:MM (ej: 17:00)';
        
        this.selectedDay = null;
        this.originalData = null;
    }

    // Helper methods para validación
    isValidTimeFormat(timeString) {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(timeString);
    }

    isStartBeforeEnd(start, end) {
        const toMinutes = function(t) {
            const [h, m] = t.split(':').map(Number);
            return h * 60 + m;
        };
        return toMinutes(start) < toMinutes(end);
    }
}

export {ModifyWorkingDayController}