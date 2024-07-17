import {connect} from 'mongoose';

export const connectDB = () => {
    connect('mongodb://localhost:27017/blog').then(()=>{
        console.log("Db connected")
    })
} 