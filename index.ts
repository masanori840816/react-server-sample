import express from "express";
import cors from "cors";
import { loadSettings } from "./appSettings";
import path from "path";
import { getPictureList } from "./pictures";

const port = 3000;
const app = express();
const rootDir = __dirname.replace(/\\/g, "/").replace("/js", "");
const allowlist = ['http://localhost:3000', 'http://localhost:5173']
const corsOptionsDelegate: cors.CorsOptionsDelegate<any> = (req, callback) => {
  const corsOptions = (allowlist.indexOf(req.header('Origin')) !== -1)? { origin: true }: { origin: false };
  callback(null, corsOptions);
};

loadSettings(rootDir)
.then(settings => {
    app.use(express.json());
    app.use(cors(corsOptionsDelegate));
    app.use(express.static("clients/dist"));
    app.use(express.static(settings.pointCloudDir));
    app.use(express.static(settings.pictureDir));
    app.get("/pointclouds", (_, res) => {
        const result = { succeeded: true, errorMessage: "nothing" };
        res.json(result);
    });
    app.get("/", (_, res) => {
        res.sendFile(path.join(rootDir, "clients/dist/index.html"))
        });
    app.get("/picturelist", (_, res) => {
        getPictureList(settings.pictureDir)
            .then(files => res.json(files))
            .catch(err => {
                console.error(err);
                res.statusCode = 500;
            })
    });
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
})
.catch(err => console.error(err));
