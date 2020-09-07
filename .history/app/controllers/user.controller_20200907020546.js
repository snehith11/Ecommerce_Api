const path = require("path");
const { request } = require("http");
const { product } = require("../models");
const db = require(path.join(__dirname,"./../models"));
const User = db.user;

exports.create = (req,res)=>{
    if( !req.bosy.name || !req.body.email || !req.body.password){
        return res.status(400).send("Fields Cannot be Empty")
    }
    req.body.password = Bcrypt.hashSync(req.body.password, 10);
    let user= new User({
        fullName : req.body.fullname,
        username: req.body.username,
        password: req.body.password
    })

    user
    .save(user)
    .then(body =>{
        res.status(200).send(body)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      })
}

exports.login= (req,res)=>{
    User.findOne({ username: req.body.username })
    .then(user =>{
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if(!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        response.send({ message: "The username and password combination is correct!" });
    })
    .catch(error=>{
        res.status(500).send(error);
    })
}