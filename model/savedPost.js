import { model,Schema } from "mongoose";

const saveSchema = new Schema({
    userId : {
        ref: 'user',
        type : 'string'
    },
    posts : [
        {
            type : String,
            ref : 'post'
        }
    ]
   
})

export const saveModel = model('savedpost', saveSchema)