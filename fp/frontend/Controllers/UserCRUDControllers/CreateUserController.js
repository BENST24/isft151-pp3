    import { CreateUserWC } from "../../Components/UserCRUD-WC/CreateUserWC.js";

    class CreateUserController
    {
        constructor(view)
        {
            this.view = view;
        }

        onHandleTypeChange(event)
        {
            if(event.target.checked)
            {
                this.selectedType = event.target.value;
            }
        }

        onSaveButtonClick()
        {
            let username = this.view.inputUser.value;
            let password = this.view.inputPassword.value;
            let type = this.selectedType;
            let currentUsername = this.view.getAttribute('current-username');
            let currentUserPassword = this.view.getAttribute('current-userpassword');

            console.log('🔍 Datos que se enviarán:', {
                currentUsername,
                currentUserPassword: currentUserPassword ? '***' : 'undefined',
                username,
                password: password ? '***' : 'undefined', 
                type
            });


            if(!username || !password || !type)
            {
                window.alert('Por favor completar todos los campos');
                return;
            }
            fetch('http://localhost:3000/api/user/create',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    currentUsername: currentUsername,
                    currentUserPassword:currentUserPassword,
                    username: username,
                    password: password,
                    type: type,
                })
            })
            .then(function(response){return response.json();})
            .then(function(result){
                console.log("Respuesta del backend:", result);
                if(result.status){
                    window.alert('Empleado creado correctamente');
                }else{
                    window.alert('Error: '+ result.result);
                }
            });
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

    export {CreateUserController}