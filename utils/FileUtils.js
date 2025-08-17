export class FileUtils {
    static filterEntries(fileNames) {
        return fileNames.filter((fileName) => fileName !== "index.js");
    };
}