import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRoutes';
import { ErrorHandler, Logger } from './middleware';
import mongoConnect from './datastore/mongo';
import 'express-async-errors';

dotenv.config()
const port = process.env.PORT || '8080'

const server = express();
server.use(express.json());
server.use(Logger);

server.use('/api/v1', AuthRoutes)
server.use(ErrorHandler)

const initialize = async () => {
    try{
        await mongoConnect(process.env.MONGO_CONNECTION);
        console.log(`🟢 MongoDB Connected`)
        const isntance = server.listen(port, () => {
            console.log(`🟢 Server listening at port ${port}`)
        })

        process.on('SIGINT', () => {
            console.log("Server is killed using SIGINT ");
            isntance.close(() => {
                console.log("Server Shutting Down");
                process.exit(0);
            })

            setTimeout(() => {
                console.error('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        })
        process.on('SIGTERM', () => {
            console.log("Server is killed using SIGTERM ");
            isntance.close(() => {
                console.log("Server Shutting Down");
                process.exit(0);
            })

            setTimeout(() => {
                console.error('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        })
    }catch(err){
        console.log(`Server Error : ${err}`)
    }
}
initialize()