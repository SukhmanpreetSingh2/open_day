const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = form.querySelector("input[name='file']");
    if (fileInput.files.length === 0) {
        alert("Seleziona un file!");
        return;
    }

    const file = fileInput.files[0];
    const allowedExtensions = ["csv", "xlsx"];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
        alert("Solo file CSV o XLSX sono consentiti!");
        return;
    }

    if (file.size > 16 * 1024 * 1024) {
        alert("Il file è troppo grande (max 16MB)!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        alert(data.message);

    } catch (error) {
        console.error(error);
        alert("Errore durante l'invio del file.");
    }
});
