const express = require('express');
const Hoguera = require('../models/Hogueras');
const router = express.Router();

router.get('/', async (req, res) => {
    const hogueras = await Hoguera.find();
    res.json(hogueras);
});

router.post('/', async (req, res) => {
    const nuevaHoguera = new Hoguera(req.body);
    await nuevaHoguera.save();
    res.status(201).json(nuevaHoguera);
});

router.put('/:id', async (req, res) => {
    const actualizada = await Hoguera.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
});

router.delete('/:id', async (req, res) => {
    await Hoguera.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Hoguera eliminada' });
});

module.exports = router;