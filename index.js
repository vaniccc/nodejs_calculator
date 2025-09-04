// Plugin Import
const express = require('express');

// Server
const app = express();

// Server port
const PORT = process.env.PORT || 3000;

// ejs als View Engine setzen
app.set('view engine', 'ejs');


// index.ejs rendern
app.get('/', (req, res) => {
    res.render('index', { name: 'Alice'});
})


app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})