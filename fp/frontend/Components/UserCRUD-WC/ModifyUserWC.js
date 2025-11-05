import { ModifyUserController } from "../../Controllers/UserCRUDControllers/ModifyUserController.js";
import { TableWC } from "../TableWC.js";

class ModifyUserWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new ModifyUserController(this);
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

            .user-div, .password-div
            {
                padding-bottom: 20px;
                font-size: 20px;
                font-weight: 700;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }

            .label-user, .label-password, .type-option-name
            {
                padding-bottom: 10px;
                margin-bottom: 5px;
                font-weight: 700;
            }

            .input-user, .input-password
            {
                border-radius: 20px;
                padding: 8px 12px;
                border: 1px solid #ccc;
                font-size: 16px;
                text-align: center;
                width: 220px;
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
        this.titleMain.textContent = 'Modificar Usuario';
        this.titleMain.className ='title-main';

        this.divPassword = document.createElement('div');
        this.divPassword.className= 'password-div';

        this.labelPassword = document.createElement('label');
        this.labelPassword.className= 'label-password';
        this.labelPassword.textContent ='Contraseña: ';

        this.inputPassword = document.createElement('input');
        this.inputPassword.className= 'input-password';
        this.inputPassword.placeholder ='Ingrese la contraseña';
        this.inputPassword.type = 'password';

        this.divType = document.createElement('div');
        this.divType.className = 'type-div';
        
        this.labelType = document.createElement('label');
        this.labelType.className = 'label-type';
        this.labelType.textContent = 'Seleccionar rol:';

        this.divTypeOptions = document.createElement('div');
        this.divTypeOptions.className = 'type-options-div';

        /*----------------Opcion 1----------------*/ 
        this.typeContainer00 = document.createElement('div');
        this.typeContainer00.className = 'type-container';

        this.typeLabelOption00 = document.createElement('label');
        this.typeLabelOption00.className = 'type-option-name';
        this.typeLabelOption00.textContent = 'Administrador';

        this.typeInputOption00 = document.createElement('input');
        this.typeInputOption00.className = 'type-option-radio';
        this.typeInputOption00.type = 'radio';
        this.typeInputOption00.name = 'userType';
        this.typeInputOption00.id = 'SUPERVISOR';
        this.typeInputOption00.value = 'SUPERVISOR';


        /*----------------Opcion 2----------------*/ 
        this.typeContainer01 = document.createElement('div');
        this.typeContainer01.className = 'type-container';
    
        this.typeLabelOption01 = document.createElement('label');
        this.typeLabelOption01.className = 'type-option-name';
        this.typeLabelOption01.textContent = 'Empleado';

        this.typeInputOption01 = document.createElement('input');
        this.typeInputOption01.className = 'type-option-radio';
        this.typeInputOption01.type = 'radio';
        this.typeInputOption01.name = 'userType';
        this.typeInputOption01.id = 'RECEPTIONIST';
        this.typeInputOption01.value = 'RECEPTIONIST';

        this.modifyButton = document.createElement('button');
        this.modifyButton.className= 'save-button';
        this.modifyButton.textContent ='Guardar Modificacion';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className= 'cancel-button';
        this.cancelButton.textContent ='Cancelar';

        this.divPassword.appendChild(this.labelPassword);
        this.divPassword.appendChild(this.inputPassword);

        this.typeContainer00.appendChild(this.typeLabelOption00);
        this.typeContainer00.appendChild(this.typeInputOption00);

        this.typeContainer01.appendChild(this.typeLabelOption01);
        this.typeContainer01.appendChild(this.typeInputOption01);

        this.divTypeOptions.appendChild(this.typeContainer00);
        this.divTypeOptions.appendChild(this.typeContainer01);

        this.divType.appendChild(this.divTypeOptions);

        this.table = new TableWC();

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.table);
        shadow.appendChild(this.divPassword);
        shadow.appendChild(this.divType);
        shadow.appendChild(this.modifyButton);
        shadow.appendChild(this.cancelButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        this.modifyButton.onclick = this.controller.onModifyButtonClick.bind(this.controller);
        this.cancelButton.onclick = this.controller.onCancelButtonClick.bind(this.controller);
        this.typeInputOption00.onclick = this.controller.onHandleTypeChange.bind(this.controller);
        this.typeInputOption01.onclick = this.controller.onHandleTypeChange.bind(this.controller);

        const currentUsername = this.getAttribute('current-username');
        const currentUserPassword = this.getAttribute('current-userpassword');
        if(currentUsername && currentUserPassword)
        {
            this.table.setAttribute('current-username', currentUsername);
            this.table.setAttribute('current-userpassword', currentUserPassword);
        }

        this.controller.setUpTableListeners(this.table);
    }
}

customElements.define('r-modify', ModifyUserWC);
export{ModifyUserWC}