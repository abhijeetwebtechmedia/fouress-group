const express = require('express');
const cors = require('cors');
const connection = require('./configs/connection');

class Server {
    constructor() {
        this.PORT = 8080;

        this.app = express();

        this.setUpMiddlewares();

        this.handleRouter();

        this.serverStarter();
    }

    async setUpMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async handleRouter() {
        this.app.get('/', this.handleInitialRoute.bind(this));
    }

    async handleInitialRoute(req, res) {
        try {
            return res.status(200).json({
                status: true,
                message: 'Welcome to Fouress Group.'
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message
            });
        }
    }

    async serverStarter() {
        connection.getConnection().sync().then(()=>{
            this.app.listen(this.PORT, async() => {
                try {
                    console.log('DB Connected');
                } catch (error) {
                    console.log('DB Not Connected');
                }
                console.log(`Server is running on port ${this.PORT}`);
            });
        })
    }
}

new Server();
