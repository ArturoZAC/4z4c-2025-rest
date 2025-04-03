import express, { Router } from 'express';

export class AppServer {

  private app = express();

  constructor(
    private readonly PORT: number,
    private readonly routes: Router
  ){}

  public async start() {

    this.app.use( express.json());
    this.app.use( this.routes )
    this.app.listen( this.PORT, () => {
      console.log(`server running on port ${ this.PORT }`);
    })
  }
}