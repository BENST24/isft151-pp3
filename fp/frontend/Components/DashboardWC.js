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
                background-color: rgba(177, 180, 216, 1)
            }
        `;
        
        shadow.appendChild(style);
    }
}

customElements.define('x-dashboard', DashboardWC);

export{DashboardWC}