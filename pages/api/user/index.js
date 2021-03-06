import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const email=req.body.email;
        const userModel =new User({email:email})
        await userModel.save();
        res.status(201).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'GET':
      try {
        const user = await User.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const session = await getSession({ req })
        const updatedValue=req.body;
        if(session){
           await User.findOneAndUpdate (
            {email:session.user.email},updatedValue
          ) /* create a new model in the database */
          res.status(200).json({ success: true })

        }
        
     
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}