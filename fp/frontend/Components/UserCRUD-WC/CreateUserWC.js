import { CreateUserController } from "../../Controllers/UserCRUDControllers/CreateUserController.js";

class CreateUserWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new CreateUserController(this);
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

            .user-div
            {
                padding-bottom: 20px;
                font-size:20px;
                font-weight: 700;
            }

            .label-user
            {
                padding-bottom: 20px;
            }

            .input-user
            {
                border-radius:20px;
            }
                
            .password-div
            {
                padding-bottom: 20px;
                font-size:20px;
                font-weight: 700;
            }

            .label-password
            {
                padding-bottom: 20px;
            }

            .input-password
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
        this.titleMain.textContent = 'Añadir Usuario';
        this.titleMain.className ='title-main';

        this.divUser = document.createElement('div');
        this.divUser.className= 'user-div';

        this.labelUser = document.createElement('label');
        this.labelUser.className= 'label-user';
        this.labelUser.textContent ='Usuario:';

        this.inputUser = document.createElement('input');
        this.inputUser.className= 'input-user';
        this.inputUser.placeholder ='Ingrese el nombre de usuario';

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
        this.typeInputOption01.id = 'RECEPCIONIST';
        this.typeInputOption01.value = 'RECEPCIONIST';

        this.saveButton = document.createElement('button');
        this.saveButton.className= 'save-button';
        this.saveButton.textContent ='Guardar';

        this.cancelButton = document.createElement('button');
        this.cancelButton.className= 'cancel-button';
        this.cancelButton.textContent ='Cancelar';

        this.divUser.appendChild(this.labelUser);
        this.divUser.appendChild(this.inputUser);

        this.divPassword.appendChild(this.labelPassword);
        this.divPassword.appendChild(this.inputPassword);

        this.typeContainer00.appendChild(this.typeLabelOption00);
        this.typeContainer00.appendChild(this.typeInputOption00);

        this.typeContainer01.appendChild(this.typeLabelOption01);
        this.typeContainer01.appendChild(this.typeInputOption01);

        this.divTypeOptions.appendChild(this.typeContainer00);
        this.divTypeOptions.appendChild(this.typeContainer01);

        this.divType.appendChild(this.divTypeOptions);

        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.divUser);
        shadow.appendChild(this.divPassword);
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
    }
}

customElements.define('r-create', CreateUserWC);
export{CreateUserWC}