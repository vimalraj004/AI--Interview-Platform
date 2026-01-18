import React from "react"
interface dashboardLayoutProps {
    children:React.ReactNode
}
 const dashboardLayout = ({children}:dashboardLayoutProps)=>{
    return(
        <div>
        {children}
        </div>
    )
}
export default dashboardLayout