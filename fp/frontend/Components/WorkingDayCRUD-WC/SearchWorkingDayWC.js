import {WorkingDayTableWC} from "../WorkingDayTableWC.js";
class SearchWorkingDayWC extends HTMLElement
{
    constructor()
    {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const style= document.createElement('style');
        style.textContent =`
            :host
            {
                background-color: rgba(233, 231, 231, 0.79);
                min-height: 60vh;
                width: 60%;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 20px;
                box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3);
                
            }
            
            .title-main 
            {
                margin: 20px;
                padding: 0;
                color: rgba(51, 51, 51, 1);
                text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
                font-size: 40px;
                font-weight: 700;
            }
            
            
        `;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.divMainTitle = document.createElement('div');
        this.divMainTitle.className = 'div-title';

        this.mainTitle = document.createElement('h2');
        this.mainTitle.className = 'title-main';
        this.mainTitle.textContent = 'Buscar Actividad';

        this.divMainTitle.appendChild(this.mainTitle);

        this.table = new WorkingDayTableWC();
        
        shadow.appendChild(this.divMainTitle);
        shadow.appendChild(this.table);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        const currentUsername = this.getAttribute('current-username');
        const currentUserPassword = this.getAttribute('current-userpassword');
        if(currentUsername && currentUserPassword)
        {
            this.table.setAttribute('current-username', currentUsername);
            this.table.setAttribute('current-userpassword', currentUserPassword);
        }
    }

    disconnectedCallback()
    {

    }
}

customElements.define('r-search-working-day', SearchWorkingDayWC);
export{SearchWorkingDayWC}