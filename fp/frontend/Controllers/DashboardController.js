
class DashboardController
{
    constructor(dashboardInstance, apiInstance)
    {
        this.dashboardInstance = dashboardInstance;
        this.apiInstance = apiInstance;
        this.currentLeftNav = null;

        this.onManageUser = this.onManageUser.bind(this);
        this.onManageActivities = this.onManageActivities.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    init()
    {
        
    }
    
    release()
    {
        this.dashboardInstance = null;
        this.apiInstance = null;
        this.currentLeftNav = null;
    }

    run()
    {

    }
    
    stop()
    {

    }

    onLogoutClick(event)
    {
        this.apiInstance.logout();
    }

    onManageUser(event)
    {
        if(event)
        {
            this.clearLeftNav();

            this.dashboardInstance.uUserList.style.display = 'block';
            this.dashboardInstance.uActivityList.style.display = 'none';

            this.currentLeftNav = this.dashboardInstance.uUserList;
        }
    }

    onManageActivities(event)
    {
        if(event)
        {
            this.clearLeftNav();

            this.dashboardInstance.uUserList.style.display = 'none';
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