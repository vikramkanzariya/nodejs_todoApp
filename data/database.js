import mongoose from "mongoose";


// ---> DataBase Connection <---
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI , {
    dbName:"backendapi",
})
.then(() => console.log("DataBase Connected..."))
.catch((e) => console.log(e));
};