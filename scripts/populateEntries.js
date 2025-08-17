import fs from 'node:fs';

/**
 * Populates the main entries array with entries from the individual entry files.
 */

const DIR_NAME = "entries"
const BASE_PATH = `../${DIR_NAME}`;
const INDEX_FILE = "index.js"

console.log(`Reading '${DIR_NAME}' directory...`)
const fileNames = fs.readdirSync(BASE_PATH);
const entryFileNames = fileNames.filter((fileName) => fileName !== INDEX_FILE);

const entries = await Promise.all(
    entryFileNames.map(async fileName => {
        console.log(`Loading '${fileName}'...`)
        const entry = await import(`${BASE_PATH}/${fileName}`);
        return {...entry.default, sourceFile: fileName};
    })
);

const entryArrayAsString = JSON.stringify(entries, null, 2);
const fileContent = `export const entries = ${entryArrayAsString}`;

fs.writeFile(`${BASE_PATH}/${INDEX_FILE}`, fileContent, (writeError) => {
    if (writeError) {
        console.log(writeError);
        return;
    }
    console.log(`Successfully updated '${DIR_NAME}/${INDEX_FILE}'.`);
});