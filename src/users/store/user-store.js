import { loadUsersByPage } from "../use-cases/load-user-by-page"

const state = {
    currentPages: 0,
    users: [],
}

const loadnextPage = async() => {
    
    const users = await loadUsersByPage(state.currentPages + 1);
    
    if (users.length === 0) return;
    state.users = users;
    state.currentPages += 1;
}
const loadPreviewPage = async() => {
    if (state.currentPages === 1) return;
    const users = await loadUsersByPage(state.currentPages - 1);
    state.users = users;
    state.currentPages -= 1;
}

/**
 * 
 * @param {User} updateUser 
 */
const onUserChanged = async(updateUser) =>{

    let wasFound = false;
    state.users = state.users.map( user => {
        if (user.id === updateUser.id){
            wasFound = true;
            return updateUser;
        }
        return user;
    });

    if (state.users.length <10 && !wasFound){
        state.users.push(updateUser);
    }
}

const reloadPage = async() => {
    const users = await loadUsersByPage(state.currentPages);
    if (users.length === 0) {
        await loadPreviewPage(state.currentPages);
        return;
    }
    state.users = users;
}

export default {
    loadnextPage,
    loadPreviewPage,
    onUserChanged,
    reloadPage,
    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPages 
}