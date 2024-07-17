export const UserValidation = () =>{
    return sessionStorage.getItem('user')
}

export const SetCurrentUser = (username:string) =>{
    sessionStorage.setItem('user',username);
}

export const ClearUserSession = ()=>{
    sessionStorage.removeItem('user');
}