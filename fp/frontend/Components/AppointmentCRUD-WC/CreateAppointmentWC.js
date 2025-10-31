import { CreateAppointmentController } from "../../Controllers/AppointmentCRUDControllers/CreateAppointmentController.js";

class CreateAppointmentWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new CreateAppointmentController(this);
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

            .name-div,
            .surname-div,
            .dni-div,
            .activity-div,
            .date-div,
            .time-div
            {
                padding-bottom: 20px;
                font-size: 20px;
                font-weight: 700;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }

            .label-name,
            .label-surname,
            .label-dni,
            .label-activity,
            .label-date,
            .label-time
            {
                padding-bottom: 10px;
                margin-bottom: 5px;
            }

            .input-name,
            .input-surname,
            .input-dni,
            .input-activity,
            .input-date,
            .input-time
            {
                border-radius: 20px;
                padding: 8px 12px;
                border: 1px solid #ccc;
                font-size: 16px;
                text-align: center;
                width: 200px;
            }

            .availability-button
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

            .availability-button:hover {
                background-color: #0056b3;
            }

            .save-button
            {
                width: 200px;
                margin: 10px;
                border-radius: 20px;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                background-color: #28a745;
                color: white;
            }

            .save-button:hover {
                background-color: #218838;
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
                background-color: #6c757d;
                color: white;
            }

            .cancel-button:hover {
                background-color: #545b62;
            }
        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.titleMain = document.createElement('h2');
        this.titleMain.textContent = 'Crear Turno';
        this.titleMain.className ='title-main';

        // Div para Nombre
        this.divName = document.createElement('div');
        this.divName.className = 'name-div';

        this.labelName = document.createElement('label');
        this.labelName.className = 'label-name';
        this.labelName.textContent ='Nombre del Cliente:';

        this.inputName = document.createElement('input');
        this.inputName.className = 'input-name';
        this.inputName.placeholder ='Ingrese el nombre';

        this.divName.appendChild(this.labelName);
        this.divName.appendChild(this.inputName);

        // Div para Apellido
        this.divSurname = document.createElement('div');
        this.divSurname.className = 'surname-div';

        this.labelSurname = document.createElement('label');
        this.labelSurname.className = 'label-surname';
        this.labelSurname.textContent ='Apellido del Cliente:';

        this.inputSurname = document.createElement('input');
        this.inputSurname.className = 'input-surname';
        this.inputSurname.placeholder ='Ingrese el apellido';

        this.divSurname.appendChild(this.labelSurname);
        this.divSurname.appendChild(this.inputSurname);

        // Div para DNI
        this.divDni = document.createElement('div');
        this.divDni.className = 'dni-div';

        this.labelDni = document.createElement('label');
        this.labelDni.className = 'label-dni';
        this.labelDni.textContent ='DNI del Cliente:';

        this.inputDni = document.createElement('input');
        this.inputDni.className = 'input-dni';
        this.inputDni.placeholder ='Ingrese el DNI';
        this.inputDni.type = 'number';

        this.divDni.appendChild(this.labelDni);
        this.divDni.appendChild(this.inputDni);

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

        // Div para Fecha
        this.divDate = document.createElement('div');
        this.divDate.className = 'date-div';

        this.labelDate = document.createElement('label');
        this.labelDate.className = 'label-date';
        this.labelDate.textContent ='Fecha:';

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
        this.labelTime.textContent ='Hora:';

        this.inputTime = document.createElement('input');
        this.inputTime.className = 'input-time';
        this.inputTime.type = 'time';
        this.inputTime.step = '300'; // 5 minutos

        this.divTime.appendChild(this.labelTime);
        this.divTime.appendChild(this.inputTime);

        // Botón de disponibilidad
        this.availabilityButton = document.createElement('button');
        this.availabilityButton.className = 'availability-button';
        this.availabilityButton.textContent = 'Verificar Disponibilidad';

        // Botones de acción
        this.saveButton = document.createElement('button');
        this.saveButton.className = 'save-button';
        this.saveButton.textContent ='Crear Cita';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className = 'cancel-button';
        this.cancelButton.textContent ='Cancelar';

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.divName);
        shadow.appendChild(this.divSurname);
        shadow.appendChild(this.divDni);
        shadow.appendChild(this.divActivity);
        shadow.appendChild(this.divDate);
        shadow.appendChild(this.divTime);
        shadow.appendChild(this.availabilityButton);
        shadow.appendChild(this.saveButton);
        shadow.appendChild(this.cancelButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        this.saveButton.onclick = this.controller.onCreateButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
        this.availabilityButton.onclick = this.controller.onCheckAvailabilityClick.bind(this.controller);

        // Establecer fecha mínima como hoy
        const today = new Date().toISOString().split('T')[0];
        this.inputDate.min = today;
    }
}

customElements.define('r-create-appointment', CreateAppointmentWC);
export{CreateAppointmentWC}