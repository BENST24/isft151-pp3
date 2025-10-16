import { CreateRecepcionistWC } from "../Components/RecepcionistCRUD-WC/CreateRecepcionistWC.js";
import{DeleteRecepcionistWC} from "../Components/RecepcionistCRUD-WC/DeleteRecepcionistWC.js"
import{SearchRecepcionistWC} from "../Components/RecepcionistCRUD-WC/SearchRecepcionistWC.js"
class RecepcionistListController
{
    constructor(_dashboardInstance,_divDisplayer)
    {

         console.log('🔍 RecepcionistListController - Constructor:', {
            dashboardInstance: _dashboardInstance,
            divDisplayer: _divDisplayer,
            tieneDivDisplayer: !!_divDisplayer
        });
        this.dashboardInstance = _dashboardInstance;
        this.divDisplayer = _divDisplayer;
        this.currentDivDisplayer = null;

         console.log('🔍 RecepcionistListController - Después de asignar:', {
            dashboardInstance: this.dashboardInstance,
            divDisplayer: this.divDisplayer
        });
    }

    init()
    {
    }
    
    release()
    {
        this.dashboardInstance = null;
        this.currentDivDisplayer = null;
    }

    run()
    {

    }
    
    stop()
    {

    }

    onAddRecepcionist(event)
    {
         console.log('🔍 onAddRecepcionist - divDisplayer:', this.divDisplayer);
        console.log('🔍 onAddRecepcionist - dashboardInstance:', this.dashboardInstance);
        if(event)
        {
            this.clearDivDisplayer();
            let create = new CreateRecepcionistWC();
            create.setAttribute('current-username', this.dashboardInstance.currentUsername);
            create.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            function CreateRecepcionist(e)
            {
                let data = e.detail;
                console.log("Enviando datos a /api/user/create:", data);
                fetch('http://localhost:3000/api/user/create',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
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
            create.addEventListener('createRecepcionist', CreateRecepcionist);
            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    onDeleteRecepcionist(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let deleteInstance = new DeleteRecepcionistWC();
            this.divDisplayer.appendChild(deleteInstance);
            this.currentDivDisplayer = deleteInstance;
        }
    }

    onModifyRecepcionist(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let create = new CreateRecepcionistWC();
            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    onSearchRecepcionist(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let search = new SearchRecepcionistWC();
            this.divDisplayer.appendChild(search);
            this.currentDivDisplayer = search;
        }
    }

    onListRecepcionists(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let create = new CreateRecepcionistWC();
            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    clearDivDisplayer()
    {
        while(this.divDisplayer.firstChild){
            this.divDisplayer.removeChild(this.divDisplayer.firstChild);
        }
        this.currentDivDisplayer = null;
    }
}

export{RecepcionistListController}