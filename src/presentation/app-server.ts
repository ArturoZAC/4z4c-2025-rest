import express, { NextFunction, Request, Response, Router } from 'express';

export class AppServer {

  private app = express();

  public constructor(
    private readonly PORT: number,
    private readonly routes: Router
  ){}

  public async start() {

    this.app.use( express.json());


    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      
      if (err instanceof SyntaxError) {
        return res.status(400).json({
          message: 'Invalid JSON format. Please check your request body.',
        });
      }
      next(err);
    });
    
    this.app.use( this.routes )
    this.app.listen( this.PORT, () => {
      console.log(`server running on port ${ this.PORT }`);
    })
  }
}