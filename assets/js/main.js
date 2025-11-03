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
  // Buka jendela baru tanpa menavigasi ke URL eksternal.
  // Kita ambil isi `display.html`, tambahkan <base> supaya CSS/JS relatif tetap berhasil,
  // lalu tulis ke jendela baru (about:blank). Ini menjaga tampilan terpisah tanpa bergantung
  // pada navigasi langsung. Browser modern mungkin tetap menampilkan alamat (tipe: about:blank)
  // dan dapat memblokir popup jika tidak dipicu langsung oleh event user.
  updateAndSend();
  setTimeout(() => {
    const popup = window.open("", "tkaDisplayWindow", "width=900,height=600,toolbar=no,location=no,menubar=no");
    if (!popup) {
      alert("Popup diblokir atau tidak bisa dibuka. Izinkan popup untuk situs ini.");
      return;
    }

    fetch("display.html")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal mengambil display.html: " + r.status);
        return r.text();
      })
      .then((html) => {
        // tentukan base href ke folder saat ini supaya path relatif di display.html
        // (assets/css, assets/js) akan tetap ter-resolve.
        const baseHref = location.href.replace(/\/[^\/]*$/, "/");
        const htmlWithBase = html.replace(/<head(.*?)>/i, `<head$1><base href="${baseHref}">`);

        popup.document.open();
        popup.document.write(htmlWithBase);
        popup.document.close();
        
        // Tunggu sampai script di popup selesai dimuat
        popup.addEventListener('load', () => {
          // Kirim data terkini ke display yang baru dibuka
          const currentData = getData();
          saveData(currentData);
          sendData(currentData);
        });
      })
      .catch((err) => {
        console.error(err);
        popup.document.open();
        popup.document.write("<p>Gagal memuat tampilan: " + err.message + "</p>");
        popup.document.close();
      });
  }, 300);
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
