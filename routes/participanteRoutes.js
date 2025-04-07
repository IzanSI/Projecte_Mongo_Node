const express = require('express');
const Participante = require('../models/Participantes');
const router = express.Router();
router.get('/', async (req, res) => {
    const participantes = await Participante.find();
    res.json(participantes);
});
router.post('/', async (req, res) => {
    const nuevoParticipante = new Participante(req.body);
    await nuevoParticipante.save();
    res.status(201).json(nuevoParticipante);
});
module.exports = router;
