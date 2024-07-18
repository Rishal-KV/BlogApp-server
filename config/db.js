import {connect} from 'mongoose';

export const connectDB = () => {
    connect('mongodb+srv://heyrishu:12345@cluster0.5xfoebk.mongodb.net/BlogApp').then(()=>{
        console.log("Db connected")
    })
} 