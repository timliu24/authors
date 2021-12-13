const express = require('express');
const cors = require('cors');
const app = express();
require('./config/mongoose.config');
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AuthorsRoutes = require('./routes/author.routes');
AuthorsRoutes(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000");
});