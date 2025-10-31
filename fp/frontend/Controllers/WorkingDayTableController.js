import { WorkingDayTableWC } from "../Components/WorkingDayTableWC.js";

class WorkingDayTableController
{
    constructor(view)
    {
        this.view = view;
        this.loadData = this.loadData.bind(this);
        this.fullData = null;
        this.selectedDay = null;
    }

    onHandleDayChange(event)
    {
        if(event.target.checked)
        {
            this.selectedDay = event.target.value;
            console.log('Día seleccionado:', this.selectedDay);
            
            // Realizar búsqueda automáticamente al seleccionar un radio button
            this.searchWorkingDayAutomatically();
        }
    }

    // Método para búsqueda automática
    searchWorkingDayAutomatically()
    {
        if(!this.selectedDay)
        {
            return;
        }

        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');

        if(!currentUsername || !currentUserPassword)
        {
            console.warn('Credenciales no disponibles para la búsqueda automática');
            return;
        }

        fetch(`http://localhost:3000/api/workingday/search?day=${encodeURIComponent(this.selectedDay)}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            }
        })
        .then(function(response){return response.json();})
        .then(function(result){
            console.log("Respuesta de búsqueda automática:", result);
            if(result.status){
                const data = result.respond ? [result.respond] : result.data || result.result;
                this.loadData(data);
            }else{
                if(result.result === 'WORKING_DAY_NOT_FOUND') {
                    // Mostrar mensaje específico cuando no se encuentra el día
                    this.view.clearTable();
                    this.showNoDataWithMessage('No se encontró el día laborable seleccionado');
                } else {
                    window.alert('Error: '+ result.result);
                    this.view.clear();
                }
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error en la búsqueda automática:', error);
            window.alert('Error al buscar el día laborable');
        });
    }

    // Método para mostrar mensaje personalizado
    showNoDataWithMessage(message)
    {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;
        cell.textContent = message;
        cell.className = 'data-table';
        cell.style.color = '#000000ff';
        cell.style.textAlign = 'center';
        row.appendChild(cell);
        this.view.table.appendChild(row);
    }

    // Método para buscar un día laboral por día seleccionado (mantener para compatibilidad)
    searchWorkingDay(currentUsername, currentUserPassword)
    {
        if(!this.selectedDay)
        {
            window.alert('Debe seleccionar un día de la semana');
            return Promise.reject('No day selected');
        }

        return fetch(`http://localhost:3000/api/workingday/search?day=${encodeURIComponent(this.selectedDay)}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            }
        })
        .then(function(response){return response.json();})
        .then(function(result){
            console.log("Respuesta de búsqueda:", result);
            if(result.status){
                const data = result.respond ? [result.respond] : result.data || result.result;
                this.loadData(data);
                return data;
            }else{
                window.alert('Error: '+ result.result);
                this.view.clear();
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error en la búsqueda:', error);
            window.alert('Error al buscar el día laborable');
            throw error;
        });
    }

    listAllWorkingDaysAutomatically()
    {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');

        if(!currentUsername || !currentUserPassword)
        {
            console.warn('Credenciales no disponibles para listar días laborales');
            return;
        }

        return fetch(`http://localhost:3000/api/workingday/list`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            }
        })
        .then(function(response){return response.json();})
        .then(function(result){
            console.log("Respuesta de listar todos automáticamente: ", result);
            if(result.status){
                const data = result.respond || result.data || result.result || [];
                this.loadData(data);
                return data;
            }else{
                if(result.result === 'NO_WORKING_DAYS_FOUND') {
                    this.view.clearTable();
                    this.showNoDataWithMessage('No hay días laborables registrados');
                } else {
                    window.alert('Error: ' + result.result);
                    this.view.clear();
                }
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error al listar días laborales automáticamente:', error);
            window.alert('Error al listar los días laborables');
            throw error;
        });
    }

    // También modifica el método existente listAllWorkingDays para mantener compatibilidad
    listAllWorkingDays(currentUsername, currentUserPassword)
    {
        return fetch(`http://localhost:3000/api/workingday/list`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-username': currentUsername,
                'x-password': currentUserPassword
            }
        })
        .then(function(response){return response.json();})
        .then(function(result){
            console.log("Respuesta de listar todos: ", result);
            if(result.status){
                const data = result.respond || result.data || result.result || [];
                this.loadData(data);
                return data;
            }else{
                window.alert('Error: ' + result.result);
                this.view.clear();
                throw new Error(result.result);
            }
        }.bind(this))
        .catch(function(error){
            console.error('Error al listar días laborales:', error);
            window.alert('Error al listar los días laborables');
            throw error;
        });
    }

    loadData(data){
        this.fullData = data;
        this.view.clearTable();
        
        const dataArray = Array.isArray(data) ? data : [data];

        if(!dataArray || dataArray.length === 0){
            this.view.showNoDataWithMessage('No hay días que borrar');
            return;
        }

        let thead = document.createElement('thead');
        let headerRow = document.createElement('tr');
        headerRow.className = 'data-table';

        // Headers para días laborales (según tu backend)
        const customHeaders = ['Día', 'Hora Inicio', 'Hora Fin', 'ID Actividad'];

        for(let i = 0 ; i < customHeaders.length; i++){
            let th = document.createElement('th');
            th.textContent = customHeaders[i];
            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);
        this.view.table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for(let j = 0; j < dataArray.length; j++){
            let workingDay = dataArray[j];
            let row = document.createElement('tr');

            // Mapear nombres de días en español
            const dayNames = {
                'MONDAY': 'Lunes',
                'TUESDAY': 'Martes',
                'WEDNESDAY': 'Miércoles',
                'THURSDAY': 'Jueves',
                'FRIDAY': 'Viernes',
                'SATURDAY': 'Sábado',
                'SUNDAY': 'Domingo'
            };

            let tdDay = document.createElement('td');
            tdDay.textContent = dayNames[workingDay.day] || workingDay.day;
            row.appendChild(tdDay);

            let tdStart = document.createElement('td');
            tdStart.textContent = workingDay.start_hour;
            row.appendChild(tdStart);

            let tdEnd = document.createElement('td');
            tdEnd.textContent = workingDay.end_hour;
            row.appendChild(tdEnd);

            let tdActivity = document.createElement('td');
            tdActivity.textContent = workingDay.id_activity;
            row.appendChild(tdActivity);

            tbody.appendChild(row);
        }

        this.view.table.appendChild(tbody);
    }

    // Método para limpiar la selección de radio buttons
    clearRadioSelection()
    {
        this.view.typeInputOption00.checked = false;
        this.view.typeInputOption01.checked = false;
        this.view.typeInputOption02.checked = false;
        this.view.typeInputOption03.checked = false;
        this.view.typeInputOption04.checked = false;
        this.view.typeInputOption05.checked = false;
        this.view.typeInputOption06.checked = false;
        this.selectedDay = null;
    }

    // Método para obtener el día seleccionado
    getSelectedDay()
    {
        return this.selectedDay;
    }

    // Método para establecer el día seleccionado (útil para pre-seleccionar)
    setSelectedDay(day)
    {
        this.selectedDay = day;
        // También actualizar el radio button correspondiente
        const radioButtons = {
            'MONDAY': this.view.typeInputOption00,
            'TUESDAY': this.view.typeInputOption01,
            'WEDNESDAY': this.view.typeInputOption02,
            'THURSDAY': this.view.typeInputOption03,
            'FRIDAY': this.view.typeInputOption04,
            'SATURDAY': this.view.typeInputOption05,
            'SUNDAY': this.view.typeInputOption06
        };

        if (radioButtons[day]) {
            radioButtons[day].checked = true;
            // Disparar búsqueda automática
            this.searchWorkingDayAutomatically();
        }
    }
}

export{WorkingDayTableController}