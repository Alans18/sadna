import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email,authKey} = JSON.parse(req.body)

  if(!email){
    return res.status(404).json({message:"No email provided"});
  
  }
  console.log(email)

  // Try to find the user
  const user = await prisma.users.findFirst({
    where:{
    email:(email as string).toLowerCase()
    }
  })
  console.log(user)

  if(!user){
    return  res.status(404).json({message:"Invalid credetinals"});
  }

  const userGroups = await prisma.usergroups.findMany({
    where:{
      fk_user_id:user?.pk_id
    }
  })

  const userGroupIds = userGroups.map((group) => group.fk_group_id);
  const allAuthKeys = (await prisma.groups.findMany({
    where: {
      pk_id: {
        in: userGroupIds,
      },
    },
  })).map((a) => a.auth);

  console.log(allAuthKeys)

  if(!allAuthKeys.includes(authKey)){
  return  res.status(404).json({message:"Invalid credetinals"}); 
  }
  // no user what do to


  // return user to the client
  return res.status(200).json(user)
}
