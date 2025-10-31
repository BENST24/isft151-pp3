import { SearchAppointmentWC } from "../../Components/AppointmentCRUD-WC/SearchAppointmentWC.js";

class SearchAppointmentController {
    constructor(view) {
        this.view = view;
        this.searchType = 'datetime'; // Tipo de búsqueda por defecto
    }

    onOptionChange(event) {
        const button = event.target;
        const type = button.dataset.type;
        
        if (type === 'datetime') {
            this.searchType = 'datetime';
            this.view.showDateTimeForm();
        } else if (type === 'date') {
            this.searchType = 'date';
            this.view.showDateForm();
        }
    }

    onSearchButtonClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');

        if (this.searchType === 'datetime') {
            this.searchByDateTime(currentUsername, currentUserPassword);
        } else if (this.searchType === 'date') {
            this.searchByDate(currentUsername, currentUserPassword);
        }
    }

    searchByDateTime(currentUsername, currentUserPassword) {
        const date = this.view.inputDate.value;
        const time = this.view.inputTime.value;

        if (!date || !time) {
            window.alert('Debe ingresar fecha y hora para la búsqueda');
            return;
        }

        this.view.table.controller.searchByDateTime(currentUsername, currentUserPassword, date, time)
            .then(function(data) {
                console.log("Búsqueda por fecha/hora completada:", data);
            })
            .catch(function(error) {
                console.error("Error en búsqueda por fecha/hora:", error);
            });
    }

    searchByDate(currentUsername, currentUserPassword) {
        const date = this.view.inputSingleDate.value;

        if (!date) {
            window.alert('Debe ingresar una fecha para la búsqueda');
            return;
        }

        this.view.table.controller.searchByDate(currentUsername, currentUserPassword, date)
            .then(function(data) {
                console.log("Búsqueda por fecha completada:", data);
            })
            .catch(function(error) {
                console.error("Error en búsqueda por fecha:", error);
            });
    }

    onClearButtonClick() {
        this.view.inputDate.value = '';
        this.view.inputTime.value = '';
        this.view.inputSingleDate.value = '';
        this.view.table.clear();
    }
}

export { SearchAppointmentController };