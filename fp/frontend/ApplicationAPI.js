class ApplicationAPI extends EventTarget
{

    constructor()
    {
        super();
        this.translation = new Map();
        this.initTranslations();
    }

    initTranslations()
    {
        this.translation.set('USER_AUTHENTICATED','Usuario autenticado correctamente');
        this.translation.set('BLOCKED_USER','Usuario bloqueado');
        this.translation.set('USER_PASSWORD_FAILED','Contraseña incorrecta');
        this.translation.set('USER_NOT_FOUND','Usuario no encontrado');
        this.translation.set('null','Error desconocido');
    }

    async login(username, password)
    {
        try
        {
            const response = await fetch("http://localhost:3000/api/auth/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });

            const result = await response.json();

            this.onAuthenticationRequestResponse(result, username,password);
        }catch(error){
            console.error("Error en la solicitud:", error);
            this.dispatchEvent(new CustomEvent('loginerror',{
                detail: "SERVER_ERROR"
            }));
        }
    }

    onAuthenticationRequestResponse(apiResponse, username,password)
    {
        if(apiResponse.status){
            let successKey = apiResponse.result;
            let successMessage = this.translation.get(successKey) || this.translation.get('null');

            this.dispatchEvent(new CustomEvent('userlogged',{
                detail:{
                    username: username,
                    password: password,
                    type: apiResponse.type,
                    message: successMessage
                }
            }));
        }else{
            let errorKey = apiResponse.result;
            let errorMessage = this.translation.get(errorKey) || this.translation.get('null');

            this.dispatchEvent(new CustomEvent('loginerror', {
                detail: errorMessage
            }));
        }
    }
    
    logout()
    {
        this.dispatchEvent(new CustomEvent('userlogout'));
    }
}

export{ApplicationAPI}