document.getElementById("proteinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Mengambil nilai dari input form
  const weight = parseFloat(document.getElementById("weight").value);
  const activityMultiplier = parseFloat(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  if (isNaN(weight) || weight <= 0) {
    alert("Mohon masukkan berat badan yang valid!");
    return;
  }

  // Menentukan rasio g/kg berdasarkan tujuan kesehatan
  let baseRatio = 1.0; // gram per kg berat badan dasar

  if (goal === "maintain") {
    baseRatio = 1.0;
  } else if (goal === "fat_loss") {
    baseRatio = 1.4;
  } else if (goal === "muscle_gain") {
    baseRatio = 1.8;
  }

  // Hitung Kebutuhan Protein Total (Gram)
  const totalProtein = Math.round(weight * baseRatio * activityMultiplier);

  // Menampilkan Hasil ke UI
  document.getElementById("proteinOutput").innerText = `${totalProtein} Gram / hari`;

  // Penjelasan Singkat
  let descText = "";
  if (goal === "maintain") {
    descText = "Jumlah ini ideal untuk menjaga fungsi tubuh dan kesehatan optimal harianmu.";
  } else if (goal === "fat_loss") {
    descText = "Asupan protein yang cukup saat diet membantu menjaga massa otot agar tidak menyusut.";
  } else if (goal === "muscle_gain") {
    descText = "Protein tinggi diperlukan untuk pembentukan jaringan otot baru setelah berolahraga.";
  }
  document.getElementById("resultDescription").innerText = descText;

  // Menghitung rekomendasi makanan sebagai gambaran
  const dadaAyam = Math.round((totalProtein / 31) * 100); // 31g protein per 100g dada ayam
  const telur = Math.round(totalProtein / 6);             // 6g protein per butir telur
  const tempe = Math.round((totalProtein / 19) * 100);    // 19g protein per 100g tempe

  const foodListContainer = document.getElementById("foodList");
  foodListContainer.innerHTML = `
    <li>~${dadaAyam} gram Dada Ayam Rebus</li>
    <li>~${telur} butir Telur Rebus</li>
    <li>~${tempe} gram Tempe Kukus</li>
  `;

  // Sembunyikan form / tampilkan kotak hasil
  document.getElementById("resultBox").classList.remove("hidden");
});

function resetForm() {
  document.getElementById("proteinForm").reset();
  document.getElementById("resultBox").classList.add("hidden");
}
