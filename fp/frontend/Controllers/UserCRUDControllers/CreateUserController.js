import { CreateUserWC } from "../../Components/UserCRUD-WC/CreateUserWC.js";

class CreateUserController
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
        fetch('http://localhost:3000/api/user/create',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword:currentUserPassword,
                username: username,
                password: password,
                type: 'user'
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

}

export {CreateUserController}