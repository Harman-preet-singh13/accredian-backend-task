// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User } = require('./database');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            
            res.status(400).json({ message: 'Username or email is already in use.' });
        } else {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//  Sequelize models
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
