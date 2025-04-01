import express from "express";
import http from "http";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/cors.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(corsMiddleware);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use(errorMiddleware);


const start = async () => {
    try {
        httpServer.listen(PORT, HOST, () => { 
            console.log('Server started on port ', PORT)
        });
    } catch (e) {
        console.log(e);
    }
};

start();