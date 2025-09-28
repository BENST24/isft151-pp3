import { LoginWC } from "./Components/LoginWC.js";
import { APIModelAccess } from "../backend/Backend.js";

function main()
{
    let model = new APIModelAccess();
    let index = new LoginWC(model);
    document.body.appendChild(index);
}

window.onload = main;