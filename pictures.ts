import {promises as fs} from "fs";
import path from "path";

export async function getPictureList(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);
    const results = [];
    for(const file of files) {
        if([".jpg", ".png"].includes(path.extname(file))) {
            results.push(`http://localhost:3000/${path.basename(file)}`);
        }
    }
    return results;
}