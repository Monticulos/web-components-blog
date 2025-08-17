import fs from 'node:fs';
import { FileUtils } from '../utils/FileUtils.js';

const fileNames = fs.readdirSync("../entries");
const entryFileNames = FileUtils.filterEntries(fileNames);
const sortedEntryFileNames = entryFileNames.toReversed();
const fileNameArrayAsString = JSON.stringify(sortedEntryFileNames);

const fileContent = `export const entryFileNames = ${fileNameArrayAsString}`;

fs.writeFile("../entries/index.js", fileContent, (writeError) => {
    if (writeError) {
        console.log(writeError);
        return;
    }
    console.log(`Successfully updated entries/index.js with \n${fileContent}`);
});