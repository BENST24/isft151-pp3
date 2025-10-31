import { ModifyAppointmentController } from "../../Controllers/AppointmentCRUDControllers/ModifyAppointmentController.js";
import { AppointmentTableWC } from "../AppointmentTableWC.js";

class ModifyAppointmentWC extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new ModifyAppointmentController(this);
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

            .search-section, .modify-section {
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

            .search-button, .modify-button, .cancel-button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin: 10px;
            }

            .search-button, .modify-button {
                background-color: #007bff;
                color: white;
            }

            .search-button:hover, .modify-button:hover {
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
        this.titleMain.textContent = 'Modificar Datos del Cliente';
        this.titleMain.className = 'title-main';

        // Sección de búsqueda
        this.searchSection = document.createElement('div');
        this.searchSection.className = 'search-section';

        // Fecha
        this.dateRow = document.createElement('div');
        this.dateRow.className = 'form-row';
        
        this.labelDate = document.createElement('label');
        this.labelDate.className = 'form-label';
        this.labelDate.textContent = 'Fecha del Turno:';
        
        this.inputDate = document.createElement('input');
        this.inputDate.className = 'form-input';
        this.inputDate.type = 'date';
        
        this.dateRow.appendChild(this.labelDate);
        this.dateRow.appendChild(this.inputDate);

        // Hora
        this.timeRow = document.createElement('div');
        this.timeRow.className = 'form-row';
        
        this.labelTime = document.createElement('label');
        this.labelTime.className = 'form-label';
        this.labelTime.textContent = 'Hora del Turno:';
        
        this.inputTime = document.createElement('input');
        this.inputTime.className = 'form-input';
        this.inputTime.type = 'time';
        this.inputTime.step = '300';
        
        this.timeRow.appendChild(this.labelTime);
        this.timeRow.appendChild(this.inputTime);

        this.searchButton = document.createElement('button');
        this.searchButton.className = 'search-button';
        this.searchButton.textContent = 'Buscar Turno';

        this.searchSection.appendChild(this.dateRow);
        this.searchSection.appendChild(this.timeRow);
        this.searchSection.appendChild(this.searchButton);

        // Tabla
        this.table = new AppointmentTableWC();

        // Sección de modificación
        this.modifySection = document.createElement('div');
        this.modifySection.className = 'modify-section hidden';

        // Nuevo Nombre
        this.nameRow = document.createElement('div');
        this.nameRow.className = 'form-row';
        
        this.labelName = document.createElement('label');
        this.labelName.className = 'form-label';
        this.labelName.textContent = 'Nuevo Nombre:';
        
        this.inputName = document.createElement('input');
        this.inputName.className = 'form-input';
        this.inputName.placeholder = 'Ingrese el nuevo nombre';
        
        this.nameRow.appendChild(this.labelName);
        this.nameRow.appendChild(this.inputName);

        // Nuevo Apellido
        this.surnameRow = document.createElement('div');
        this.surnameRow.className = 'form-row';
        
        this.labelSurname = document.createElement('label');
        this.labelSurname.className = 'form-label';
        this.labelSurname.textContent = 'Nuevo Apellido:';
        
        this.inputSurname = document.createElement('input');
        this.inputSurname.className = 'form-input';
        this.inputSurname.placeholder = 'Ingrese el nuevo apellido';
        
        this.surnameRow.appendChild(this.labelSurname);
        this.surnameRow.appendChild(this.inputSurname);

        // Nuevo DNI
        this.dniRow = document.createElement('div');
        this.dniRow.className = 'form-row';
        
        this.labelDni = document.createElement('label');
        this.labelDni.className = 'form-label';
        this.labelDni.textContent = 'Nuevo DNI:';
        
        this.inputDni = document.createElement('input');
        this.inputDni.className = 'form-input';
        this.inputDni.type = 'number';
        this.inputDni.placeholder = 'Ingrese el nuevo DNI';
        
        this.dniRow.appendChild(this.labelDni);
        this.dniRow.appendChild(this.inputDni);

        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.className = 'buttons-container';

        this.modifyButton = document.createElement('button');
        this.modifyButton.className = 'modify-button';
        this.modifyButton.textContent = 'Modificar Datos';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className = 'cancel-button';
        this.cancelButton.textContent = 'Cancelar';

        this.buttonsContainer.appendChild(this.modifyButton);
        this.buttonsContainer.appendChild(this.cancelButton);

        this.modifySection.appendChild(this.nameRow);
        this.modifySection.appendChild(this.surnameRow);
        this.modifySection.appendChild(this.dniRow);
        this.modifySection.appendChild(this.buttonsContainer);

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.searchSection);
        shadow.appendChild(this.table);
        shadow.appendChild(this.modifySection);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const currentUsername = this.getAttribute('current-username');
        const currentUserPassword = this.getAttribute('current-userpassword');
        if (currentUsername && currentUserPassword) {
            this.table.setAttribute('current-username', currentUsername);
            this.table.setAttribute('current-userpassword', currentUserPassword);
        }

        this.searchButton.onclick = this.controller.onSearchButtonClick.bind(this.controller);
        this.modifyButton.onclick = this.controller.onModifyButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
    }

    showModifySection() {
        this.modifySection.classList.remove('hidden');
    }

    hideModifySection() {
        this.modifySection.classList.add('hidden');
    }
}

customElements.define('r-modify-appointment', ModifyAppointmentWC);
export { ModifyAppointmentWC };