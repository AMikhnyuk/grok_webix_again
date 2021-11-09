import express from "express";
import cors from "cors"
import bandsRouter from "./routes/bands.router.js";
import bodyParser from "body-parser";
import membersRouter from "./routes/members.router.js";
import albumsRouter from "./routes/albums.router.js";
import songsRouter from "./routes/songs.router.js";

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())

app.use(bandsRouter)
app.use(membersRouter)
app.use(albumsRouter)
app.use(songsRouter)

app.listen(port, () => {
    console.log(`Hearing at ${port}`);
});