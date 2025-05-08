const mongoose = require('mongoose');
const participanteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    rol: { type: String, enum: ['tentador', 'pareja'], required: true },
    temporada: { type: Number, required: true }
});
module.exports = mongoose.model('Participante', participanteSchema, 'Participantes');