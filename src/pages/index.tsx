import { Inter } from 'next/font/google'
import { clearFromSession, getFromStorage } from '@/lib/session-storage'
import React from 'react'
import { User } from '@/types/user'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import LineCharts from '@/components/line'


type ServerUsersAndGroups = {
  groupName:string,
  groupId:number,
  users:string[]
}
const inter = Inter({ subsets: ['latin'] })

const  Home = function(props:any) {

  const user = getFromStorage('user') as User
  const [groups,setGroups] = React.useState<ServerUsersAndGroups[]>([])
  const [selectedGroup,setSelectedGroup] = React.useState<any>(null)
  const [products,setProducts] = React.useState<any[]>([])
  const router=  useRouter()

  const onLogout = function(){
    router.push("/login")
    clearFromSession('user')
  }
  const getUserGroups = async function(){
    // Get data from server
    const res  =  await fetch("/api/user-data",{
      method:"POST",
      body:JSON.stringify({
        userId:user.pk_id,
      })
  })  
  const data = await res.json()
  // Set it in the client
  setGroups(data.usersGroupsMap)
 setSelectedGroup(Object.keys(data.usersGroupsMap)[0])
  }

  const onGroupSelect = function(e:React.ChangeEvent<HTMLSelectElement>){
    const groupId = e.target.value;
   setSelectedGroup(groupId)
  }
  React.useEffect(()=>{
    if(!user){
      router.push("/login")
      return
    }
    getUserGroups()

  },[])


  if(!user){
    return <div>Loading..</div>
  }


  return (
    <>
      <main className={inter.className}>
          <div className='home-page--header'>
        <h1>Hello   <span>{user?.user_name || ""} </span> </h1>
           <button onClick={onLogout}>logout</button>
        </div>

        {/*Show Groups  */}
         <select defaultValue={groups[selectedGroup]?.groupName} onChange={onGroupSelect}>
         {Object.values(groups)?.map((gr)=><option key={gr.groupId} value={gr.groupId}>{gr.groupName}</option>)}
        </select> 

        {/* Show Users */}
        <select defaultValue="all">
          <option value="all">All</option>
        {groups[selectedGroup]?.users?.map((user)=><option key={user} value={user}>{user}</option>)}
        </select>
        {products ? <LineCharts data={products}/> : null }
      </main>
    
    </>
  )
}

export default dynamic(() => Promise.resolve(Home), { 
    ssr: false 
})