import ProfilePhoto from "@/Component/Shared/ProfilePhoto";
import mongoose, { Date, Model, Models, Mongoose, Types } from "mongoose";
import { IUser } from "./User.Model";
import { IComment } from "./comments.model";
export interface Ipost {
    description: string,
    User: IUser,
    imageUrl?: string
    likes?: string[],
    comments?: Types.ObjectId[]
}
export interface IPostDocument extends Ipost, Document {
    createdAt: Date,
    updatedAt: Date
}

const postmodel = new mongoose.Schema<IPostDocument>({
    description: {
        type: String,
        required: false
    },
    User: {
        userId: {
            type: String,
            required: true
        },
        Profilephoto: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }

    },
    imageUrl: {
        type: String,
        default: ""
    },
    likes: {
        type: [String]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]

}, { timestamps: true })

export const Post: Model<IPostDocument> = mongoose.models?.Post || mongoose.model<IPostDocument>("Post", postmodel)
