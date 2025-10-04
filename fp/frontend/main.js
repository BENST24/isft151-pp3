import { LoginWC } from "./Components/LoginWC.js";

function main()
{
    let index = new LoginWC(model);
    document.body.appendChild(index);
}

window.onload = main;