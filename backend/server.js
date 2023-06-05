import path from 'path';
import express from "express";
import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"     //remember to add .js else it won't work.

const port = process.env.PORT || 3002;
connectDB();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

app.use("/api/users", userRoutes);

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));     //For production mode to make the dist folder static to access its files. (if create-react-app used dist is build)

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))); 
       //To ensure that if you get requests at something other than /api/users we just wanna render the index.html in the static folder.
}       //In the development mode we don't need to use this as we are already using the react-app/vite dev server so no need for static folder.

else {
    app.get("/", (req, res) => res.send("Server is ready."));
}

app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
    console.log("Server started on port " + port);
})