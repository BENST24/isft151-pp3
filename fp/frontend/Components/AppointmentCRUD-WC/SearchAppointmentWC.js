import { SearchAppointmentController } from "../../Controllers/AppointmentCRUDControllers/SearchAppointmentController.js";
import { AppointmentTableWC } from "../AppointmentTableWC.js";

class SearchAppointmentWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new SearchAppointmentController(this);
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

            .search-options
            {
                display: flex;
                gap: 20px;
                margin: 20px 0;
            }

            .search-option
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

            .search-option.active
            {
                background-color: #007bff;
                color: white;
            }

            .date-div,
            .time-div,
            .single-date-div
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
            .label-single-date
            {
                padding-bottom: 10px;
                margin-bottom: 5px;
            }

            .input-date,
            .input-time,
            .input-single-date
            {
                border-radius: 20px;
                padding: 8px 12px;
                border: 1px solid #ccc;
                font-size: 16px;
                text-align: center;
                width: 200px;
            }

            .search-button,
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
            }

            .search-button
            {
                background-color: #007bff;
                color: white;
            }

            .search-button:hover {
                background-color: #0056b3;
            }

            .clear-button
            {
                background-color: #6c757d;
                color: white;
            }

            .clear-button:hover {
                background-color: #545b62;
            }

            .hidden {
                display: none;
            }
        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.titleMain = document.createElement('h2');
        this.titleMain.textContent = 'Buscar Turno';
        this.titleMain.className ='title-main';

        // Opciones de búsqueda
        this.searchOptions = document.createElement('div');
        this.searchOptions.className = 'search-options';

        this.optionDateTime = document.createElement('button');
        this.optionDateTime.className = 'search-option active';
        this.optionDateTime.textContent = 'Por Fecha y Hora';
        this.optionDateTime.dataset.type = 'datetime';

        this.optionDate = document.createElement('button');
        this.optionDate.className = 'search-option';
        this.optionDate.textContent = 'Por Fecha';
        this.optionDate.dataset.type = 'date';

        this.searchOptions.appendChild(this.optionDateTime);
        this.searchOptions.appendChild(this.optionDate);

        // Formulario de búsqueda por fecha y hora
        this.datetimeForm = document.createElement('div');

        this.dateRow = document.createElement('div');
        this.dateRow.className = 'date-div';
        
        this.labelDate = document.createElement('label');
        this.labelDate.className = 'label-date';
        this.labelDate.textContent ='Fecha:';
        
        this.inputDate = document.createElement('input');
        this.inputDate.className = 'input-date';
        this.inputDate.type = 'date';
        
        this.dateRow.appendChild(this.labelDate);
        this.dateRow.appendChild(this.inputDate);

        this.timeRow = document.createElement('div');
        this.timeRow.className = 'time-div';
        
        this.labelTime = document.createElement('label');
        this.labelTime.className = 'label-time';
        this.labelTime.textContent ='Hora:';
        
        this.inputTime = document.createElement('input');
        this.inputTime.className = 'input-time';
        this.inputTime.type = 'time';
        this.inputTime.step = '300';
        
        this.timeRow.appendChild(this.labelTime);
        this.timeRow.appendChild(this.inputTime);

        this.datetimeForm.appendChild(this.dateRow);
        this.datetimeForm.appendChild(this.timeRow);

        // Formulario de búsqueda por fecha
        this.dateForm = document.createElement('div');
        this.dateForm.className = 'hidden';

        this.singleDateRow = document.createElement('div');
        this.singleDateRow.className = 'single-date-div';
        
        this.labelSingleDate = document.createElement('label');
        this.labelSingleDate.className = 'label-single-date';
        this.labelSingleDate.textContent ='Fecha:';
        
        this.inputSingleDate = document.createElement('input');
        this.inputSingleDate.className = 'input-single-date';
        this.inputSingleDate.type = 'date';
        
        this.singleDateRow.appendChild(this.labelSingleDate);
        this.singleDateRow.appendChild(this.inputSingleDate);

        this.dateForm.appendChild(this.singleDateRow);

        // Botones de acción
        this.searchButton = document.createElement('button');
        this.searchButton.className = 'search-button';
        this.searchButton.textContent = 'Buscar';

        this.clearButton = document.createElement('button');
        this.clearButton.className = 'clear-button';
        this.clearButton.textContent = 'Limpiar';

        // Tabla para mostrar resultados
        this.table = new AppointmentTableWC();

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.searchOptions);
        shadow.appendChild(this.datetimeForm);
        shadow.appendChild(this.dateForm);
        shadow.appendChild(this.searchButton);
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

        this.optionDateTime.onclick = this.controller.onOptionChange.bind(this.controller);
        this.optionDate.onclick = this.controller.onOptionChange.bind(this.controller);
        this.searchButton.onclick = this.controller.onSearchButtonClick.bind(this.controller);
        this.clearButton.onclick = this.controller.onClearButtonClick.bind(this.controller);
    }

    showDateTimeForm() {
        this.datetimeForm.classList.remove('hidden');
        this.dateForm.classList.add('hidden');
        this.optionDateTime.classList.add('active');
        this.optionDate.classList.remove('active');
    }

    showDateForm() {
        this.datetimeForm.classList.add('hidden');
        this.dateForm.classList.remove('hidden');
        this.optionDateTime.classList.remove('active');
        this.optionDate.classList.add('active');
    }
}

customElements.define('r-search-appointment', SearchAppointmentWC);
export{ SearchAppointmentWC };