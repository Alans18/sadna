import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { clearFromSession, getFromStorage } from '@/lib/session-storage'
import React from 'react'
import { User } from '@/types/user'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import { setgroups } from 'process'
import LineCharts from '@/components/line'


const inter = Inter({ subsets: ['latin'] })

const  Home = function(props:any) {

  const user = getFromStorage('user') as User
  const [groups,setGroups] = React.useState<{id:number,name:string}[]>([])
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
        userId:user.pk_id
      })
  })  
  const data = await res.json()
  // Set it in the client
  setGroups(data.groups)
  setProducts(data.products)
  }
  React.useEffect(()=>{
    if(!user){
      router.push("/login")
      return
    }
    getUserGroups()
  },[])



  return (
    <>
      <main className={inter.className}>
          <div className='home-page--header'>
        <h1>Hello   <span>{user.user_name || ""} </span> </h1>
           <button onClick={onLogout}>logout</button>
        </div>
     
         <select defaultValue={groups[0]?.name}>
         {groups?.map((gr)=><option key={gr.id} value={gr.id}>{gr.name}</option>)}
        </select> 
        {products ?   <LineCharts data={products}/> : null }
      </main>
    
    </>
  )
}

export default dynamic(() => Promise.resolve(Home), { 
    ssr: false 
})