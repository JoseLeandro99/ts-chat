import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { resolve } from 'path';

class App {
  server: Server;
  app: Express;
  
  constructor () {
    this.app = express();
    this.server = new Server(this.app);
    this.app.use(cors());
    this.static();
  }

  static() {
    this.app.use('/', express.static(resolve(
      __dirname, '..', 'public'
    )));
  }

  routes() {
    this.app.get('/', (request, response) => {
      return response.sendFile('/index.html');
    });
  }
}

export default new App().server;
