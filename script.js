import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import Psd from "@webtoon/psd";

// Pretend we run in a TTY to enable colors, even when we are called by wireit
process.stdout.isTTY = true;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, "./data/example.psd");
const psdFile = fs.readFileSync(filePath);

// Parse PSD file
const psd = Psd.parse(psdFile.buffer);

console.log("psd:", psd);

// Recursively traverse layers and layer groups
const traverseNode = (node) => {
  if (node.type === "Layer") {
    // generateCanvas(node);
    // Do something with Layer
  } else if (node.type === "Group") {
    // Do something with Group
  } else if (node.type === "Psd") {
    // Do something with Psd
  } else {
    throw new Error("Invalid node type");
  }

  node.children?.forEach((child) => traverseNode(child));
};

const composeImages = async (psd) => {
  for (const [index, layer] of psd.layers.entries()) {
    console.time(`Compositing layer ${index}`);
    const pixelData = await layer.composite(true, true);
    console.timeEnd(`Compositing layer ${index}`);

    console.log("pixelData:", pixelData);
  }
};

// traverseNode(psd);
// composeImages(psd);
