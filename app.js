// Get HTML elements
const diseaseSelect = document.getElementById("diseaseSelect");
const output = document.getElementById("output");

// Disease → JSON filename mapping
const diseaseMap = {
  diabetes: "diabetes.json",
  hypertension: "hypertension.json",
  gallstone: "gallstone.json",
  kidneystone: "kidneystone.json",
  asthma: "asthma.json",
  copd: "copd.json",
  gout: "gout.json",
  pku: "pku.json",
  galactosemia: "galactosemia.json"
};

// Load disease data
async function loadDisease(diseaseKey) {
  try {
    const response = await fetch(diseaseMap[diseaseKey]);

    if (!response.ok) {
      throw new Error("File not found");
    }

    const data = await response.json();
    displayDisease(data);

  } catch (error) {
    output.innerHTML = `
      <p style="color:red;">
        ❌ Error loading disease data.
      </p>
    `;
    console.error(error);
  }
}

// Display disease data
function displayDisease(data) {
  output.innerHTML = `
    <h2>${data.name}</h2>

    <h3>🔬 Metabolic / Pathochemical Basis</h3>
    <p>${data.pathophysiology}</p>

    <h3>🧪 Diagnostic Tests</h3>
    <ul>
      ${data.tests.map(t => `<li>${t}</li>`).join("")}
    </ul>

    <h3>💊 Usual Medicines</h3>
    <ul>
      ${data.medicines.map(m => `<li>${m}</li>`).join("")}
    </ul>

    <h3>🛡️ Prevention / Protection</h3>
    <ul>
      ${data.prevention.map(p => `<li>${p}</li>`).join("")}
    </ul>

    <h3>📌 Patient Notes</h3>
    <p>${data.patient_note}</p>
  `;
}

// Event listener
diseaseSelect.addEventListener("change", () => {
  const selected = diseaseSelect.value;
  if (selected) {
    loadDisease(selected);
  } else {
    output.innerHTML = "";
  }
});
