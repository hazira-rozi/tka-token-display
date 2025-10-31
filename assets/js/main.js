const updateChannel = new BroadcastChannel("tkaToken");

function getData() {
  return {
    school: document.getElementById("schoolName")?.value || "SMKN 1 Singkarak",
    token: document.getElementById("token")?.value || "TOKEN",
    color: document.getElementById("color")?.value || "#003366",
    size: parseInt(document.getElementById("size")?.value || "64"),
  };
}

function saveData(data) {
  localStorage.setItem("tkaSettings", JSON.stringify(data));
}

function sendData(data) {
  updateChannel.postMessage(data);
}

function updateAndSend() {
  const data = getData();
  saveData(data);
  sendData(data);
  document.getElementById("colorValue").textContent = data.color;
  document.getElementById("sizeValue").textContent = data.size;
}

document
  .getElementById("updateToken")
  ?.addEventListener("click", updateAndSend);

document.getElementById("openDisplay")?.addEventListener("click", () => {
  updateAndSend();
  setTimeout(() => window.open("display.html", "_blank"), 300);
});

["schoolName", "token", "color", "size"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", updateAndSend);
    el.addEventListener("change", updateAndSend);
  }
});

window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("tkaSettings"));
  if (saved) {
    document.getElementById("schoolName").value = saved.school;
    document.getElementById("token").value = saved.token;
    document.getElementById("color").value = saved.color;
    document.getElementById("size").value = saved.size;
    document.getElementById("colorValue").textContent = saved.color;
    document.getElementById("sizeValue").textContent = saved.size;
  }
  updateAndSend();
});
