import path from "path";
import fs from "fs";

/**
 * Returns an array of file paths in a given directory and its subdirectories.
 *
 * @param filePath - The path of the directory to search.
 * @param previousFiles - An array of file paths to include in the result. This
 *                        is used when calling the function recursively on
 *                        subdirectories.
 * @returns An array of file paths in the specified directory and its
 *          subdirectories.
 */
const fetch = (filePath: string, previousFiles: string[] = []) => {
  const files = fs.readdirSync(filePath);
  return files.reduce((currentFiles, file) => {
    const filePathAtt = path.join(filePath, file);
    return fs.statSync(filePathAtt).isDirectory()
      ? fetch(filePathAtt, currentFiles)
      : currentFiles.concat(filePathAtt);
  }, previousFiles);
};

type FetchFiles = Service & {
  fetch: (filePath: string, previousFiles?: string[]) => string[];
};

const fetchFiles: FetchFiles = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Service that searches for files in a directory.",
  fetch,
};

export default fetchFiles;
