import { RecepcionistListController } from "../Controllers/RecepcionistListController.js";
class RecepcionistListWC extends HTMLElement
{
    constructor(divDisplayer)
    {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new RecepcionistListController(this, divDisplayer);
        const style = document.createElement('style');
        style.textContent = `
            
            .left-u-list
            {
                margin-top: 100px;
                margin-left: 10px;
                padding-left: 0;
            }

            .left-list
            {
                background-color: rgba(255, 255, 255, 1);
                display: flex;
                flex-direction: column;
                margin: 10px;
                padding: 10px;
                padding-left: 0;
                border-radius: 20px;
            }


            .left-a-list
            {
                color: rgba(77, 130, 165, 1);
                font-size: 20px;
                text-decoration: none;
                text-align: center;
            }

        `;

        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.minHeight = '100vh';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';

        this.uLeftList00 = document.createElement('ul');
        this.uLeftList00.className = 'left-u-list';
        
        this.leftList00 = document.createElement('li');
        this.leftList00.className = 'left-list';
        
        this.aLeftOption00 = document.createElement('a');
        this.aLeftOption00.href='#';
        this.aLeftOption00.textContent = 'Añadir Empleado';
        this.aLeftOption00.className = 'left-a-list';

        this.leftList01 = document.createElement('li');
        this.leftList01.className = 'left-list';
        
        this.aLeftOption01 = document.createElement('a');
        this.aLeftOption01.href='#';
        this.aLeftOption01.textContent = 'Eliminar Empleado';
        this.aLeftOption01.className = 'left-a-list';

        this.leftList02 = document.createElement('li');
        this.leftList02.className = 'left-list';
        
        this.aLeftOption02 = document.createElement('a');
        this.aLeftOption02.href='#';
        this.aLeftOption02.textContent = 'Modificar Empleado';
        this.aLeftOption02.className = 'left-a-list';

        this.leftList03 = document.createElement('li');
        this.leftList03.className = 'left-list';
        
        this.aLeftOption03 = document.createElement('a');
        this.aLeftOption03.href='#';
        this.aLeftOption03.textContent = 'Buscar Empleado';
        this.aLeftOption03.className = 'left-a-list';

        this.leftList04 = document.createElement('li');
        this.leftList04.className = 'left-list';
        
        this.aLeftOption04 = document.createElement('a');
        this.aLeftOption04.href='#';
        this.aLeftOption04.textContent = 'Listar Empleados';
        this.aLeftOption04.className = 'left-a-list';

        this.leftList00.appendChild(this.aLeftOption00);
        this.leftList01.appendChild(this.aLeftOption01);
        this.leftList02.appendChild(this.aLeftOption02);
        this.leftList03.appendChild(this.aLeftOption03);
        this.leftList04.appendChild(this.aLeftOption04);

        this.uLeftList00.appendChild(this.leftList00);
        this.uLeftList00.appendChild(this.leftList01);
        this.uLeftList00.appendChild(this.leftList02);
        this.uLeftList00.appendChild(this.leftList03);
        this.uLeftList00.appendChild(this.leftList04);

        shadow.appendChild(this.uLeftList00);
        shadow.appendChild(style);
    }

    connectedCallback()
    {
        this.leftList00.onclick = this.controller.onAddRecepcionist.bind(this.controller);
        this.leftList01.onclick = this.controller.onDeleteRecepcionist.bind(this.controller);
        this.leftList02.onclick = this.controller.onModifyRecepcionist.bind(this.controller);
        this.leftList03.onclick = this.controller.onSearchRecepcionist.bind(this.controller);
        this.leftList04.onclick = this.controller.onListRecepcionists.bind(this.controller);
    }

    disconnectedCallback()
    {
        this.leftList00.onclick = null;
        this.leftList01.onclick = null;
        this.leftList02.onclick = null;
        this.leftList03.onclick = null;
        this.leftList04.onclick = null;
    }
    
}

customElements.define('u-recepcionist-ul', RecepcionistListWC);

export{RecepcionistListWC}