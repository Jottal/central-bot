import path from "path";
import fs from "fs";

const fetch = (filePath: string, previousFiles?: string[]) => {
  const files = fs.readdirSync(filePath);
  let currentFiles: string[] = [];
  if (previousFiles) {
    currentFiles = previousFiles;
  }
  files.forEach((file) => {
    if (fs.statSync(`${filePath}/${file}`).isDirectory()) {
      currentFiles = fetch(`${filePath}/${file}`, currentFiles);
    } else {
      currentFiles.push(path.join(filePath, "/", file));
    }
  });
  return currentFiles;
};

type FetchFiles = Service & {
  fetch: (filePath: string, previousFiles?: string[]) => string[];
};

const fetchFiles: FetchFiles = {
  name: path.basename(__filename, path.extname(__filename)),
  description: "Serviço que busca os arquivos de um diretório.",
  fetch,
};

export { fetchFiles };
