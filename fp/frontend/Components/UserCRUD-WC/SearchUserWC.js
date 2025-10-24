import {TableWC} from "../TableWC.js";
class SearchUserWC extends HTMLElement
{
    constructor()
    {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const style= document.createElement('style');
        style.textContent =`
            :host
            {
                background-color: rgba(180, 202, 102, 1);
                min-height: 100vh;
                width: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
            }
            
            .title-main 
            {
                margin: 0;
                padding: 30px;
                color: rgba(255, 255, 255, 1);
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
        this.mainTitle.textContent = 'Buscar Usuario';

        this.divMainTitle.appendChild(this.mainTitle);

        this.table = new TableWC();
        
        shadow.appendChild(this.divMainTitle);
        shadow.appendChild(this.table);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        
    }

    disconnectedCallback()
    {

    }
}

customElements.define('r-search', SearchUserWC);
export{SearchUserWC}