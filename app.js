function loadDisease() {
  const disease = document.getElementById("diseaseSelect").value;
  if (!disease) return;

  fetch(`${disease}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").innerText = data.name;
      document.getElementById("defect").innerText = data.defect;
      document.getElementById("pathway").innerText = data.pathway;

      fill("consequences", data.consequences);
      fill("tests", data.tests);
      fill("medicines", data.medicines);
      fill("prevention", data.prevention);
    });
}

function fill(id, arr) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  arr.forEach(i => {
    const li = document.createElement("li");
    li.innerText = i;
    ul.appendChild(li);
  });
}
