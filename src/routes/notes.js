const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes', async (req, res) => {
    try {
        const allNotes = await Note.find()
        res.status(200).json({
            status_code: 200,
            data: allNotes
        })
    } catch (e) {
        res.status(400).json({
            status_code: 400,
            error: error.message
        })
    }
})

router.post('/notes/add', async (req, res) => {
    try {
        const { title, description, category, id } = req.body;
        const newNote = new Note({ title, description, category, id })
        newNote.user = req.user.id;
        await newNote.save()
        res.status(200).json("Success");
        console.log(newNote)
    } catch (error) {
        res.status(400).json({
            status_code: 400,
            error: error.message
        })
    }
});

router.get('/notes/edit/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).json({ status_code: 200, data: note });
    } catch (error) {
        console.log(error)
        res.status(404).json({ status_code: 404, error: error.message })
    }


})

router.put('/notes/edit-note/:id', async (req, res) => {

    try {
        const { title, description, category } = req.body
        await Note.findByIdAndUpdate(req.params.id, { title, description, category })
        res.status(200).json("Success edit", req.params.id)

    } catch (error) {
        console.log(error)
        res.status(404).json({ status_code: 404, error: error.message })
    }


})

router.delete('/notes/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Note.findByIdAndDelete(id)
        res.status(200).json(`Delete task ${id} `)
    } catch (error) {
        console.log(error)
        res.status(400).json({ status_code: 400, error: error.message })
    }
})

module.exports = router