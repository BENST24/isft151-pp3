import { CancelAppointmentWC } from "../../Components/AppointmentCRUD-WC/CancelAppointmentWC.js";

class CancelAppointmentController {
    constructor(view) {
        this.view = view;
        this.selectedAppointment = null;
    }

    onSearchButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const date = this.view.inputDate.value;
        const time = this.view.inputTime.value;
        const idActivity = this.view.inputActivity.value;

        // Validaciones
        if (!date || !time || !idActivity) {
            window.alert('Debe ingresar fecha, hora e ID de actividad');
            return;
        }

        if (isNaN(idActivity) || idActivity <= 0) {
            window.alert('El ID de actividad debe ser un número válido');
            return;
        }

        // Buscar el turno específico
        fetch('http://localhost:3000/api/appointment/search/datetime', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            },
            body: JSON.stringify({
                date: date,
                time: time
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de búsqueda:", result);
            if (result.status) {
                const appointment = result.respond;
                // Verificar que la actividad coincida
                if (appointment.id_activity == idActivity) {
                    this.selectedAppointment = appointment;
                    this.view.table.controller.loadData([appointment]);
                } else {
                    window.alert('No se encontró un turno con la fecha, hora y actividad especificadas');
                    this.view.table.clear();
                    this.selectedAppointment = null;
                }
            } else {
                window.alert('Error: ' + result.result);
                this.view.table.clear();
                this.selectedAppointment = null;
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la búsqueda:', error);
            window.alert('Error al buscar el turno');
            this.selectedAppointment = null;
        }.bind(this));
    }

    onCancelButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        
        if (!this.selectedAppointment) {
            window.alert('Primero debe buscar un turno para cancelar');
            return;
        }

        // Verificar si ya está cancelado
        if (this.selectedAppointment.state === 'CANCELED') {
            window.alert('Este turno ya está cancelado');
            return;
        }

        const date = this.view.inputDate.value;
        const time = this.view.inputTime.value;
        const idActivity = this.view.inputActivity.value;

        const confirmCancel = window.confirm(
            '¿Está seguro que desea cancelar el turno del ' + date + ' a las ' + time + '?'
        );

        if (!confirmCancel) {
            return;
        }

        fetch('http://localhost:3000/api/appointment/cancel', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                date: date,
                time: time,
                idActivity: parseInt(idActivity)
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de cancelación:", result);
            if (result.status) {
                window.alert("Turno cancelado correctamente");
                this.onClearForm();
            } else {
                let errorMessage = 'Error: ' + result.result;
                if (result.result === 'APPOINTMENT_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró el turno especificado';
                } else if (result.result === 'APPOINTMENT_ALREADY_CANCELED') {
                    errorMessage = 'Error: El turno ya está cancelado';
                } else if (result.result === 'CANCEL_FAILED') {
                    errorMessage = 'Error: No se pudo cancelar el turno';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la cancelación:', error);
            window.alert('Error al cancelar el turno');
        });
    }

    onClearForm() {
        this.view.inputDate.value = '';
        this.view.inputTime.value = '';
        this.view.inputActivity.value = '';
        this.selectedAppointment = null;
        this.view.table.clear();
    }
}

export { CancelAppointmentController };