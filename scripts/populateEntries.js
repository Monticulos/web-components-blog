import fs from 'node:fs';
import { FileUtils } from '../utils/FileUtils.js';

const fileNames = fs.readdirSync("../entries");
const entryFileNames = FileUtils.filterEntries(fileNames);

const entries = await Promise.all(
    entryFileNames.map(async fileName => {
        const entry = await import(`../entries/${fileName}`);
        return {...entry.default, sourceFile: fileName};
    })
);

const EntryArrayAsString = JSON.stringify(entries, null, 2);
const fileContent = `export const entries = ${EntryArrayAsString}`;

fs.writeFile("../entries/index.js", fileContent, (writeError) => {
    if (writeError) {
        console.log(writeError);
        return;
    }
    console.log(`Successfully updated entries/index.js.`);
});