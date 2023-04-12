import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {userId,groupId} = JSON.parse(req.body)
  
  // Try to find the user
  const dbGropus = await prisma.usergroups.findMany({
    where:{
    fk_user_id:userId
    },select:{
        groups:{
            select:{
                group_name:true,
                pk_id:true
            },
        },
    
    }
  })

  
const groups = dbGropus.map((gr)=>({name:gr.groups.group_name,id:gr.groups.pk_id}))

  const dbProdcuts = await prisma.userproducts.findMany({
    where:{
        fk_group_id:groupId || groups[0].id
    },
    select:{
        amount:true,
        date_created:true,
        groups:true,
        users:{
            select:{
                user_name:true
            }
        },
        productcategories:{
            select:{
                category_name:true
            }
        }
    }
  })

//   trasnform data

const products =  dbProdcuts.map((p)=>{
    return {
         amount : p.amount,
         date : p.date_created,
         groupName : p.groups.group_name,
         category : p.productcategories.category_name,
         userName : p.users.user_name
    }
})

  // return user to the client
  return res.status(200).json({groups,products})
}
