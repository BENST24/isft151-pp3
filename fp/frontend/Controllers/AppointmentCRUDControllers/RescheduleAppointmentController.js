import { RescheduleAppointmentWC } from "../../Components/AppointmentCRUD-WC/RescheduleAppointmentWC.js";

class RescheduleAppointmentController {
    constructor(view) {
        this.view = view;
        this.selectedAppointment = null;
    }

    onSearchButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const oldDate = this.view.inputOldDate.value;
        const oldTime = this.view.inputOldTime.value;

        if (!oldDate || !oldTime) {
            window.alert('Debe ingresar fecha y hora actual del turno');
            return;
        }

        fetch('http://localhost:3000/api/appointment/search/datetime', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            },
            body: JSON.stringify({
                date: oldDate,
                time: oldTime
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de búsqueda:", result);
            if (result.status) {
                this.selectedAppointment = result.respond;
                this.view.table.controller.loadData([this.selectedAppointment]);
                this.view.showRescheduleSection();
            } else {
                window.alert('Error: ' + result.result);
                this.view.table.clear();
                this.selectedAppointment = null;
                this.view.hideRescheduleSection();
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la búsqueda:', error);
            window.alert('Error al buscar el turno');
            this.selectedAppointment = null;
            this.view.hideRescheduleSection();
        }.bind(this));
    }

    onRescheduleButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const oldDate = this.view.inputOldDate.value;
        const oldTime = this.view.inputOldTime.value;
        const newDate = this.view.inputNewDate.value;
        const newTime = this.view.inputNewTime.value;

        if (!this.selectedAppointment) {
            window.alert('Primero debe buscar un turno para reprogramar');
            return;
        }

        if (!newDate || !newTime) {
            window.alert('Debe ingresar la nueva fecha y hora');
            return;
        }

        const confirmReschedule = window.confirm(
            '¿Está seguro que desea reprogramar el turno del ' + oldDate + ' a las ' + oldTime + 
            ' para el ' + newDate + ' a las ' + newTime + '?'
        );

        if (!confirmReschedule) {
            return;
        }

        fetch('http://localhost:3000/api/appointment/modify/reschedule', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                oldDate: oldDate,
                oldTime: oldTime,
                newDate: newDate,
                newTime: newTime
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de reprogramación:", result);
            if (result.status) {
                window.alert("Turno reprogramado correctamente");
                this.onCancelButtonClick();
            } else {
                let errorMessage = 'Error: ' + result.result;
                if (result.result === 'APPOINTMENT_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró el turno especificado';
                } else if (result.result === 'SLOT_NOT_AVAILABLE') {
                    errorMessage = 'Error: El nuevo horario no está disponible';
                } else if (result.result === 'RESCHEDULE_FAILED') {
                    errorMessage = 'Error: No se pudo reprogramar el turno';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la reprogramación:', error);
            window.alert('Error al reprogramar el turno');
        });
    }

    onCancelButtonClick() {
        this.view.inputOldDate.value = '';
        this.view.inputOldTime.value = '';
        this.view.inputNewDate.value = '';
        this.view.inputNewTime.value = '';
        this.selectedAppointment = null;
        this.view.table.clear();
        this.view.hideRescheduleSection();
    }
}

export { RescheduleAppointmentController };