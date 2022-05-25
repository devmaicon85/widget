import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mustache from "mustache-express";
import path from "node:path";
import * as dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));
app.engine("mustache", mustache());

app.use(bodyParser.json({ limit: "900kb" }));
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
    console.log(
        `server running in... http://localhost:${process.env.PORT || 3333}`
    );
});
