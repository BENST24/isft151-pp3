    import { ModifyUserWC } from "../../Components/UserCRUD-WC/ModifyUserWC.js";

    class ModifyUserController
    {
        constructor(view)
        {
            this.view = view;
            this.selectedType = null;
            this.table = view.table;
            this.originalUsername = null;
        }

        onHandleTypeChange(event)
        {
            if(event.target.checked)
            {
                this.selectedType = event.target.value;
            }
        }

        setUpTableListeners(table)
        {

            this.table = table;
            const controller = this;

            const originalLoadData = this.table.controller.loadData;
            this.table.controller.loadData = function(data){
                originalLoadData.call(this, data);

                if(data && (Array.isArray(data) ? data.length > 0 : data)){
                    const user = Array.isArray(data) ? data[0] : data;
                    controller.autofillForm([user]);
                }
            }.bind(this.table);
        }

        onModifyButtonClick()
        {
            
            let password = this.view.inputPassword.value;
            let type = this.selectedType;
            let currentUsername = this.view.getAttribute('current-username');
            let currentUserPassword = this.view.getAttribute('current-userpassword');

            let targetUsername = null;

            if(this.table.controller.fullData && this.table.controller.fullData.length > 0)
            {
                targetUsername = this.table.controller.fullData[0].name || this.table.controller.fullData[0].username;
            }

            if(!targetUsername)
            {
                window.alert('Debe buscar un usuario primero');
                return;
            }

            let endpoint = '';
            let requestBody ={
                currentUsername: currentUsername,
                currentUserPassword: currentUserPassword,
                username: targetUsername
            };

            if(password&& type){
                endpoint = '/user/modify';
                requestBody.newPassword = password;
                requestBody.newType = type;
            }else if(password){
                endpoint = '/user/modify/password';
                requestBody.newPassword = password;
            }else if(type){
                endpoint = '/user/modify/type';
                requestBody.newType = type;
            }else{
                window.alert('Debe especificar al menos una modificacion(contraseña o rol)');
                return;
            }

            fetch(`http://localhost:3000/api${endpoint}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(function(response){
                return response.json();
            })
            .then(function(result){
                console.log("Respuesta de modificacion", result);
                if(result.status){
                    window.alert("Usuario modificado correctamente");
                    this.onCancelButtonClick();
                    this.view.table.clear();
                }else{
                    window.alert('Error: ' + result.result);
                }
            }.bind(this));
        }

        autofillForm(userData)
        {
            if(userData && userData.length > 0)
            {
                const user = userData[0];

                if(user.type ==='SUPERVISOR')
                {
                    this.view.typeInputOption00.checked = true;
                    this.selectedType = 'SUPERVISOR';
                }else if(user.type === 'RECEPTIONIST'){
                    this.view.typeInputOption01.checked = true;
                    this.selectedType ='RECEPTIONIST';
                }
                this.view.inputPassword.value = '';
            }
        }
        onCancelButtonClick()
        {
            this.view.inputPassword.value = '';

            this.view.typeInputOption00.checked = false;
            this.view.typeInputOption01.checked = false;
            this.selectedType = null;
        }
    }

    export {ModifyUserController}