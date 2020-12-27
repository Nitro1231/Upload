const express = require('express');
const cors = require('cors')
const multer = require('multer');
const fs = require('fs');

const debug = true;
const port = 5001;

// Initializing App
const app = express();
app.use(cors())

const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send(req.file);
});

app.get('/download', (req, res) => {
    const fileName = req.query.filename
    //const secret = req.query.secret

    const filePath = './uploads/' + fileName
    res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
    res.setHeader("Content-Type", "binary/octet-stream");
    var fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}/`)
})