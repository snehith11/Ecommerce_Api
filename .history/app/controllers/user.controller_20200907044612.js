require('dotenv').config()
const path = require("path");
// const { request } = require("http");
// const { product  = require("../models");
var jwt = require("jsonwebtoken");
const db = require(path.join(__dirname, "./../models"));
const User = db.user;
let refreshTokens=[]

function accessTokenGenerator(user) {
    return jwt.sign(user,process.env.access_secret_key,{expiresIn:"35s"});
}

exports.create = (req, res) => {
  if (!req.body.fullname || !req.body.username || !req.body.password) {
    return res.status(400).send("Fields Cannot be Empty");
  }
  // req.body.password = Bcrypt.hashSync(req.body.password, 10);
  let user = new User({
    fullName: req.body.fullname,
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save(user)
    .then((body) => {
      res.status(200).send(body);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "The username does not exist" });
      }
      User.comparePassword(request.body.password, (error, match) => {
        if (!match) {
          return response
            .status(400)
            .send({ message: "The password is invalid" });
        }
      });
      const user1 = { name: req.body.username };
      const accessToken = accessTokenGenerator(user1);
      const refreshToken = jwt.sign(user1, process.env.refresh_secret_key);
      refreshTokens.push(refreshToken);
      res.send({ accessToken, refreshToken });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.refresh= (req,res)=>{
    const refreshToken=req.body.refreshToken;

    if(refreshToken==null)
    res.sendStatus(401);

    //the token that is provided by user , is present with me or not

    if(!refreshTokens.includes(refreshToken))
    res.sendStatus(403);

    jwt.verify(refreshToken,process.env.refresh_secret_key,(err,user)=>
    {
    if(err)
    res.sendStatus(403)
    const accessToken=accessTokenGenerator({name:user.name});
    res.json({accessToken});
   })
}

exports.logout= (req,res)=>{
    const refreshToken=req.body.refreshToken;
    refreshTokens=refreshTokens.filter(token=>token!=refreshToken);

    res.send({logout:true})
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Product.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      });
  };

module.exports= authenticateToken(req,res,next)
{

    const authHeader=req.headers['authorization'];
    const jwtToken= authHeader && authHeader.split(' ')[1];

    if(jwtToken==null)
     res.sendStatus(401);

     jwt.verify(jwtToken,process.env.access_secret_key,(err,user)=>
    {
        if(err)
        return res.sendStatus(403);

        req.user=user;
        console.log(user)
        next();
    });

}