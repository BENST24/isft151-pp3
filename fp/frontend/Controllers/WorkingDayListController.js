import { CreateWorkingDayWC } from "../Components/WorkingDayCRUD-WC/CreateWorkingDayWC.js";
import{DeleteWorkingDayWC} from "../Components/WorkingDayCRUD-WC/DeleteWorkingDayWC.js"
import{SearchWorkingDayWC} from "../Components/WorkingDayCRUD-WC/SearchWorkingDayWC.js"
import { ModifyWorkingDayWC } from "../Components/WorkingDayCRUD-WC/ModifyWorkingDayWC.js";
import { ListWorkingDayWC } from "../Components/WorkingDayCRUD-WC/ListWorkingDayWC.js";

class WorkingDayListController
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

    onAddWorkingDay(event)
    {

        {
            this.clearDivDisplayer();
            let create = new CreateWorkingDayWC();
            create.setAttribute('current-username', this.dashboardInstance.currentUsername);
            create.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    onDeleteWorkingDay(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let deleteInstance = new DeleteWorkingDayWC();
            deleteInstance.setAttribute('current-username', this.dashboardInstance.currentUsername);
            deleteInstance.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(deleteInstance);
            this.currentDivDisplayer = deleteInstance;
        }
    }

    onModifyWorkingDay(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let modify = new ModifyWorkingDayWC();
            modify.setAttribute('current-username', this.dashboardInstance.currentUsername);
            modify.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(modify);
            this.currentDivDisplayer = modify;
        }
    }

    onSearchWorkingDay(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let search = new SearchWorkingDayWC();
            
            search.setAttribute('current-username', this.dashboardInstance.currentUsername);
            search.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(search);
            this.currentDivDisplayer = search;
        }
    }

    onListWorkingDays(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let list = new ListWorkingDayWC();
            
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

export{WorkingDayListController}