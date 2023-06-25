import { createContext, useState } from "react";

export const userContext = createContext({});

export const UserContextProvider=(props)=>{
    const [data,setData] = useState('ff');

    return (
        <userContext.Provider 
            value={{
                data,setData
            }}
        >
            {props.children}
        </userContext.Provider>
    )
    
}