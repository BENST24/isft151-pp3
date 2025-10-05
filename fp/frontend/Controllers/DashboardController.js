import { UpperNavListWC } from "../Components/UpperNavListWC.js";
import { RecepcionistListWC } from "../Components/RecepcionistListWC.js";
class DashboardController
{
    constructor(_dashboardInstance,_upperNavInstance, _leftNavInstance)
    {
        this.dashboardInstance = _dashboardInstance;
        this.upperNavInstance = _upperNavInstance;
        this.leftNavInstance = _leftNavInstance;
    }

    init()
    {
    }
    
    release()
    {
        this.dashboardInstance = null;
        this.upperNavInstance = null;
        this.leftNavInstance = null;
    }

    run()
    {

    }
    
    stop()
    {

    }

    onManageEmployees()
    {

    }

    onManageActivities()
    {

    }
}




export{DashboardController}