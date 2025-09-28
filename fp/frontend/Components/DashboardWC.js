class DashboardWC extends HTMLElement
{
    constructor()
    {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
            :host
            {
                background-color: rgba(59, 59, 59, 1);
                min-height: 100vh;
                display: block;
                margin: 0;
                padding: 0;
                width: 100%;
            }
        `;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        
        
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        
    }
}

customElements.define('x-dashboard', DashboardWC);

export{DashboardWC}