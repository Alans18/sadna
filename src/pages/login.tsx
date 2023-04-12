import React, { useState } from "react"
const Login = function(){

    const [users,setUsers] = useState()
    React.useEffect(()=>{
        ( async ()=>{
            const res = await fetch('/api/hello')
            const data = await res.json()
            setUsers(data)
        })()    
    },[])


    return <>
    <pre>{JSON.stringify(users,null,2)}</pre>
    </>
}

export default Login