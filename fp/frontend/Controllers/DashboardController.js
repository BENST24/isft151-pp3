import { ActivityListWC } from "../Components/ActivityListWC .js";
import { RecepcionistListWC } from "../Components/RecepcionistListWC.js";
class DashboardController
{
    constructor(_dashboardInstance)
    {
        this.dashboardInstance = _dashboardInstance;
        this.currentLeftNav = null;
    }

    init()
    {
    }
    
    release()
    {
        this.dashboardInstance = null;
        this.currentLeftNav = null;
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

            this.dashboardInstance.uRecepcionistList.style.display = 'block';
            this.dashboardInstance.uActivityList.style.display = 'none';

            this.currentLeftNav = this.dashboardInstance.uRecepcionistList;
        }
    }

    onManageActivities(event)
    {
        if(event)
        {
            this.clearLeftNav();

            this.dashboardInstance.uRecepcionistList.style.display = 'none';
            this.dashboardInstance.uActivityList.style.display = 'block';

            this.currentLeftNav = this.dashboardInstance.uActivityList;
        }
    }

    clearLeftNav()
    {
        this.currentLeftNav = null;
    }
}

export{DashboardController}