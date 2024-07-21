const PDFDocument = require('pdfkit');

const generatePdf = (pdfData) => {
    return new Promise((resolve, _) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        doc.fontSize(20).text('Pdf', { align: 'center' });
        doc.moveDown();
        const addContent = (data, indent = 0) => {
            Object.keys(data).forEach(key => {
                const value = data[key];
                if (typeof value === 'object' && !Array.isArray(value)) {
                    doc.fontSize(12).text(`${key}:`, { indent });
                    addContent(value, indent + 20);
                } else if (Array.isArray(value)) {
                    doc.fontSize(12).text(`${key}:`, { indent });
                    value.forEach((item) => {
                        addContent(item, indent + 40);
                    });
                } else {
                    doc.fontSize(12).text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, { indent });
                }
                doc.moveDown(0.5);
            });
        };

        // Add content to PDF
        addContent(pdfData);

        doc.end();
    });
};

module.exports = {
    generatePdf,
};