import { ActivityListWC } from "../Components/ActivityListWC .js";
import { RecepcionistListWC } from "../Components/RecepcionistListWC.js";
class DashboardController
{
    constructor(_dashboardInstance)
    {
        this.dashboardInstance = _dashboardInstance;
        this.currenLeftNav = null;
    }

    init()
    {
    }
    
    release()
    {
        this.dashboardInstance = null;
        this.currenLeftNav = null;
    }

    run()
    {

    }
    
    stop()
    {

    }

    onManageRecepcionist(event)
    {
        if(event)
        {
            this.clearLeftNav();

            let recepcionist = new RecepcionistListWC(this.dashboardInstance.divDisplayer);
            this.dashboardInstance.leftNav.appendChild(recepcionist);
            this.currenLeftNav = recepcionist;
        }
    }

    onManageActivities(event)
    {
        if(event)
        {
            this.clearLeftNav();

            let activity = new ActivityListWC();
            this.dashboardInstance.leftNav.appendChild(activity);
            this.currenLeftNav = activity;
        }
    }

    clearLeftNav()
    {
        while(this.dashboardInstance.leftNav.firstChild){
            this.dashboardInstance.leftNav.removeChild(this.dashboardInstance.leftNav.firstChild);
        }
        this.currenLeftNav = null;
    }
}

export{DashboardController}