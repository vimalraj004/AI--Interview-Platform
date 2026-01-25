"use client"
import React, { createContext,useContext,useState } from "react";

type loadingContext = {
    loading:boolean,
    setLoading:(value:boolean)=>void;
}

const loadingContext = createContext<loadingContext|null>(null);
export const LoadingProvider = ({children}:{children:React.ReactNode})=>{
    const [loading,setLoading] = useState(false);
    return(
        <loadingContext.Provider value={{loading,setLoading}}>
            {children}
        </loadingContext.Provider>
    )
}
export const useLoading = ()=>{
    const context = useContext(loadingContext);
    if(!context){
        throw new Error ("context need to be created")
    }
    return context;
}