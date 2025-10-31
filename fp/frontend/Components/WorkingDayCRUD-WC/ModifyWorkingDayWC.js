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
        this.titleMain.textContent = 'Modificar Actividad';
        this.titleMain.className ='title-main';

        this.table = new WorkingDayTableWC();

        this.divActivity = document.createElement('div');
        this.divActivity.className= 'activity-div';

        this.labelActivity = document.createElement('label');
        this.labelActivity.className= 'label-activity';
        this.labelActivity.textContent ='Actividad:';

        this.inputActivity = document.createElement('input');
        this.inputActivity.className= 'input-activity';
        this.inputActivity.placeholder ='Ingrese el nuevo nombre de la actividad';

        this.divDuration = document.createElement('div');
        this.divDuration.className= 'duration-div';

        this.labelDuration = document.createElement('label');
        this.labelDuration.className= 'label-duration';
        this.labelDuration.textContent ='Duracion: ';

        this.inputDuration = document.createElement('input');
        this.inputDuration.className= 'input-duration';
        this.inputDuration.placeholder ='Ingrese la nueva duracion en minutos';
        this.inputDuration.type = 'number';
        this.inputDuration.min = '5';


        this.saveButton = document.createElement('button');
        this.saveButton.className= 'save-button';
        this.saveButton.textContent ='Guardar Modificación';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className= 'cancel-button';
        this.cancelButton.textContent ='Cancelar';

        this.divActivity.appendChild(this.labelActivity);
        this.divActivity.appendChild(this.inputActivity);

        this.divDuration.appendChild(this.labelDuration);
        this.divDuration.appendChild(this.inputDuration);

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.table);
        shadow.appendChild(this.divActivity);
        shadow.appendChild(this.divDuration);
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
    }
}

customElements.define('r-modify-working-day', ModifyWorkingDayWC);
export{ModifyWorkingDayWC}