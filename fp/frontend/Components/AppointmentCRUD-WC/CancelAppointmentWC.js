import { CancelAppointmentController } from "../../Controllers/AppointmentCRUDControllers/CancelAppointmentController.js";
import { AppointmentTableWC } from "../AppointmentTableWC.js";

class CancelAppointmentWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new CancelAppointmentController(this);
        const style = document.createElement('style');
        style.textContent =`
            :host
            {
                background-color: rgba(233, 231, 231, 0.79);
                min-height: 60vh;
                width: 60%;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 20px;
                box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .title-main 
            {
                margin: 20px;
                padding: 0;
                color: rgba(51, 51, 51, 1);
                text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
                font-size: 40px;
                font-weight: 700;
            }

            .date-div,
            .time-div,
            .activity-div
            {
                padding-bottom: 20px;
                font-size: 20px;
                font-weight: 700;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }

            .label-date,
            .label-time,
            .label-activity
            {
                padding-bottom: 10px;
                margin-bottom: 5px;
            }

            .input-date,
            .input-time,
            .input-activity
            {
                border-radius: 20px;
                padding: 8px 12px;
                border: 1px solid #ccc;
                font-size: 16px;
                text-align: center;
                width: 200px;
            }

            .search-button
            {
                width: 200px;
                margin: 10px;
                border-radius: 20px;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                background-color: #007bff;
                color: white;
            }

            .search-button:hover {
                background-color: #0056b3;
            }

            .cancel-button
            {
                width: 200px;
                margin: 10px;
                border-radius: 20px;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                background-color: #dc3545;
                color: white;
            }

            .cancel-button:hover {
                background-color: #c82333;
            }

            .clear-button
            {
                width: 200px;
                margin: 10px;
                border-radius: 20px;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                background-color: #6c757d;
                color: white;
            }

            .clear-button:hover {
                background-color: #545b62;
            }
        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.titleMain = document.createElement('h2');
        this.titleMain.textContent = 'Cancelar Turno';
        this.titleMain.className ='title-main';

        // Div para Fecha
        this.divDate = document.createElement('div');
        this.divDate.className = 'date-div';

        this.labelDate = document.createElement('label');
        this.labelDate.className = 'label-date';
        this.labelDate.textContent ='Fecha del Turno:';

        this.inputDate = document.createElement('input');
        this.inputDate.className = 'input-date';
        this.inputDate.type = 'date';

        this.divDate.appendChild(this.labelDate);
        this.divDate.appendChild(this.inputDate);

        // Div para Hora
        this.divTime = document.createElement('div');
        this.divTime.className = 'time-div';

        this.labelTime = document.createElement('label');
        this.labelTime.className = 'label-time';
        this.labelTime.textContent ='Hora del Turno:';

        this.inputTime = document.createElement('input');
        this.inputTime.className = 'input-time';
        this.inputTime.type = 'time';
        this.inputTime.step = '300';

        this.divTime.appendChild(this.labelTime);
        this.divTime.appendChild(this.inputTime);

        // Div para Actividad
        this.divActivity = document.createElement('div');
        this.divActivity.className = 'activity-div';

        this.labelActivity = document.createElement('label');
        this.labelActivity.className = 'label-activity';
        this.labelActivity.textContent ='ID de la Actividad:';

        this.inputActivity = document.createElement('input');
        this.inputActivity.className = 'input-activity';
        this.inputActivity.placeholder ='Ingrese ID actividad';
        this.inputActivity.type = 'number';
        this.inputActivity.min = '1';

        this.divActivity.appendChild(this.labelActivity);
        this.divActivity.appendChild(this.inputActivity);

        // Botón de búsqueda
        this.searchButton = document.createElement('button');
        this.searchButton.className = 'search-button';
        this.searchButton.textContent = 'Buscar Turno';

        // Tabla para mostrar resultados
        this.table = new AppointmentTableWC();

        // Botones de acción
        this.cancelButton = document.createElement('button');
        this.cancelButton.className = 'cancel-button';
        this.cancelButton.textContent ='Cancelar Turno';

        this.clearButton = document.createElement('button');
        this.clearButton.className = 'clear-button';
        this.clearButton.textContent ='Limpiar';

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.divDate);
        shadow.appendChild(this.divTime);
        shadow.appendChild(this.divActivity);
        shadow.appendChild(this.searchButton);
        shadow.appendChild(this.table);
        shadow.appendChild(this.cancelButton);
        shadow.appendChild(this.clearButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        const currentUsername = this.getAttribute('current-username');
        const currentUserPassword = this.getAttribute('current-userpassword');
        if (currentUsername && currentUserPassword) {
            this.table.setAttribute('current-username', currentUsername);
            this.table.setAttribute('current-userpassword', currentUserPassword);
        }

        this.searchButton.onclick = this.controller.onSearchButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
        this.clearButton.onclick = this.controller.onClearForm.bind(this.controller);
    }
}

customElements.define('r-cancel-appointment', CancelAppointmentWC);
export{ CancelAppointmentWC };