
class CreateRecepcionistWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});

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
        this.titleMain.textContent = 'Añadir Empleado';
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

        this.saveButton = document.createElement('button');
        this.saveButton.className= 'save-button';
        this.saveButton.textContent ='Guardar';

        this.CancelButton = document.createElement('button');
        this.CancelButton.className= 'cancel-button';
        this.CancelButton.textContent ='Cancelar';

        this.divUser.appendChild(this.labelUser);
        this.divUser.appendChild(this.inputUser);

        this.divPassword.appendChild(this.labelPassword);
        this.divPassword.appendChild(this.inputPassword);
        
        shadow.appendChild(this.titleMain);
        shadow.appendChild(this.divUser);
        shadow.appendChild(this.divPassword);
        shadow.appendChild(this.saveButton);
        shadow.appendChild(this.CancelButton);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        
    }
}

customElements.define('r-create', CreateRecepcionistWC);
export{CreateRecepcionistWC}