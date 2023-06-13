import { app } from "./app.js"
import { connectDB } from "./data/database.js"

connectDB();

// const port = 3000;
// console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
    console.log(`Server is Working on: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
});