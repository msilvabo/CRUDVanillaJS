import userStore from "../../store/user-store";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {
    const nextButton = document.createElement("button");
    nextButton.innerText = 'Next >';

    const previusButton = document.createElement("button");
    previusButton.innerText = '< Previus';

    const currentPageLable = document.createElement('span');
    currentPageLable.id = 'current-page';
    currentPageLable.innerHTML = userStore.getCurrentPage();

    element.append( previusButton, currentPageLable, nextButton);

    nextButton.addEventListener("click", async() => {
        await userStore.loadnextPage();
        currentPageLable.innerHTML = userStore.getCurrentPage();
        renderTable(element);
    })

    previusButton.addEventListener("click", async() => {
        await userStore.loadPreviewPage();
        currentPageLable.innerHTML = userStore.getCurrentPage();
        renderTable(element);
    });
}