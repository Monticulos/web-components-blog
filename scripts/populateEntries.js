import fs from 'node:fs';

const filterEntries = (fileNames) => fileNames.filter((fileName) => fileName !== "index.js");
const sortEntries = (entries) => entries.toReversed();

fs.readdir("../entries", (readError, fileNames) => {
    if (readError) {
        console.log(readError);
        return;
    }

    const entryFileNames = filterEntries(fileNames);
    const sortedEntryFileNames = sortEntries(entryFileNames);

    const commaSeparatedFileNames = sortedEntryFileNames.map(name => `"${name}"`).join(", ");
    const fileContent = `export const entryFileNames = [${commaSeparatedFileNames}]`;
    
    fs.writeFile("../entries/index.js", fileContent, (writeError) => {
        if (writeError) {
            console.log(writeError);
            return;
        }
        console.log("Successfully updated entries/index.js with:");
        console.log(fileContent);
    });
});