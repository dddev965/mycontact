const express = require("express");
const dotenv = require("dotenv").config()
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes')
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app = express();

connectDb()
const port = process.env.PORT || 3000

app.use(express.json());

app.use("/api/contacts", contactRoutes);
// app.use("/api/contacts",require('./routes/contactRoutes'));

app.use("/api/users",userRoutes );
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server runing on port ${port}`);
})