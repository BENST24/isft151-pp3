import { DeleteUserWC } from "../../Components/UserCRUD-WC/DeleteUserWC.js";

class DeleteUserController
{
    constructor(view)
    {
        this.view = view;
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    onDeleteButtonClick()
    {
        
        let currentUsername = this.view.getAttribute('current-username');
        let currentUserPassword = this.view.getAttribute('current-userpassword');

        const tableController = this.view.table.controller;
        const userData = tableController.fullData;

        if(!userData || userData.length === 0)
        {
            window.alert('Primero debe buscar un usuario para eliminar');
            return;
        }

        const user = userData[0];
        const usernameToDelete = user.name || user.username;

        if(!usernameToDelete){
            window.alert('No se puede indentificar el usuario a eliminar');
            return;
        }

        fetch(`http://localhost:3000/api/user/delete`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                username : usernameToDelete
            })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log("Respuesta de eliminacion", result);
            if(result.status)
            {
                window.alert("Usuario eliminado correctamente");
                this.view.table.clear();
                this.view.table.inputSearch.value = '';
            }else
            {
                window.alert('Error: '+ result.result);
            }
        }.bind(this));   
    }
}

export {DeleteUserController}