import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type UsersAndGroups = {
  sum: number,
  category_name: string,
  date_created:string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {groupId} = JSON.parse(req.body)
 
  if(!groupId){
    return res.status(400).json({message:"Invalid group id"})
  }

//Query to extract user name and amount per group_id
//select u.user_name,sum(up.amount)
//from userproducts up join users u on up.fk_user_id = u.pk_id
//where fk_group_id= 1
//and up.date_created > current_date - 14
//group by u.user_name

const dbRes = (await  prisma.$queryRawUnsafe(`
    SELECT u.user_name,cast(sum(up.amount) as int)
    from userproducts up join users u on up.fk_user_id = u.pk_id
    where fk_group_id='${groupId}'
    and up.date_created > current_date - 14
    group by u.user_name
`)) as any[];


const userNameAndAmountDic:any[] = [["user name","amount"]]

dbRes.forEach((d)=>{
  const amount = d.sum;
  const userName = d.user_name
  userNameAndAmountDic.push([userName,amount])
})


res.status(200).json(userNameAndAmountDic)



}
