// Plugin Import
const express = require('express');

// Server
const app = express();

// Server port
const PORT = process.env.PORT || 3000;

//Zugriffsordner auf dem Server für statische Dateien
app.use(express.static('public'));

// ejs als View Engine setzen
app.set('view engine', 'ejs');


// index.ejs rendern
app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/pages', (req, res) => {
    res.render('pages/calculator.ejs');
});

// Routes

// Server starten
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});