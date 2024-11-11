
function nuevoFormulario() {
    document.getElementById("reporteForm").reset();
    checkFormFields();
}

function enviarWhatsApp() {
    const telefono = document.getElementById("telefono").value;
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const mensaje = `Reporte de conducta de ${nombre} - Fecha: ${fecha}`;
    const urlWhatsApp = `https://web.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    html2canvas(document.getElementById("formulario"), { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("ReporteDeConducta.pdf");
    });
}

function checkFormFields() {
    const form = document.getElementById("reporteForm");
    const buttons = document.querySelectorAll(".buttons-container button");
    let allFilled = true;

    form.querySelectorAll("input, select, textarea").forEach(input => {
        if (!input.value) {
            allFilled = false;
        }
    });

    buttons.forEach(button => {
        button.disabled = !allFilled;
    });
}

document.getElementById("reporteForm").addEventListener("input", checkFormFields);
