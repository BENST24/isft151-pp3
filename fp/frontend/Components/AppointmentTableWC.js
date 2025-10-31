import { AppointmentTableController } from "../Controllers/AppointmentTableController.js";

class AppointmentTableWC extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.controller = new AppointmentTableController(this);
        const style = document.createElement('style');
        style.textContent = `
            .data-table {
                width: 100%;
                border-collapse: collapse;
                background-color: #ffffffff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow-x: auto;
            }

            .data-table th {
                background-color: #f5f5f5;
                padding: 12px;
                text-align: left;
                font-weight: bold;
                border-bottom: 2px solid #ddd;
                color: #333;
            }

            .data-table td {
                padding: 10px 12px;
                border-bottom: 1px solid #eee;
                color: #212529;
            }

            .search-section {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 20px;
            }

            .form-row {
                display: flex;
                flex-direction: column;
                margin: 10px 0;
                width: 80%;
            }

            .form-label {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
                color: #333;
            }

            .form-input {
                padding: 8px 12px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 14px;
            }

            .search-button {
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin: 10px 0;
            }

            .search-button:hover {
                background-color: #0056b3;
            }

            .hidden {
                display: none !important;
            }

            .state-active {
                color: #28a745;
                font-weight: bold;
            }

            .state-canceled {
                color: #dc3545;
                font-weight: bold;
            }

            .no-data {
                text-align: center;
                color: #000000ff;
                padding: 20px;
                font-style: italic;
            }
        `;

        this.searchSection = document.createElement('div');
        this.searchSection.className = 'search-section';

        this.table = document.createElement('table');
        this.table.className = 'data-table';

        shadow.appendChild(this.searchSection);
        shadow.appendChild(this.table);
        shadow.appendChild(style);

        this.fullData = null;
        this.mode = 'search';
    }

    connectedCallback() {
        const mode = this.getAttribute('mode');
        if (mode) {
            this.setMode(mode);
        }
    }

    setMode(mode) {
        this.mode = mode;
        if (mode === 'list') {
            this.searchSection.classList.add('hidden');
        } else {
            this.searchSection.classList.remove('hidden');
        }
    }

    clearTable() {
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }
    }

    showNoData() {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 7;
        cell.textContent = 'No hay datos disponibles';
        cell.className = 'data-table no-data';
        row.appendChild(cell);
        this.table.appendChild(row);
    }

    showNoDataWithMessage(message) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 7;
        cell.textContent = message;
        cell.className = 'data-table no-data';
        row.appendChild(cell);
        this.table.appendChild(row);
    }

    clear() {
        this.clearTable();
        this.showNoData();
    }

    getMode() {
        return this.mode;
    }
}

customElements.define('appointment-table-wc', AppointmentTableWC);
export { AppointmentTableWC };