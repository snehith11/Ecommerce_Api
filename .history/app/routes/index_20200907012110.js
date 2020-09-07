module.exports = app =>{
    const path= require("path");
    require(path.join(__dirname,"./product.routes"))(app);
    require(path.join(__dirname,"./user.routes"))(app);
}