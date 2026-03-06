import {StreamChat} from 'stream-chat';
import { ENV } from './env.js';

const apikey = ENV.STREAM_API_KEY;
const secretkey =  ENV.STREAM_API_SECRET_KEY;

if(!apikey || !secretkey){
  console.error("Stream api key or Stream secret api key is missing")
}

export const chatClient = StreamChat.getInstance(apikey , secretkey);

export const upsertStreamuser = async(userdata) =>{
  try {
    await chatClient.upsertUser(userdata);
    console.log("Stream user upserted successfully",userdata);
  } catch (error) {
    console.error("Error upserting Stream user:",error);
    
  }
};

export const deleteStreamuser = async(userId) =>{
  try {
    await chatClient.deleteUser();
    console.log("Stream user deleted seccessfully",userId)
  } catch (error) {
    console.error("Error upserting Stream user:",error);
    
  }
};

//todo: