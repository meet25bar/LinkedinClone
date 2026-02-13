import ProfilePhoto from "@/Component/Shared/ProfilePhoto";
export interface IUser{
    firstName:string,
    lastName:string,
    userId:string,
    Profilephoto?:string,
    bio?: string
}
export interface IUserDocument extends IUser,Document{
    createdAt:Date,
    updatedAt:Date
}
import mongoose, { Date, Model, Models } from "mongoose";
const usermodel = new mongoose.Schema<IUserDocument>({
    firstName:{
        type:String,
        required:true
    },
      lastName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
      Profilephoto:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    }

},{timestamps:true})

export const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User", usermodel)