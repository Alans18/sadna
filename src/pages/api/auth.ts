import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email} = JSON.parse(req.body)

  if(!email){
    return res.status(404).json({message:"No email provided"});
  
  }
  
  // Try to find the user
  const user = await prisma.users.findFirst({
    where:{
    email
    }
  })

  // no user what do to
  if(!user){
    return  res.status(404).json({message:"No user found"});
  }

  // return user to the client
  return res.status(200).json(user)
}
