const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const isAuthenticated = require('./middleware/auth');


dotenv.config({ path: './config/config.env' });
require('./config/conn');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

const route = require('./routes/userRoute');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.json());


app.use('/api', route);





app.get('/userfolders', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.name;
        const userFolderPath = path.join(__dirname, 'userfolders', userId.toString());


        if (!fs.existsSync(userFolderPath)) {
            fs.mkdirSync(userFolderPath);
            const defaultTemplate = path.join(__dirname, './userfolders', 'default')
            console.log(defaultTemplate);
            fs.copySync(defaultTemplate, userFolderPath);
        }

        const userApp = express();

        userApp.use(express.static(userFolderPath));






        app.use('/userfolders', userApp); 

        return res.json({ success: true, message: 'User folder created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});







//listening to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at ${process.env.PORT}`);
})

