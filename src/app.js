import express, { json, urlencoded, text } from "express";
import routes from "./routes";

const app = express();
const port = 8080;

app.use(json());
app.use(text());
app.use(urlencoded({ extended: true }));
routes(app);

app.listen(port, () => console.log(`Listening: port ${port}`));
