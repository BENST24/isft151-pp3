import { ListAppointmentsController } from "../../Controllers/AppointmentCRUDControllers/ListAppointmentsController.js";
import { AppointmentTableWC } from "../AppointmentTableWC.js";

class ListAppointmentsWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new ListAppointmentsController(this);
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

            .list-options
            {
                display: flex;
                gap: 20px;
                margin: 20px 0;
            }

            .list-option
            {
                padding: 10px 20px;
                border: 2px solid #007bff;
                border-radius: 5px;
                background-color: white;
                color: #007bff;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
            }

            .list-option:hover
            {
                background-color: #007bff;
                color: white;
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
        this.titleMain.textContent = 'Listar Turnos';
        this.titleMain.className ='title-main';

        // Opciones de listado
        this.listOptions = document.createElement('div');
        this.listOptions.className = 'list-options';

        this.futureButton = document.createElement('button');
        this.futureButton.className = 'list-option';
        this.futureButton.textContent = 'Turnos Futuros';

        this.allButton = document.createElement('button');
        this.allButton.className = 'list-option';
        this.allButton.textContent = 'Todos los Turnos';

        this.listOptions.appendChild(this.futureButton);
        this.listOptions.appendChild(this.allButton);

        // Botón de limpiar
        this.clearButton = document.createElement('button');
        this.clearButton.className = 'clear-button';
        this.clearButton.textContent = 'Limpiar';

        // Tabla para mostrar resultados
        this.table = new AppointmentTableWC();
        this.table.setMode('list');

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.listOptions);
        shadow.appendChild(this.clearButton);
        shadow.appendChild(this.table);
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

        this.futureButton.onclick = this.controller.onListFutureClick.bind(this.controller);
        this.allButton.onclick = this.controller.onListAllClick.bind(this.controller);
        this.clearButton.onclick = this.controller.onClearButtonClick.bind(this.controller);
    }
}

customElements.define('r-list-appointments', ListAppointmentsWC);
export{ ListAppointmentsWC };