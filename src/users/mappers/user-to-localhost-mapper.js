
/**
 * 
 * @param {User} user 
 */
export const userModelToLocalhost = (user) => {
    const {
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
        id
    } = user;
    return {
        isActive,
        balance,
        avatar,
        first_name: firstName,
        last_name: lastName,
        gender,
        id
    }
}