import express from 'express';
import cors from 'cors';
import orderRoute from './routes/orden.routes';


class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.middlewares();
        this.routes();

    }
    middlewares() {
        this.app.use(express.json({ limit: '150mb' }));
        this.app.use(cors());
    }
    routes() {
        this.app.use("/orders", orderRoute);

    }
    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
export default Server;