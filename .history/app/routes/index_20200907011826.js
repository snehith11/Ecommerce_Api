module.exports = app =>{
    require(path.join(__dirname,"./product.routes"))(app);
    require(path.join(__dirname,"./user.routes.js"))(app);
}