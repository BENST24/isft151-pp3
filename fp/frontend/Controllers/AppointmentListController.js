import { CreateAppointmentWC } from "../Components/AppointmentCRUD-WC/CreateAppointmentWC.js";
import{CancelAppointmentWC} from "../Components/AppointmentCRUD-WC/CancelAppointmentWC.js"
import{SearchAppointmentWC} from "../Components/AppointmentCRUD-WC/SearchAppointmentWC.js"
import { ModifyAppointmentWC } from "../Components/AppointmentCRUD-WC/ModifyAppointmentWC.js";
import { ListAppointmentsWC } from "../Components/AppointmentCRUD-WC/ListAppointmentsWC.js";
import { RescheduleAppointmentWC } from "../Components/AppointmentCRUD-WC/RescheduleAppointmentWC.js";

class AppointmentListController
{
    constructor(_dashboardInstance,_divDisplayer)
    {
        this.dashboardInstance = _dashboardInstance;
        this.divDisplayer = _divDisplayer;
        this.currentDivDisplayer = null;
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

    onAddAppointment(event)
    {

        {
            this.clearDivDisplayer();
            let create = new CreateAppointmentWC();
            create.setAttribute('current-username', this.dashboardInstance.currentUsername);
            create.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    onCancelAppointment(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let cancelInstance = new CancelAppointmentWC();
            cancelInstance.setAttribute('current-username', this.dashboardInstance.currentUsername);
            cancelInstance.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(cancelInstance);
            this.currentDivDisplayer = cancelInstance;
        }
    }

    onModifyAppointment(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let modify = new ModifyAppointmentWC();
            modify.setAttribute('current-username', this.dashboardInstance.currentUsername);
            modify.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(modify);
            this.currentDivDisplayer = modify;
        }
    }

    onSearchAppointment(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let search = new SearchAppointmentWC();
            
            search.setAttribute('current-username', this.dashboardInstance.currentUsername);
            search.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(search);
            this.currentDivDisplayer = search;
        }
    }

    onListAppointments(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let list = new ListAppointmentsWC();
            
            list.setAttribute('current-username', this.dashboardInstance.currentUsername);
            list.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(list);
            this.currentDivDisplayer = list;
        }
    }

    onRescheduleAppointments(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let list = new RescheduleAppointmentWC();
            
            list.setAttribute('current-username', this.dashboardInstance.currentUsername);
            list.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(list);
            this.currentDivDisplayer = list;
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

export{AppointmentListController}