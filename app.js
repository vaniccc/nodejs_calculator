// Plugin Import
import express from 'express';
// Server
const app = express();
// Server port
const PORT = process.env.PORT || 3000;
//Route Import
import userRoute from './routes/userRoutes.js';

//Zugriffsordner auf dem Server für statische Dateien
app.use(express.static('public'));

app.use(express.json());

// ejs als View Engine setzen
app.set('view engine', 'ejs');

// index.ejs rendern
app.get('/', (req, res) => {
    res.render('index');
});

// signup.ejs rendern
app.get('/signup', (req, res) => {
    res.render('pages/signup');
});

// calculator.ejs rendern
app.get('/calculator', (req, res) => {
    res.render('pages/calculator');
});

// Routes
app.use('/users', userRoute);

// Server starten
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});