import { ModifyAppointmentWC } from "../../Components/AppointmentCRUD-WC/ModifyAppointmentWC.js";

class ModifyAppointmentController {
    constructor(view) {
        this.view = view;
        this.selectedAppointment = null;
    }

    onSearchButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const date = this.view.inputDate.value;
        const time = this.view.inputTime.value;

        if (!date || !time) {
            window.alert('Debe ingresar fecha y hora del turno');
            return;
        }

        fetch('http://localhost:3000/api/appointment/search/datetime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-HTTP-Method-Override': 'GET'
            },
            body: JSON.stringify({
                currentUsername, currentUserPassword, date, time
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de búsqueda:", result);
            if (result.status) {
                this.selectedAppointment = result.respond;
                this.view.table.controller.loadData([this.selectedAppointment]);
                this.autofillForm(this.selectedAppointment);
                this.view.showModifySection();
            } else {
                window.alert('Error: ' + result.result);
                this.view.table.clear();
                this.selectedAppointment = null;
                this.view.hideModifySection();
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la búsqueda:', error);
            window.alert('Error al buscar el turno');
            this.selectedAppointment = null;
            this.view.hideModifySection();
        }.bind(this));
    }

    autofillForm(appointment) {
        if (appointment) {
            this.view.inputName.placeholder = `Actual: ${appointment.name_client}`;
            this.view.inputSurname.placeholder = `Actual: ${appointment.surname_client}`;
            this.view.inputDni.placeholder = `Actual: ${appointment.dni}`;
            
            this.view.inputName.value = '';
            this.view.inputSurname.value = '';
            this.view.inputDni.value = '';
        }
    }

    onModifyButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const newName = this.view.inputName.value;
        const newSurname = this.view.inputSurname.value;
        const newDni = this.view.inputDni.value;
        const oldDate = this.view.inputDate.value;
        const oldTime = this.view.inputTime.value;

        if (!this.selectedAppointment) {
            window.alert('Primero debe buscar un turno para modificar');
            return;
        }

        if (!newName && !newSurname && !newDni) {
            window.alert('Debe especificar al menos un campo para modificar');
            return;
        }

        if (newDni && (isNaN(newDni) || newDni <= 0)) {
            window.alert('El DNI debe ser un número válido');
            return;
        }

        const requestBody = {
            currentUsername: currentUsername,
            currentUserPassword: currentUserPassword,
            oldDate: oldDate,
            oldTime: oldTime
        };

        if (newName) requestBody.newNameClient = newName;
        if (newSurname) requestBody.newSurnameClient = newSurname;
        if (newDni) requestBody.newDniClient = parseInt(newDni);

        fetch('http://localhost:3000/api/appointment/modify/client', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de modificación:", result);
            if (result.status) {
                window.alert("Datos del cliente modificados correctamente");
                this.onCancelButtonClick();
            } else {
                let errorMessage = 'Error: ' + result.result;
                if (result.result === 'APPOINTMENT_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró el turno especificado';
                } else if (result.result === 'UPDATE_FAILED') {
                    errorMessage = 'Error: No se pudieron actualizar los datos';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la modificación:', error);
            window.alert('Error al modificar los datos del cliente');
        });
    }

    onCancelButtonClick() {
        this.view.inputDate.value = '';
        this.view.inputTime.value = '';
        this.view.inputName.value = '';
        this.view.inputSurname.value = '';
        this.view.inputDni.value = '';
        this.view.inputName.placeholder = 'Nuevo nombre';
        this.view.inputSurname.placeholder = 'Nuevo apellido';
        this.view.inputDni.placeholder = 'Nuevo DNI';
        this.selectedAppointment = null;
        this.view.table.clear();
        this.view.hideModifySection();
    }
}

export { ModifyAppointmentController };