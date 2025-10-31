import { CreateWorkingDayController } from "../../Controllers/WorkingDayCRUDControllers/CreateWorkingDayController.js";

class CreateWorkingDayWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new CreateWorkingDayController(this);
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

            .activity-div
            {
                padding-bottom: 20px;
                font-size:20px;
                font-weight: 700;
            }

            .label-activity
            {
                padding-bottom: 20px;
            }

            .input-activity
            {
                border-radius:20px;
            }

            .start-div
            {
                padding-bottom: 20px;
                font-size:20px;
                font-weight: 700;
            }

            .label-start
            {
                padding-bottom: 20px;
            }

            .input-start
            {
                border-radius:20px;
            }
                
            .end-div
            {
                padding-bottom: 20px;
                font-size:20px;
                font-weight: 700;
            }

            .label-end
            {
                padding-bottom: 20px;
            }

            .input-end
            {
                border-radius:20px;
            }
            .save-button
            {
                width: 20%;
                margin-bottom: 10px;
                border-radius:20px;
            }

            .cancel-button
            {
                width: 20%;
                border-radius:20px;
            }
            
        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.titleMain = document.createElement('h2');
        this.titleMain.textContent = 'Añadir Dias Laborables';
        this.titleMain.className ='title-main';

        this.divActivity = document.createElement('div');
        this.divActivity.className= 'activity-div';

        this.labelActivity = document.createElement('label');
        this.labelActivity.className= 'label-activity';
        this.labelActivity.textContent ='ID de la Actividad:';

        this.inputActivity = document.createElement('input');
        this.inputActivity.className= 'input-activity';
        this.inputActivity.placeholder ='Ingrese el id de la actividad';


        this.divStart = document.createElement('div');
        this.divStart.className= 'start-div';

        this.labelStart = document.createElement('label');
        this.labelStart.className= 'label-start';
        this.labelStart.textContent ='Inicio:';

        this.inputStart = document.createElement('input');
        this.inputStart.className= 'input-start';
        this.inputStart.placeholder ='Ingrese el horario de inicio';

        this.divEnd = document.createElement('div');
        this.divEnd.className= 'end-div';

        this.labelEnd = document.createElement('label');
        this.labelEnd.className= 'label-end';
        this.labelEnd.textContent ='Finalizacion:';

        this.inputEnd = document.createElement('input');
        this.inputEnd.className= 'input-end';
        this.inputEnd.placeholder ='Ingrese el horario de finzalizacion';

        this.divType = document.createElement('div');
        this.divType.className = 'type-div';
        
        this.labelType = document.createElement('label');
        this.labelType.className = 'label-type';
        this.labelType.textContent = 'Seleccionar Dias:';

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
        this.typeLabelOption02.textContent = 'Miercoles';

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
        this.typeLabelOption05.textContent = 'Sabado';

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

        this.saveButton = document.createElement('button');
        this.saveButton.className= 'save-button';
        this.saveButton.textContent ='Guardar';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className= 'cancel-button';
        this.cancelButton.textContent ='Cancelar';

        this.divActivity.appendChild(this.labelActivity);
        this.divActivity.appendChild(this.inputActivity);

        this.divStart.appendChild(this.labelStart);
        this.divStart.appendChild(this.inputStart);

        this.divEnd.appendChild(this.labelEnd);
        this.divEnd.appendChild(this.inputEnd);

        this.typeContainer00.appendChild(this.typeLabelOption00);
        this.typeContainer00.appendChild(this.typeInputOption00);

        this.typeContainer01.appendChild(this.typeLabelOption01);
        this.typeContainer01.appendChild(this.typeInputOption01);

        this.typeContainer02.appendChild(this.typeLabelOption02);
        this.typeContainer02.appendChild(this.typeInputOption02);

        this.typeContainer03.appendChild(this.typeLabelOption03);
        this.typeContainer03.appendChild(this.typeInputOption03);

        this.typeContainer04.appendChild(this.typeLabelOption04);
        this.typeContainer04.appendChild(this.typeInputOption04);

        this.typeContainer05.appendChild(this.typeLabelOption05);
        this.typeContainer05.appendChild(this.typeInputOption05);

        this.typeContainer06.appendChild(this.typeLabelOption06);
        this.typeContainer06.appendChild(this.typeInputOption06);

        this.divTypeOptions.appendChild(this.typeContainer00);
        this.divTypeOptions.appendChild(this.typeContainer01);
        this.divTypeOptions.appendChild(this.typeContainer02);
        this.divTypeOptions.appendChild(this.typeContainer03);
        this.divTypeOptions.appendChild(this.typeContainer04);
        this.divTypeOptions.appendChild(this.typeContainer05);
        this.divTypeOptions.appendChild(this.typeContainer06);

        this.divType.appendChild(this.divTypeOptions);

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.divActivity);
        shadow.appendChild(this.divStart);
        shadow.appendChild(this.divEnd);
        shadow.appendChild(this.divType);
        shadow.appendChild(this.saveButton);
        shadow.appendChild(this.cancelButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        this.saveButton.onclick = this.controller.onSaveButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
        this.typeInputOption00.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption01.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption02.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption03.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption04.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption05.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption06.onclick = this.controller.onHandleTypeChange.bind(this.controller);
    }
}

customElements.define('r-create-working-day', CreateWorkingDayWC);
export{CreateWorkingDayWC}