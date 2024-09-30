
import {promises as fs} from "fs";
import path from "path";

export interface AppSettings {
    pointCloudDir: string
}
export async function loadSettings(rootDir: string): Promise<AppSettings> {
    const filePath = path.join(rootDir, "appsettings.json");
    const settingJson = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(settingJson);
}