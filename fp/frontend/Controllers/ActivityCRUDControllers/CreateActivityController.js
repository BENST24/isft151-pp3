class CreateActivityController
{
    constructor(view)
    {
        this.view = view;
    }

    onSaveButtonClick()
    {
        let activityName = this.view.inputActivity.value;
        let durationMinutes = this.view.inputDuration.value;
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');

        if(!activityName)
        {
            window.alert('Debe ingresar el nombre de la actividad');
            return;
        }

        if(!durationMinutes)
        {
            window.alert('Debe ingresar la duracion de la actividad');
            return;
        }

        if(isNaN(durationMinutes) || durationMinutes <= 0)
        {
            window.alert('La duracion debe ser un numero mayor a 0');
            return;
        }

        // CONVERTIR MINUTOS A FORMATO TIME (HH:MM:SS)
        const durationInTimeFormat = this.minutesToTimeFormat(parseInt(durationMinutes));

        let requestBody ={
            currentUsername: currentUsername,
            currentUserPassword: currentUserPassword,
            name: activityName,
            duration: durationInTimeFormat
        };

        console.log("Enviando creación de actividad:", requestBody);

        fetch('http://localhost:3000/api/activity/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(function(response){
            if (!response.ok) {
                throw new Error('Error HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(function(result){
            console.log("Respuesta de la creacion de actividad: ", result);
            if(result.status){
                window.alert("Actividad creada correctamente");
                this.onCancelButtonClick();
            }else{
                let errorMessage = 'Error: ' + result.result;
                if (result.result === 'ACTIVITY_ALREADY_EXISTS') {
                    errorMessage = 'Error: Ya existe una actividad con ese nombre';
                } else if (result.result === 'USER_NOT_AUTHORIZED') {
                    errorMessage = 'Error: No tiene permisos para crear actividades';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error:', error);
            window.alert('Error al crear la actividad: ' + error.message);
        });
    }

    // Convertir minutos a formato TIME (HH:MM:SS)
    minutesToTimeFormat(minutes) {
        console.log("Convirtiendo minutos:", minutes);
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const timeFormat = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`;
        console.log("Convertido a:", timeFormat);
        return timeFormat;
    }

    onCancelButtonClick()
    {
        this.view.inputActivity.value = '';
        this.view.inputDuration.value = '';
    }
}

export {CreateActivityController}