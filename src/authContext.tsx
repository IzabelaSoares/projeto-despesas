import React, { useContext } from 'react'
import { IUser } from './service';

export interface IAuthContext {
    user: IUser,
    onSignOut: () => void
}

export const userContext = React.createContext<IAuthContext>({
    user: {
        name: "",
        email: ""
    },
    onSignOut: () => {}
})

export function useAuthContext(){
   return useContext(userContext);
}