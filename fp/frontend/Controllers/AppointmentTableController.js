import { AppointmentTableWC } from "../Components/AppointmentTableWC.js";

class AppointmentTableController {
    constructor(view) {
        this.view = view;
        this.loadData = this.loadData.bind(this);
        this.fullData = null;
    }

    loadData(data) {
        this.fullData = data;
        this.view.clearTable();
        
        const dataArray = Array.isArray(data) ? data : [data];

        if (!dataArray || dataArray.length === 0) {
            this.view.showNoDataWithMessage('No hay citas disponibles');
            return;
        }

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        headerRow.className = 'data-table';

        const customHeaders = ['ID', 'Cliente', 'DNI', 'Fecha', 'Hora', 'Actividad', 'Estado'];

        for (let i = 0; i < customHeaders.length; i++) {
            let th = document.createElement('th');
            th.textContent = customHeaders[i];
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        this.view.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for (let j = 0; j < dataArray.length; j++) {
            let appointment = dataArray[j];
            let row = document.createElement('tr');

            let tdId = document.createElement('td');
            tdId.textContent = appointment.id;
            row.appendChild(tdId);

            let tdClient = document.createElement('td');
            tdClient.textContent = appointment.name_client + ' ' + appointment.surname_client;
            row.appendChild(tdClient);

            let tdDni = document.createElement('td');
            tdDni.textContent = appointment.dni;
            row.appendChild(tdDni);

            let tdDate = document.createElement('td');
            tdDate.textContent = appointment.data;
            row.appendChild(tdDate);

            let tdTime = document.createElement('td');
            tdTime.textContent = appointment.hour;
            row.appendChild(tdTime);

            let tdActivity = document.createElement('td');
            tdActivity.textContent = appointment.id_activity;
            row.appendChild(tdActivity);

            let tdState = document.createElement('td');
            tdState.textContent = appointment.state;
            if (appointment.state === 'ACTIVE') {
                tdState.className = 'state-active';
            } else if (appointment.state === 'CANCELED') {
                tdState.className = 'state-canceled';
            }
            row.appendChild(tdState);

            tbody.appendChild(row);
        }

        this.view.table.appendChild(tbody);
    }

    // Método para buscar por fecha y hora
    searchByDateTime(currentUsername, currentUserPassword, date, time) {
        if (!date || !time) {
            window.alert('Debe ingresar fecha y hora');
            return Promise.reject('Missing data');
        }

        return fetch('http://localhost:3000/api/appointment/search/datetime', {
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
            console.log("Respuesta de búsqueda por fecha/hora:", result);
            if (result.status) {
                const data = result.respond ? [result.respond] : result.data || result.result;
                this.loadData(data);
                return data;
            } else {
                window.alert('Error: ' + result.result);
                this.view.clear();
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la búsqueda:', error);
            window.alert('Error al buscar la cita');
            throw error;
        });
    }

    // Método para buscar por fecha
    searchByDate(currentUsername, currentUserPassword, date) {
        if (!date) {
            window.alert('Debe ingresar una fecha');
            return Promise.reject('Missing date');
        }

        return fetch('http://localhost:3000/api/appointment/search/date', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            },
            body: JSON.stringify({
                date: date
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de búsqueda por fecha:", result);
            if (result.status) {
                const data = result.respond || result.data || result.result || [];
                this.loadData(data);
                return data;
            } else {
                window.alert('Error: ' + result.result);
                this.view.clear();
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error en la búsqueda:', error);
            window.alert('Error al buscar las citas');
            throw error;
        });
    }

    // Método para listar citas futuras
    listFutureAppointments(currentUsername, currentUserPassword) {
        return fetch('http://localhost:3000/api/appointment/list/future', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de listar futuras:", result);
            if (result.status) {
                const data = result.respond || result.data || result.result || [];
                this.loadData(data);
                return data;
            } else {
                window.alert('Error: ' + result.result);
                this.view.clear();
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error al listar citas futuras:', error);
            window.alert('Error al listar las citas futuras');
            throw error;
        });
    }

    // Método para listar todas las citas
    listAllAppointments(currentUsername, currentUserPassword) {
        return fetch('http://localhost:3000/api/appointment/list/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            console.log("Respuesta de listar todas:", result);
            if (result.status) {
                const data = result.respond || result.data || result.result || [];
                this.loadData(data);
                return data;
            } else {
                window.alert('Error: ' + result.result);
                this.view.clear();
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error) {
            console.error('Error al listar todas las citas:', error);
            window.alert('Error al listar todas las citas');
            throw error;
        });
    }
}

export { AppointmentTableController };