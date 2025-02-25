const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const { spawn } = require('child_process'); // Importar child_process
const mongoose = require("mongoose");
const Image = require('./models/image.js'); //

mongoose.connect('mongodb://localhost:27017/imageDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conectado a MongoDB");
}).catch((err) => {
    console.error("Error conectando a MongoDB:", err);
});


app.use(cors());
//Servir directorio para usar imagenes 
app.use(express.static(path.join(__dirname, './web')));

let cameraProcess = null;

app.get('/ventana', (req, res) => {
    res.sendFile(path.join(__dirname, './web/home.html'));
});
app.get('/historico', (req, res) => {
    res.sendFile(path.join(__dirname, './web/historico.html'));
});
app.get('/fotos', (req, res) => {
    res.sendFile(path.join(__dirname, './web/fotos.html'));
});
app.get('/fotos/:key', (req, res) => {
    const { key } = req.params;
    res.redirect(`/fotos.html?key=${key}`);  // Redirige con la key en la URL
});
app.get('/images', async (req, res) => {
    try {
        const images = await Image.find(); // Obtener todas las imágenes de MongoDB
        res.json(images);
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).json({ error: 'Error al obtener imágenes' });
    }
});
app.get('/images/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const images = await Image.find({ key: key }); // Filtrar imágenes por la clave
        res.json(images);
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).json({ error: 'Error al obtener imágenes' });
    }
});


const port = 4321;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
