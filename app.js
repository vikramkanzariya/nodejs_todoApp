// // -----> API & Params <-----

// import express from "express";
// import userRouter from "./routes/user.js"
// import { connectDB } from "./data/database.js"


// const app = express();
// const port = 3000;

// connectDB();


// // ---> using Middleware <---
// app.use(express.json());
// app.use("/users" , userRouter);


// app.get("/" , (req , res) => {
//     res.send("Home Page is Working...");
// });


// app.listen(port , () => {
//     console.log(`App is Listening on Port: ${port}`);
// });




// ----> OR <----


// -----> API & Params <-----
// ----> Project With Authentication <----

import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


export const app = express();
 
config({
    path:"./data/config.env",
});

// ---> using Middleware <---
app.use(express.json()); //---> First Use this and Then
app.use(cookieParser());
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods:["GET" , "POST" , "PUT" , "DELETE"],
        credentials:true,
   })
);

// Using Routes
app.use("/api/v1/users" , userRouter); //---> this(Second)
app.use("/api/v1/task" , taskRouter); //---> this(Second)


app.get("/" , (req , res) => {
    res.send("Home Page is Working...");
});


// ---> Using Error Middleware <---
app.use(errorMiddleware);