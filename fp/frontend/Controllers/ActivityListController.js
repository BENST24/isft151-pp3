import { CreateActivityWC } from "../Components/ActivityCRUD-WC/CreateActivityWC.js";
import{DeleteActivityWC} from "../Components/ActivityCRUD-WC/DeleteActivityWC.js"
import{SearchActivityWC} from "../Components/ActivityCRUD-WC/SearchActivityWC.js"
import { ModifyActivityWC } from "../Components/ActivityCRUD-WC/ModifyActivityWC.js";
import { ListActivityWC } from "../Components/ActivityCRUD-WC/ListActivityWC.js";

class ActivityListController
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

    onAddActivity(event)
    {

        {
            this.clearDivDisplayer();
            let create = new CreateActivityWC();
            create.setAttribute('current-username', this.dashboardInstance.currentUsername);
            create.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    onDeleteActivity(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let deleteInstance = new DeleteActivityWC();
            deleteInstance.setAttribute('current-username', this.dashboardInstance.currentUsername);
            deleteInstance.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(deleteInstance);
            this.currentDivDisplayer = deleteInstance;
        }
    }

    onModifyActivity(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let modify = new ModifyActivityWC();
            modify.setAttribute('current-username', this.dashboardInstance.currentUsername);
            modify.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(modify);
            this.currentDivDisplayer = modify;
        }
    }

    onSearchActivity(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let search = new SearchActivityWC();
            
            search.setAttribute('current-username', this.dashboardInstance.currentUsername);
            search.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(search);
            this.currentDivDisplayer = search;
        }
    }

    onListActivities(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let list = new ListActivityWC();
            
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

export{ActivityListController}