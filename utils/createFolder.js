import fs from "fs";
import path from "path";

// function to ensure folder exists
const ensureFolderExists = (folderPath) => {
  const fullPath = path.join(process.cwd(), folderPath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return fullPath;
};
export default ensureFolderExists;
