import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";
import { User } from "../../models/user";
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form;
let loadedUser = {};

/**
 * 
 * @param {String|Number} id 
 */
export const showmodal = async(id) => {
    modal.classList.remove('hide-modal');
    if (!id) return;
    const user = await getUserById(id);
    setFormValues(user);
}

export const hideModal = () => {
    modal.classList.add('hide-modal');
    form.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) =>{
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').check = user.isActive;
    loadedUser = user;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike => Promise<void>)} callback 
 * @returns 
 */
export const rendelModal = (element, callback) => {
    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    form.addEventListener('submit', async(event) =>{
        event.preventDefault();
        
        const formData = new FormData(form);
        const userLike = {...loadedUser};

        for(const [key, value] of formData){
            switch (key) {
                case 'balance':
                    userLike[key] = Number(value);
                    break;
                case 'isActive':
                    userLike[key] = (value === 'on') ? true : false;
                    break;            
                default:
                    userLike[key] = value;
                    break;
            }
        }
        await callback(userLike);
        hideModal();
    });

    modal.addEventListener('click', (event) =>{
        if (event.target.className === 'modal-container') hideModal();

    });

    element.append(modal);
}