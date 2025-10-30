import { CreateUserWC } from "../Components/UserCRUD-WC/CreateUserWC.js";
import{DeleteUserWC} from "../Components/UserCRUD-WC/DeleteUserWC.js"
import{SearchUserWC} from "../Components/UserCRUD-WC/SearchUserWC.js"
import { ModifyUserWC } from "../Components/UserCRUD-WC/ModifyUserWC.js";

class UserListController
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

    onAddUser(event)
    {

        {
            this.clearDivDisplayer();
            let create = new CreateUserWC();
            create.setAttribute('current-username', this.dashboardInstance.currentUsername);
            create.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(create);
            this.currentDivDisplayer = create;
        }
    }

    onDeleteUser(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let deleteInstance = new DeleteUserWC();
            deleteInstance.setAttribute('current-username', this.dashboardInstance.currentUsername);
            deleteInstance.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(deleteInstance);
            this.currentDivDisplayer = deleteInstance;
        }
    }

    onModifyUser(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let modify = new ModifyUserWC();
            modify.setAttribute('current-username', this.dashboardInstance.currentUsername);
            modify.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);
            
            this.divDisplayer.appendChild(modify);
            this.currentDivDisplayer = modify;
        }
    }

    onSearchUser(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let search = new SearchUserWC();
            
            search.setAttribute('current-username', this.dashboardInstance.currentUsername);
            search.setAttribute('current-userpassword', this.dashboardInstance.currentPassword);

            this.divDisplayer.appendChild(search);
            this.currentDivDisplayer = search;
        }
    }

    onListUsers(event)
    {
        if(event)
        {
            this.clearDivDisplayer();
            let create = new CreateUserWC();
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

export{UserListController}