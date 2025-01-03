document.getElementById('generateReport').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add a title
    pdf.setFontSize(20);
    pdf.text('Production Report', 10, 10);

    // Add chart image
    const ctx1 = document.getElementById('myChart').getContext('2d');
    const chartImage = ctx1.canvas.toDataURL('image/png');
    pdf.setFontSize(12)
    pdf.text('Overview', 10, 20)
    pdf.addImage(chartImage, 'PNG', 10, 25, 180, 100);

    // Add some text
    pdf.setFontSize(12);
    pdf.text('This report contains sales data for the first half of the year.', 10, 140);

    // Save the PDF
    pdf.save('report.pdf');
    // const { jsPDF } = window.jspdf;
 
    //         let doc = new jsPDF('l', 'mm', [1500, 1400]);
    //         let pdfjs = document.querySelector('#main');
 
    //         doc.html(pdfjs, {
    //             callback: function(doc) {
    //                 doc.save("newpdf.pdf");
    //             },
    //             x: 12,
    //             y: 12
    //         });
});