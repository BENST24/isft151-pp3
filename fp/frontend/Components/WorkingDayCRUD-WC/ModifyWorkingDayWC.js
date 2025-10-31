import { ModifyWorkingDayController } from "../../Controllers/WorkingDayCRUDControllers/ModifyWorkingDayController.js";
import { WorkingDayTableWC } from "../WorkingDayTableWC.js";

class ModifyWorkingDayWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new ModifyWorkingDayController(this);
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
                
            .duration-div
            {
                padding-bottom: 20px;
                font-size:20px;
                font-weight: 700;
            }

            .label-duration
            {
                padding-bottom: 20px;
            }

            .input-duration
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
        this.titleMain.textContent = 'Modificar Dia Laborable';
        this.titleMain.className ='title-main';

        this.divActivity = document.createElement('div');
        this.divActivity.className= 'activity-div';

        this.labelActivity = document.createElement('label');
        this.labelActivity.className= 'label-activity';
        this.labelActivity.textContent ='ID de la Actividad:';

        this.inputActivity = document.createElement('input');
        this.inputActivity.className= 'input-activity';
        this.inputActivity.placeholder ='Ingrese el ID de la actividad';
        this.inputActivity.type= 'number';
        this.inputActivity.min = '1';

        this.divStart = document.createElement('div');
        this.divStart.className= 'start-div';

        this.labelStart = document.createElement('label');
        this.labelStart.className= 'label-start';
        this.labelStart.textContent ='Inicio:';

        this.inputStart = document.createElement('input');
        this.inputStart.className= 'input-start';
        this.inputStart.placeholder ='HH:MM(ej: 08:00)';
        this.inputStart.pattern ='[0-9]{2}:[0-9]{2}';
        this.inputStart.title ='Formato: HH:MM (24 horas)';
        this.inputStart.maxLength = 5;

        this.divEnd = document.createElement('div');
        this.divEnd.className= 'end-div';

        this.labelEnd = document.createElement('label');
        this.labelEnd.className= 'label-end';
        this.labelEnd.textContent ='Finalizacion:';

        this.inputEnd = document.createElement('input');
        this.inputEnd.className= 'input-end';
        this.inputEnd.placeholder ='HH:MM(ej: 08:00)';
        this.inputEnd.pattern ='[0-9]{2}:[0-9]{2}';
        this.inputEnd.title ='Formato: HH:MM (24 horas)';
        this.inputEnd.maxLength = 5;

        this.table = new WorkingDayTableWC();

        this.saveButton = document.createElement('button');
        this.saveButton.className= 'save-button';
        this.saveButton.textContent ='Guardar Modificación';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className= 'cancel-button';
        this.cancelButton.textContent ='Cancelar';

        this.divActivity.appendChild(this.labelActivity);
        this.divActivity.appendChild(this.inputActivity);

        this.divStart.appendChild(this.labelStart);
        this.divStart.appendChild(this.inputStart);

        this.divEnd.appendChild(this.labelEnd);
        this.divEnd.appendChild(this.inputEnd);

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.table);
        shadow.appendChild(this.divActivity);
        shadow.appendChild(this.divStart);
        shadow.appendChild(this.divEnd);
        shadow.appendChild(this.saveButton);
        shadow.appendChild(this.cancelButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        const currentUsername = this.getAttribute('current-username');
        const currentUserPassword = this.getAttribute('current-userpassword');
        if(currentUsername && currentUserPassword)  
        {
            this.table.setAttribute('current-username', currentUsername);
            this.table.setAttribute('current-userpassword', currentUserPassword);
        }

        this.controller.setUpTableListeners(this.table);
        
        this.saveButton.onclick = this.controller.onModifyButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
        
        var controller = this.controller;
        this.inputStart.addEventListener('input', function(e) {
            controller.autoFormatTime(e.target);
        });

        this.inputEnd.addEventListener('input', function(e) {
            controller.autoFormatTime(e.target);
        });
    }
}

customElements.define('r-modify-working-day', ModifyWorkingDayWC);
export{ModifyWorkingDayWC}