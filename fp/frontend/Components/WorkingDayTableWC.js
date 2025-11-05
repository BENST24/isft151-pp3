import { WorkingDayTableController } from "../Controllers/WorkingDayTableController.js";

class WorkingDayTableWC extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new WorkingDayTableController(this);
        const style = document.createElement('style');
        style.textContent = `
            .data-table{
                width: 100%;
                border-collapse: collapse;
                background-color: #ffffffff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow-x: auto;
            }

            .data-table th{
                background-color: #f5f5f5;
                padding: 12px;
                text-align: left;
                font-weight: bold;
                border-bottom: 2px solid #ddd;
                color: #333;
            }

            .data-table td{
                padding: 10px 12px;
                border-bottom: 1px solid #eee;
                color: #212529;
            }
            
            .input-search
            {
                border-radius: 20px;
                padding: 8px 12px;
                border: 1px solid #ccc;
                font-size: 16px;
                text-align: center;
                width: 220px;
            }

            .span-search
            {
                margin: 20px;
                width: 40px;
                height: 40px;
                color: black;
            }

            .search-icon
            {
                width: 40px;
                height: 40px;
                color: black;
            }

            .label-type ,.type-option-name
            {
                padding-bottom: 10px;
                margin-bottom: 5px;
                font-weight: bold;
            }
            
            .hidden
            {
                display: none !important;
            }
        `;

        this.searchSection = document.createElement('div');
        this.searchSection.className = 'search-section';

        this.table = document.createElement('table');
        this.table.className = 'data-table';

        this.divType = document.createElement('div');
        this.divType.className = 'type-div';
        
        this.labelType = document.createElement('label');
        this.labelType.className = 'label-type';
        this.labelType.textContent = 'Seleccionar Día:';

        this.divTypeOptions = document.createElement('div');
        this.divTypeOptions.className = 'type-options-div';

        /*----------------Opcion 1----------------*/ 
        this.typeContainer00 = document.createElement('div');
        this.typeContainer00.className = 'type-container';

        this.typeLabelOption00 = document.createElement('label');
        this.typeLabelOption00.className = 'type-option-name';
        this.typeLabelOption00.textContent = 'Lunes';

        this.typeInputOption00 = document.createElement('input');
        this.typeInputOption00.className = 'type-option-radio';
        this.typeInputOption00.type = 'radio';
        this.typeInputOption00.name = 'workingDay';
        this.typeInputOption00.id = 'MONDAY';
        this.typeInputOption00.value = 'MONDAY';

        /*----------------Opcion 2----------------*/ 
        this.typeContainer01 = document.createElement('div');
        this.typeContainer01.className = 'type-container';
    
        this.typeLabelOption01 = document.createElement('label');
        this.typeLabelOption01.className = 'type-option-name';
        this.typeLabelOption01.textContent = 'Martes';

        this.typeInputOption01 = document.createElement('input');
        this.typeInputOption01.className = 'type-option-radio';
        this.typeInputOption01.type = 'radio';
        this.typeInputOption01.name = 'workingDay';
        this.typeInputOption01.id = 'TUESDAY';
        this.typeInputOption01.value = 'TUESDAY';

        /*----------------Opcion 3----------------*/ 
        this.typeContainer02 = document.createElement('div');
        this.typeContainer02.className = 'type-container';

        this.typeLabelOption02 = document.createElement('label');
        this.typeLabelOption02.className = 'type-option-name';
        this.typeLabelOption02.textContent = 'Miércoles';

        this.typeInputOption02 = document.createElement('input');
        this.typeInputOption02.className = 'type-option-radio';
        this.typeInputOption02.type = 'radio';
        this.typeInputOption02.name = 'workingDay';
        this.typeInputOption02.id = 'WEDNESDAY';
        this.typeInputOption02.value = 'WEDNESDAY';

        /*----------------Opcion 4----------------*/ 
        this.typeContainer03 = document.createElement('div');
        this.typeContainer03.className = 'type-container';

        this.typeLabelOption03 = document.createElement('label');
        this.typeLabelOption03.className = 'type-option-name';
        this.typeLabelOption03.textContent = 'Jueves';

        this.typeInputOption03 = document.createElement('input');
        this.typeInputOption03.className = 'type-option-radio';
        this.typeInputOption03.type = 'radio';
        this.typeInputOption03.name = 'workingDay';
        this.typeInputOption03.id = 'THURSDAY';
        this.typeInputOption03.value = 'THURSDAY';

        /*----------------Opcion 5----------------*/ 
        this.typeContainer04 = document.createElement('div');
        this.typeContainer04.className = 'type-container';

        this.typeLabelOption04 = document.createElement('label');
        this.typeLabelOption04.className = 'type-option-name';
        this.typeLabelOption04.textContent = 'Viernes';

        this.typeInputOption04 = document.createElement('input');
        this.typeInputOption04.className = 'type-option-radio';
        this.typeInputOption04.type = 'radio';
        this.typeInputOption04.name = 'workingDay';
        this.typeInputOption04.id = 'FRIDAY';
        this.typeInputOption04.value = 'FRIDAY';

        /*----------------Opcion 6----------------*/ 
        this.typeContainer05 = document.createElement('div');
        this.typeContainer05.className = 'type-container';

        this.typeLabelOption05 = document.createElement('label');
        this.typeLabelOption05.className = 'type-option-name';
        this.typeLabelOption05.textContent = 'Sábado';

        this.typeInputOption05 = document.createElement('input');
        this.typeInputOption05.className = 'type-option-radio';
        this.typeInputOption05.type = 'radio';
        this.typeInputOption05.name = 'workingDay';
        this.typeInputOption05.id = 'SATURDAY';
        this.typeInputOption05.value = 'SATURDAY';

        /*----------------Opcion 7----------------*/ 
        this.typeContainer06 = document.createElement('div');
        this.typeContainer06.className = 'type-container';

        this.typeLabelOption06 = document.createElement('label');
        this.typeLabelOption06.className = 'type-option-name';
        this.typeLabelOption06.textContent = 'Domingo';

        this.typeInputOption06 = document.createElement('input');
        this.typeInputOption06.className = 'type-option-radio';
        this.typeInputOption06.type = 'radio';
        this.typeInputOption06.name = 'workingDay';
        this.typeInputOption06.id = 'SUNDAY';
        this.typeInputOption06.value = 'SUNDAY';
        

        this.typeContainer00.appendChild(this.typeInputOption00);
        this.typeContainer00.appendChild(this.typeLabelOption00);

        this.typeContainer01.appendChild(this.typeInputOption01);
        this.typeContainer01.appendChild(this.typeLabelOption01);

        this.typeContainer02.appendChild(this.typeInputOption02);
        this.typeContainer02.appendChild(this.typeLabelOption02);

        this.typeContainer03.appendChild(this.typeInputOption03);
        this.typeContainer03.appendChild(this.typeLabelOption03);

        this.typeContainer04.appendChild(this.typeInputOption04);
        this.typeContainer04.appendChild(this.typeLabelOption04);

        this.typeContainer05.appendChild(this.typeInputOption05);
        this.typeContainer05.appendChild(this.typeLabelOption05);

        this.typeContainer06.appendChild(this.typeInputOption06);
        this.typeContainer06.appendChild(this.typeLabelOption06);

        this.divTypeOptions.appendChild(this.typeContainer00);
        this.divTypeOptions.appendChild(this.typeContainer01);
        this.divTypeOptions.appendChild(this.typeContainer02);
        this.divTypeOptions.appendChild(this.typeContainer03);
        this.divTypeOptions.appendChild(this.typeContainer04);
        this.divTypeOptions.appendChild(this.typeContainer05);
        this.divTypeOptions.appendChild(this.typeContainer06);

        this.divType.appendChild(this.labelType);
        this.divType.appendChild(this.divTypeOptions);
        
        this.searchSection.appendChild(this.divType);
        shadow.appendChild(this.searchSection);
        shadow.appendChild(this.table);
        shadow.appendChild(style);

        this.fullData = null;
        this.mode = 'search';
    }

    connectedCallback()
    {
        const mode = this.getAttribute('mode');
        if(mode){
            this.setMode(mode);
        }

        this.typeInputOption00.onclick = this.controller.onHandleDayChange.bind(this.controller);
        this.typeInputOption01.onclick = this.controller.onHandleDayChange.bind(this.controller);
        this.typeInputOption02.onclick = this.controller.onHandleDayChange.bind(this.controller);
        this.typeInputOption03.onclick = this.controller.onHandleDayChange.bind(this.controller);
        this.typeInputOption04.onclick = this.controller.onHandleDayChange.bind(this.controller);
        this.typeInputOption05.onclick = this.controller.onHandleDayChange.bind(this.controller);
        this.typeInputOption06.onclick = this.controller.onHandleDayChange.bind(this.controller);
    }

    setMode(mode)
    {
        this.mode = mode;
        if(mode === 'list'){
            // Ocultar la sección de radio buttons en modo lista
            this.searchSection.classList.add('hidden');
        }else{
            // Mostrar la sección de radio buttons en modo búsqueda
            this.searchSection.classList.remove('hidden');
        }
    }

    clearTable(){
        while(this.table.firstChild){
            this.table.removeChild(this.table.firstChild);
        }
    }


    showNoData(){
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.colSpan = 4;
        cell.textContent = 'No hay datos disponibles';
        cell.className = 'data-table';
        cell.style.color = '#000000ff';
        row.appendChild(cell);
        this.table.appendChild(row);
    }

    showNoDataWithMessage(message){
    const row = document.createElement('tr');
    const cell = document.createElement('td');

    cell.colSpan = 4;
    cell.textContent = message;
    cell.className = 'data-table';
    cell.style.color = '#000000ff';
    cell.style.textAlign = 'center';
    row.appendChild(cell);
    this.table.appendChild(row);
    }

    clear(){
        this.clearTable();
        this.showNoData();
    }

    getMode()
    {
        return this.mode;
    }
}

customElements.define('working-day-table-wc', WorkingDayTableWC);

export{WorkingDayTableWC};