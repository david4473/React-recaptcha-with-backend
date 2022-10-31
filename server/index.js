const express = require("express");
const router = express.Router();
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 2000;

//enabling cors
app.use(cors());

//Parse data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//add router in express app
app.use("/", router);


//POST route
router.post("/post", async (req, res) => {
    const {token, inputVal} = req.body;

    console.log(inputVal);
    console.log(token);
    console.log(
      req.body
    );


    await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
      );

      if (res.status(200)) {
        res.send("Human 👨 👩");
    }else{
      res.send("Robot 🤖");
    }
});

app.listen(port, () =>{
    console.log(`server is running on ${port}`);
});