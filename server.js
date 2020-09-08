const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json("Hello Amazon Clone"));
app.post("/", (req,res)=> console.log(req.body.name))
app.listen(port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(`Amazon clone listening on port port!`)
    }
});
