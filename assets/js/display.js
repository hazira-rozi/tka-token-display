const displayChannel = new BroadcastChannel("tkaToken");

function renderDisplay(data) {
  const nameEl = document.getElementById("schoolNameDisplay");
  const tokenEl = document.getElementById("tokenDisplay");

  nameEl.textContent = data.school || "SMKN 1 Singkarak";
  tokenEl.textContent = data.token || "TOKEN";
  tokenEl.style.color = data.color || "#003366";
  tokenEl.style.fontSize = `${data.size}px`;
}

function updateDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("dateTime").textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime();

displayChannel.onmessage = (e) => renderDisplay(e.data);

window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("tkaSettings")) || {};
  renderDisplay(saved);
});
