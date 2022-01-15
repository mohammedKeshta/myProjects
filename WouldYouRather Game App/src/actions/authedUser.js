//An action for seting the current user form one of the authorized users at the Store
export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}