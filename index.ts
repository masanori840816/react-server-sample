import express from "express";
import {promises as fs} from "fs";
import path from "path";
import { AppSettings, loadSettings } from "./appSettings";

const port = 3000;
const app = express();
const rootDir = __dirname.replace(/\\/g, "/").replace("/js", "");

loadSettings(rootDir)
.then(settings => {
    app.use(express.json());
    app.use(express.static("clients/dist"));
    app.use(express.static(settings.pointCloudDir))
    app.get("/", (req, res) => {
        res.sendFile(path.join(rootDir, "clients/public/main.page.html"))
        });
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
})
.catch(err => console.error(err));
