const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const UserModel = require("./Models/Users");
require('./dbconfig')

const app = express();
app.use(cors())
const PORT = 8000;

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

app.post('/create', (req, res) => {
    console.log('POSTED User', req.body)
    UserModel.create(req.body)
        .then(user => res.json(user).status(201))
        .catch(err => res.send('Error Send Data', err))
})
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    };

    UserModel.findByIdAndUpdate(id, updateData, { new: true })///to compare we pass id as string not as an object
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        })
        .catch((err) => res.status(500).json(err));
});
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(res => res.json(res))
        .catch(err => res.json(err))
})
app.listen(PORT, () => console.log("Server running on port " + PORT));