
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/auth');
const fs = require('fs-extra');
const path = require('path');

const route = express.Router();

const userModel = require('../models/userModel');

route.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        if (!name || !email || !password) {
            return res.json({ message: 'Please enter all the details' });
        }

        const userExist = await userModel.findOne({ email });
        const loginExist = await userModel.findOne({ name });
        if (userExist || loginExist) {
            return res.json({ message: 'Пользователь с таким Email или Логином уже существует!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();

        const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        return res.cookie("token", token).res.status(302).redirect('http://localhost:5173/dashboard');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


})

route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        let userExist = await userModel.findOne({ email: req.body.email });
        if (!userExist) {
            userExist = await userModel.findOne({ name: req.body.email });
            if (!userExist) {
                return res.json({ message: 'Wrong credentials' })
            }
        }
        const isPasswordMatched = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatched) {
            return res.json({ message: 'Wrong credentials pass' });
        }
        const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie("token", token)
        return res.status(302).redirect('http://localhost:5173/dashboard');
    } catch (error) {
        return res.json({ error: error });
    }

})

route.get('/user', isAuthenticated, async (req, res) => {
    try {
        const user = req.user; 
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

route.get('/userfolders', isAuthenticated, async (req, res) => {
    try {
        const user = req.user; 
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        const userFolderPath = path.join(__dirname, '../userfolders', user.name);

        console.log(userFolderPath);
        if (!fs.existsSync(userFolderPath)) {
            const defaultTemplate = path.join(__dirname, '../userfolders', '/default')
            console.log(defaultTemplate);
            fs.copySync(defaultTemplate, userFolderPath);
        }

       

        return res.json({ success: true, message: 'User folder created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

route.post('/uploadfile', isAuthenticated, async (req, res) => {
    try {

        const user = req.user.name; 

        const file = req.body

        // console.log(file);
        console.log(user);
        const userFolderPath = path.join(__dirname, '../userfolders', user);
        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
        }

        const userFolderPathFile = path.join(__dirname, '../userfolders', user.toString(), file.filename);

        fs.writeFileSync(userFolderPathFile, file.filecontent)

        console.log(userFolderPath);
        return res.json({ success: true, message: 'popa' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

route.get('/readfolder', isAuthenticated, async (req, res) => {
    try {

        const user = req.user.name; // Получение информации об авторизованном пользователе из объекта req.user
        const userFolderPath = path.join(__dirname, '../userfolders', user);

        // let userFolderFiles = fs.readdirSync(userFolderPath);

        // console.log(userFolderFiles); // Здесь будут доступны файлы из каталога

        function scanDirectory(directoryPath) {
            let files = [];

            const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

            entries.forEach(entry => {
                const fullPath = path.join(directoryPath, entry.name);
                if (entry.isDirectory()) {
                    files.push([
                        entry.name,
                        scanDirectory(fullPath)
                    ]);
                } else {
                    files.push(entry.name);
                }
            });

            return files;
        }

        const userFolderFiles = scanDirectory(userFolderPath);

        // console.log(userFolderFiles);
        // console.log(userFolderPath);

        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
        }


        return res.json({ userFolderFiles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

route.post('/createfolder', isAuthenticated, async (req, res) => {
    try {

        console.log(req.body.folder);
        const user = req.user.name; 
        const folderName = req.body.folder;

        const userFolderPath = path.join(__dirname, '../userfolders', user);

        const createFolderPath = path.join(userFolderPath, folderName);

        console.log(createFolderPath);
  
        fs.mkdirSync(createFolderPath);


        const userFolderFiles = fs.readdirSync(userFolderPath);

        return res.json({ userFolderFiles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

route.post('/delete', isAuthenticated, async (req, res) => {
    try {

        console.log(req.body);
        const user = req.user.name;

        const userFolderPath = path.join(__dirname, '../userfolders', user);

        fs.remove(userFolderPath + req.body.path);

        const userFolderFiles = fs.readdirSync(userFolderPath);

        return res.json({ userFolderFiles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

 


module.exports = route;