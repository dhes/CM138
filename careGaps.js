const fs = require('fs');

// Function to extract care gaps from a MeasureReport
function extractCareGaps(measureReport) {
    const patientsNeedingScreening = [];
    
    let denominatorListId = null;
    let numeratorListId = null;

    // Find denominator and numerator population groups
    if (!measureReport.group || measureReport.group.length === 0) {
        console.error("No groups found in MeasureReport!");
        return [];
    }

    measureReport.group[0].population.forEach(pop => {
        if (pop.code.coding[0].code === "denominator") {
            denominatorListId = pop.subjectResults.reference.replace("#", "");
        }
        if (pop.code.coding[0].code === "numerator") {
            numeratorListId = pop.subjectResults.reference.replace("#", "");
        }
    });

    if (!denominatorListId || !numeratorListId) {
        console.error("Denominator or Numerator population not found!");
        return [];
    }

    // Extract the patient lists from 'contained'
    let denominatorPatients = [];
    let numeratorPatients = new Set();

    measureReport.contained.forEach(entry => {
        if (entry.resourceType === "List") {
            if (entry.id === denominatorListId) {
                denominatorPatients = entry.entry.map(e => e.item.reference);
            }
            if (entry.id === numeratorListId) {
                entry.entry.forEach(e => numeratorPatients.add(e.item.reference));
            }
        }
    });

    // Identify care gap patients (in denominator but not in numerator)
    denominatorPatients.forEach(patient => {
        if (!numeratorPatients.has(patient)) {
            patientsNeedingScreening.push(`Patient ${patient.replace("Patient/", "")} requires screening for tobacco use`);
        }
    });

    return patientsNeedingScreening;
}

// Command-line handling
if (process.argv.length !== 3) {
    console.error("Usage: node careGaps.js [MeasureReport JSON file]");
    process.exit(1);
}

const measureReportFile = process.argv[2];

// Read MeasureReport JSON file
fs.readFile(measureReportFile, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${measureReportFile}`);
        console.error(err.message);
        process.exit(1);
    }

    try {
        const measureReport = JSON.parse(data);
        const careGaps = extractCareGaps(measureReport);

        if (careGaps.length === 0) {
            console.log("No care gaps found.");
        } else {
            console.log("Care Gaps Identified:");
            careGaps.forEach(msg => console.log(msg));
        }
    } catch (jsonError) {
        console.error("Error parsing JSON file:", jsonError.message);
        process.exit(1);
    }
});