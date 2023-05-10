import { Inter } from 'next/font/google'
import { clearFromSession, getFromStorage } from '@/lib/session-storage'
import React from 'react'
import { User } from '@/types/user'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import PieChart from '@/components/pie-chart'
import { Box, Button, Center, ChakraProvider, Flex, Grid, HStack, Heading, Select, Spacer, Tabs } from '@chakra-ui/react'



type ServerUsersAndGroups = {
  groupName:string,
  groupId:number,
  users:{id:number,name:string}[]
}

type ProductsResponse = {
  categoryAndAmountDic:any
}
const inter = Inter({ subsets: ['latin'] })

const  Home = function(props:any) {

  const user = getFromStorage('user') as User
  const [groups,setGroups] = React.useState<ServerUsersAndGroups[]>([])
  const [selectedGroup,setSelectedGroup] = React.useState<any>(null)
  const [selectedUser,setSelectedUser] = React.useState<any>(null)
  const [dataByCategories,setDataByCategories] = React.useState<(string | number)[][]>([])
  const router=  useRouter()

  const onLogout = function(){
    router.push("/login")
    clearFromSession('user')
  }
  const getUserGroups = async function(){
    // Get data from server
    const res  = await fetch("/api/user-data",{
      method:"POST",
      body:JSON.stringify({
        userId:user.pk_id,
      })
  })  
  const data = await res.json()
  setGroups(data.usersGroupsMap)
  setSelectedGroup(Object.keys(data.usersGroupsMap)[0])
  setSelectedUser("all")
  }


  const getProducts = async function(userId:string,groupId:string){
    const res  = await fetch("/api/expenses",{
      method:"POST",
      body:JSON.stringify({
        userId:userId === "all" ? null:userId,
        groupId
      })
  }) 
  
  const data = await res.json() as ProductsResponse
  const {categoryAndAmountDic} = data
  setDataByCategories(categoryAndAmountDic)
  
  }
  const onGroupSelect = function(e:React.ChangeEvent<HTMLSelectElement>){
    const groupId = e.target.value;
   setSelectedGroup(groupId)
     setSelectedUser("all")
  };

  const onUserSelect = function(e:React.ChangeEvent<HTMLSelectElement>){
    const userId = e.target.value;
   setSelectedUser(userId)
  };

  React.useEffect(()=>{
    if(!user){
      router.push("/login")
      return
    }
    getUserGroups()
  },[])

  React.useEffect(()=>{
    if(selectedGroup === null) return
    getProducts(selectedUser,selectedGroup)
  },[selectedGroup,selectedUser])

  if(!user){
    return <div>Loading..</div>
  }

  return (
    <ChakraProvider>
      <>
        <main className={inter.className}>
          <Flex padding="10px">
            <div className='home-page--header'>
              <Heading 
                as="h1" 
                fontWeight="300"
                fontSize={24}
                letterSpacing={-0.5}
              >
                Hello   <span>{user?.user_name || ""} </span> 
              </Heading>
              <Spacer />

              <Button colorScheme='red' height={8} onClick={onLogout}>logout</Button>
            </div>
          </Flex>

          <Flex padding="10px" alignItems={"center"}>
            <HStack spacing={5}>
              <Box w="150px">
                {/*Show Groups  */}
                <Select size="sm" defaultValue={groups[selectedGroup]?.groupName} onChange={onGroupSelect}>
                {Object.values(groups)?.map((gr)=><option key={gr.groupId} value={gr.groupId}>{gr.groupName}</option>)}
                </Select>
              </Box>

              <Box w="150px">
                {/* Show Users */}
                <Select size="sm" value={selectedUser} defaultValue={selectedUser} onChange={onUserSelect}>
                <option value="all">All</option>
                {groups[selectedGroup]?.users?.map((user)=><option key={user.id} value={user.id}>{user.name}</option>)}
                </Select>
              </Box>
            </HStack>
            <Spacer />

            <HStack spacing="5px">
              <Button colorScheme='telegram' size="sm" variant={"ghost"}>Last 7 days</Button>
              <Button colorScheme='telegram' size="sm" variant={"ghost"}>Last 30 days</Button>
              <Button colorScheme='telegram' size="sm" variant={"ghost"}>All Time</Button>
            </HStack>
          </Flex>

          {dataByCategories?.length > 0 ? <PieChart data={dataByCategories} options={{title:"Categories"}}/> : null}
        </main>
      </>
    </ChakraProvider>
  )

  // return (
  //   <ChakraProvider>
  //     <>
  //       <main className={inter.className}>
  //           <div className='home-page--header'>
  //         <h1>Hello   <span>{user?.user_name || ""} </span> </h1>
  //           <button onClick={onLogout}>logout</button>
  //         </div>

  //         {/*Show Groups  */}
  //         <select defaultValue={groups[selectedGroup]?.groupName} onChange={onGroupSelect}>
  //         {Object.values(groups)?.map((gr)=><option key={gr.groupId} value={gr.groupId}>{gr.groupName}</option>)}
  //         </select> 

  //         {/* Show Users */}
  //         <select value={selectedUser} defaultValue={selectedUser} onChange={onUserSelect}>
  //           <option value="all">All</option>
  //         {groups[selectedGroup]?.users?.map((user)=><option key={user.id} value={user.id}>{user.name}</option>)}
  //         </select>
  //       {dataByCategories?.length > 0 ?   <PieChart data={dataByCategories} options={{title:"Categories"}}/> : null}
  //       </main>
  //     </>
  //   </ChakraProvider>
  // )
}

export default dynamic(() => Promise.resolve(Home), { 
    ssr: false 
})