const pdfService = require('../../service/v1/pdfService')

const generatePdf = async (req, res) => {
    try {
        const pdfData = req.body
        const pdfBuffer = await pdfService.generatePdf(pdfData)
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=Title.pdf',
        });
        res.send(pdfBuffer);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    generatePdf
}