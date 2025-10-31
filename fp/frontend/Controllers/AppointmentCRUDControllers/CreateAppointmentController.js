import { CreateAppointmentWC } from "../../Components/AppointmentCRUD-WC/CreateAppointmentWC.js";

class CreateAppointmentController {
    constructor(view) {
        this.view = view;
    }

    onCheckAvailabilityClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const idActivity = this.view.inputActivity.value;
        const date = this.view.inputDate.value;

        if (!idActivity || !date) {
            window.alert('Debe ingresar el ID de la actividad y la fecha para verificar disponibilidad');
            return;
        }

        fetch('http://localhost:3000/api/appointment/availability/day', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            },
            body: JSON.stringify({
                idActivity: parseInt(idActivity),
                date: date
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de disponibilidad:", result);
            if (result.status) {
                const availableSlots = result.respond || [];
                if (availableSlots.length > 0) {
                    let message = 'Horarios disponibles para ' + date + ':\n';
                    availableSlots.forEach(function(slot) {
                        message += '• ' + slot.hour + '\n';
                    });
                    window.alert(message);
                } else {
                    window.alert('No hay horarios disponibles para la fecha seleccionada');
                }
            } else {
                window.alert('Error: ' + result.result);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error al verificar disponibilidad:', error);
            window.alert('Error al verificar la disponibilidad');
        });
    }

    onCreateButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');
        const nameClient = this.view.inputName.value;
        const surnameClient = this.view.inputSurname.value;
        const dni = this.view.inputDni.value;
        const data = this.view.inputDate.value;
        const hour = this.view.inputTime.value;
        const idActivity = this.view.inputActivity.value;

        // Validaciones
        if (!nameClient || !surnameClient || !dni || !data || !hour || !idActivity) {
            window.alert('Todos los campos son obligatorios');
            return;
        }

        if (isNaN(dni) || dni <= 0) {
            window.alert('El DNI debe ser un número válido');
            return;
        }

        if (isNaN(idActivity) || idActivity <= 0) {
            window.alert('El ID de actividad debe ser un número válido');
            return;
        }

        const requestBody = {
            currentUsername: currentUsername,
            currentUserPassword: currentUserPassword,
            nameClient: nameClient,
            surnameClient: surnameClient,
            dni: parseInt(dni),
            data: data,
            hour: hour + ':00', // Asegurar formato HH:MM:SS
            idActivity: parseInt(idActivity)
        };

        fetch('http://localhost:3000/api/appointment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de creación:", result);
            if (result.status) {
                window.alert("Cita creada correctamente con ID: " + result.respond.id);
                this.onCancelButtonClick();
            } else {
                let errorMessage = 'Error: ' + result.result;
                if (result.result === 'SLOT_NOT_AVAILABLE') {
                    errorMessage = 'Error: El horario seleccionado no está disponible';
                } else if (result.result === 'ACTIVITY_NOT_FOUND') {
                    errorMessage = 'Error: No se encontró la actividad con el ID proporcionado';
                }
                window.alert(errorMessage);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la creación:', error);
            window.alert('Error al crear la cita');
        });
    }

    onCancelButtonClick() {
        this.view.inputName.value = '';
        this.view.inputSurname.value = '';
        this.view.inputDni.value = '';
        this.view.inputActivity.value = '';
        this.view.inputDate.value = '';
        this.view.inputTime.value = '';
    }
}

export { CreateAppointmentController };