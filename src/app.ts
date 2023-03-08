import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import "express-async-errors";
import playerRouter from "./routes/players";
import standingsRouter from "./routes/standings";
import teamRouter from "./routes/teams";
import statsRouter from "./routes/stats";
import scheduleRouter from "./routes/schedule";

const shouldCompress = (req: any, res: any) => {
  if (req.headers["x-no-compression"]) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public app: express.Application;

  private config(): void {
    this.app.use(
      compression({
        filter: shouldCompress,
        threshold: 0,
      })
    );
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === "production" ? undefined : false,
      })
    );
    this.app.use(morgan("combined"));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });
  }

  private routes(): void {
    this.app.use("/player", playerRouter);
    this.app.use("/standings", standingsRouter);
    this.app.use("/team", teamRouter);
    this.app.use("/stats", statsRouter);
    this.app.use("/schedule", scheduleRouter);
  }
}

export default new App().app;
