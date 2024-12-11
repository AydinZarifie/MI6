const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const equipmentRoutes = require("./routes/equipment");
const missionRoutes = require("./routes/mission");
const authRoutes = require("./routes/user");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET , POST, PUT ,DELETE , PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    next();
})

app.use("/equipment",equipmentRoutes);
app.use("/mission",missionRoutes);
app.use("/auth",authRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/MI6').then(()=>{
    app.listen(5000,() => {
        console.log("Server is listening on port 5000 ...!");  
    })
})
