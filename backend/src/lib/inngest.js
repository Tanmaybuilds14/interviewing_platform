import {Inngest} from 'inngest';
import { connectDB } from './db.js';
import User from '../models/User.js';
import { upsertStreamuser } from './stream.js';



export const inngest = new Inngest({id:"Talent-iq"});

const syncUser = inngest.createFunction(
  {id:"Sync-user"},
  {event:"clerk/user.created"},
  async ({event}) =>{
    await connectDB()

    const {id , email_addresses , first_name , last_name , image_url}  = event.data

    const newUser = {
      clerkId:id,
      email:email_addresses[0]?.email_address,
      name:`${first_name || ""} ${last_name || ""}`,
      profileImage:image_url
    }

    await User.create(newUser);
    //todo:
    await upsertStreamuser({
      id:newUser.clerkId.tostring(),
      name:newUser.name,
      image:newUser.profileImage,
    })
  }
);

const deleteUserFromDB = inngest.createFunction(
  {id:"delete-user-from-DB"},
  {event:"clerk/user.deleted"},
  async ({event}) =>{
    await connectDB()
    
    const {id} = event.data
    await User.deleteOne({clerkId:id});
    //todo:
    await deleteStreamuser(id.tostring());

  }
);

export const functions = [syncUser , deleteUserFromDB];