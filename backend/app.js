const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const sha256 = require('sha256')

const debug = true
const port = 5001
const dataJson = 'data.json'

// Initializing App
const app = express()
app.use(cors())

const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } })

if (!fs.existsSync(dataJson)) {
    fs.writeFile(dataJson, '[]', function (err) {
        if (err) throw err
        console.log('File is created successfully.')
    })
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file
    const date = new Date()
    const secret = sha256(Math.random().toString(36).substr(2))
    const buffer = fs.readFileSync(dataJson)
    var json = JSON.parse(buffer.toString())
    const newData = {
        file_name: file.filename,
        original_name: file.originalname,
        file_size: file.size,
        secret: secret,
        download_URL: '/download?fileName=' + file.filename,
        delete_URL: '/delete?fileName=' + file.filename,
        upload_date: date,
        expiry_date: date.addDays(7),
        status: 'online',
        download_count: 0
    }
    json.push(newData)
    const data = JSON.stringify(json)
    fs.writeFileSync(dataJson, data)
    res.send(newData)
})

app.get('/download', (req, res) => {
    const fileName = req.query.fileName
    //const secret = req.query.secret

    const filePath = './uploads/' + fileName
    res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName))
    res.setHeader("Content-Type", "binary/octet-stream")
    var fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
})

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}/`)
})