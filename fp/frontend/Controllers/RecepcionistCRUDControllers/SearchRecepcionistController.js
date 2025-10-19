import { CreateRecepcionistWC } from "../../Components/RecepcionistCRUD-WC/CreateRecepcionistWC.js";

class CreateRecepcionistController
{
    constructor(view)
    {
        this.view = view;
    }

    onSaveButtonClick()
    {
        let username = this.view.inputUser.value;
        let password = this.view.inputPassword.value;
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');
        let event = new CustomEvent('createRecepcionist',{
            detail:{
                currentUsername: currentUsername,
                currentUserPassword:currentUserPassword,
                username: username,
                password: password,
                type: 'recepcionist'
            },
        });

        this.view.dispatchEvent(event);
    }

}

export {CreateRecepcionistController}