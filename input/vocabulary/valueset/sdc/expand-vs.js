const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

// Your HAPI FHIR server base URL
const FHIR_SERVER = process.env.FHIR_SERVER_URL;

// Folder containing the unexpanded ValueSets
const VALUESET_FOLDER = "input/vocabulary/valueset/sdc";
const DELAY_MS = 5000; // 5-second delay between requests

// Function to pause execution for a given time
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to read JSON files from the folder
function getValueSetFiles(folder) {
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(folder, file));
}

// Function to expand a ValueSet
async function expandValueSet(filePath) {
  try {
    const valueSet = JSON.parse(fs.readFileSync(filePath, "utf8"));
    // console.log('expansion URL',`${FHIR_SERVER}ValueSet/$expand`)
    const response = await axios.post(
      `${FHIR_SERVER}ValueSet/$expand`,
      valueSet,
      {
        headers: { "Content-Type": "application/fhir+json" },
      }
    );

    // Save the expanded ValueSet
    const expandedFilePath = filePath.replace(".json", "-expanded.json");
    fs.writeFileSync(expandedFilePath, JSON.stringify(response.data, null, 2));

    console.log(`✅ Expanded: ${filePath} -> ${expandedFilePath}`);
  } catch (error) {
    console.error(
      `❌ Error expanding ${filePath}:`,
      error.response?.data || error.message
    );
  }
}

// Expand all ValueSets in the folder
async function expandAll() {
  const files = getValueSetFiles(VALUESET_FOLDER);
  console.log(`🔍 Found ${files.length} ValueSets to expand...`);

  for (const file of files) {
    await expandValueSet(file);
    await sleep(DELAY_MS); // Introduce a delay between requests
  }

  console.log("🎉 All ValueSets expanded!");
}

expandAll();
