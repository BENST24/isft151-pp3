import { ListAppointmentsWC } from "../../Components/AppointmentCRUD-WC/ListAppointmentsWC.js";

class ListAppointmentsController {
    constructor(view) {
        this.view = view;
    }

    onListFutureClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');

        this.view.table.controller.listFutureAppointments(currentUsername, currentUserPassword)
            .then(function(data) {
                console.log("Listado de citas futuras completado:", data);
            })
            .catch(function(error) {
                console.error("Error al listar citas futuras:", error);
            });
    }

    onListAllClick() {
        const currentUsername = this.view.getAttribute('current-username');
        const currentUserPassword = this.view.getAttribute('current-userpassword');

        this.view.table.controller.listAllAppointments(currentUsername, currentUserPassword)
            .then(function(data) {
                console.log("Listado de todas las citas completado:", data);
            })
            .catch(function(error) {
                console.error("Error al listar todas las citas:", error);
            });
    }

    onClearButtonClick() {
        this.view.table.clear();
    }
}

export { ListAppointmentsController };
