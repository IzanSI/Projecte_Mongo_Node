require('dotenv').config();
const hogueraRoutes = require('./routes/hogueraRoutes');
const participanteRoutes = require('./routes/participanteRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/hogueras', hogueraRoutes);
app.use('/participantes', participanteRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectat a MongoDB - IslaDB"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/IslaTentaciones.html');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en marxa a http://localhost:${PORT}`));
