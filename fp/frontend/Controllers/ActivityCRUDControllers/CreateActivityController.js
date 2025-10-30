    import { CreateActivityWC } from "../../Components/ActivityCRUD-WC/CreateActivityWC.js";

    class CreateActivityController
    {
        constructor(view)
        {
            this.view = view;
        }

        onSaveButtonClick()
        {
            let username = this.view.inputUser.value;
            let password = this.view.inputPassword.value;
            let type = this.selectedType;
            let currentUsername = this.view.getAttribute('current-username');
            let currentUserPassword = this.view.getAttribute('current-userpassword');

    
        }

        onCancelButtonClick()
        {
            this.view.inputUser.value = '';
            this.view.inputPassword.value = '';

            this.view.typeInputOption00.checked = false;
            this.view.typeInputOption01.checked = false;
            this.selectedType = null;
        }
    }

    export {CreateActivityController}