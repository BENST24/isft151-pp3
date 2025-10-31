import { RescheduleAppointmentController } from "../../Controllers/AppointmentCRUDControllers/RescheduleAppointmentController.js";
import { AppointmentTableWC } from "../AppointmentTableWC.js";

class RescheduleAppointmentWC extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new RescheduleAppointmentController(this);
        const style = document.createElement('style');
        style.textContent = `
            :host {
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
            
            .title-main {
                margin: 20px;
                padding: 0;
                color: rgba(51, 51, 51, 1);
                text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
                font-size: 40px;
                font-weight: 700;
            }

            .search-section, .reschedule-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 80%;
                margin: 20px 0;
            }

            .form-row {
                display: flex;
                flex-direction: column;
                margin: 10px 0;
                width: 100%;
            }

            .form-label {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
                color: #333;
            }

            .form-input {
                padding: 8px 12px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 14px;
            }

            .search-button, .reschedule-button, .cancel-button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin: 10px;
            }

            .search-button, .reschedule-button {
                background-color: #007bff;
                color: white;
            }

            .search-button:hover, .reschedule-button:hover {
                background-color: #0056b3;
            }

            .cancel-button {
                background-color: #6c757d;
                color: white;
            }

            .cancel-button:hover {
                background-color: #545b62;
            }

            .buttons-container {
                display: flex;
                gap: 15px;
                margin: 20px 0;
            }

            .hidden {
                display: none;
            }
        `;

        this.titleMain = document.createElement('h2');
        this.titleMain.textContent = 'Reprogramar Turno';
        this.titleMain.className = 'title-main';

        // Sección de búsqueda
        this.searchSection = document.createElement('div');
        this.searchSection.className = 'search-section';

        // Fecha actual
        this.oldDateRow = document.createElement('div');
        this.oldDateRow.className = 'form-row';
        
        this.labelOldDate = document.createElement('label');
        this.labelOldDate.className = 'form-label';
        this.labelOldDate.textContent = 'Fecha Actual del Turno:';
        
        this.inputOldDate = document.createElement('input');
        this.inputOldDate.className = 'form-input';
        this.inputOldDate.type = 'date';
        
        this.oldDateRow.appendChild(this.labelOldDate);
        this.oldDateRow.appendChild(this.inputOldDate);

        // Hora actual
        this.oldTimeRow = document.createElement('div');
        this.oldTimeRow.className = 'form-row';
        
        this.labelOldTime = document.createElement('label');
        this.labelOldTime.className = 'form-label';
        this.labelOldTime.textContent = 'Hora Actual del Turno:';
        
        this.inputOldTime = document.createElement('input');
        this.inputOldTime.className = 'form-input';
        this.inputOldTime.type = 'time';
        this.inputOldTime.step = '300';
        
        this.oldTimeRow.appendChild(this.labelOldTime);
        this.oldTimeRow.appendChild(this.inputOldTime);

        this.searchButton = document.createElement('button');
        this.searchButton.className = 'search-button';
        this.searchButton.textContent = 'Buscar Turno';

        this.searchSection.appendChild(this.oldDateRow);
        this.searchSection.appendChild(this.oldTimeRow);
        this.searchSection.appendChild(this.searchButton);

        // Tabla
        this.table = new AppointmentTableWC();

        // Sección de reprogramación
        this.rescheduleSection = document.createElement('div');
        this.rescheduleSection.className = 'reschedule-section hidden';

        // Nueva Fecha
        this.newDateRow = document.createElement('div');
        this.newDateRow.className = 'form-row';
        
        this.labelNewDate = document.createElement('label');
        this.labelNewDate.className = 'form-label';
        this.labelNewDate.textContent = 'Nueva Fecha:';
        
        this.inputNewDate = document.createElement('input');
        this.inputNewDate.className = 'form-input';
        this.inputNewDate.type = 'date';
        
        this.newDateRow.appendChild(this.labelNewDate);
        this.newDateRow.appendChild(this.inputNewDate);

        // Nueva Hora
        this.newTimeRow = document.createElement('div');
        this.newTimeRow.className = 'form-row';
        
        this.labelNewTime = document.createElement('label');
        this.labelNewTime.className = 'form-label';
        this.labelNewTime.textContent = 'Nueva Hora:';
        
        this.inputNewTime = document.createElement('input');
        this.inputNewTime.className = 'form-input';
        this.inputNewTime.type = 'time';
        this.inputNewTime.step = '300';
        
        this.newTimeRow.appendChild(this.labelNewTime);
        this.newTimeRow.appendChild(this.inputNewTime);

        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.className = 'buttons-container';

        this.rescheduleButton = document.createElement('button');
        this.rescheduleButton.className = 'reschedule-button';
        this.rescheduleButton.textContent = 'Reprogramar Turno';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className = 'cancel-button';
        this.cancelButton.textContent = 'Cancelar';

        this.buttonsContainer.appendChild(this.rescheduleButton);
        this.buttonsContainer.appendChild(this.cancelButton);

        this.rescheduleSection.appendChild(this.newDateRow);
        this.rescheduleSection.appendChild(this.newTimeRow);
        this.rescheduleSection.appendChild(this.buttonsContainer);

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.searchSection);
        shadow.appendChild(this.table);
        shadow.appendChild(this.rescheduleSection);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const currentUsername = this.getAttribute('current-username');
        const currentUserPassword = this.getAttribute('current-userpassword');
        if (currentUsername && currentUserPassword) {
            this.table.setAttribute('current-username', currentUsername);
            this.table.setAttribute('current-userpassword', currentUserPassword);
        }

        // Establecer fecha mínima como hoy
        const today = new Date().toISOString().split('T')[0];
        this.inputNewDate.min = today;

        this.searchButton.onclick = this.controller.onSearchButtonClick.bind(this.controller);
        this.rescheduleButton.onclick = this.controller.onRescheduleButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
    }

    showRescheduleSection() {
        this.rescheduleSection.classList.remove('hidden');
    }

    hideRescheduleSection() {
        this.rescheduleSection.classList.add('hidden');
    }
}

customElements.define('r-reschedule-appointment', RescheduleAppointmentWC);
export { RescheduleAppointmentWC };