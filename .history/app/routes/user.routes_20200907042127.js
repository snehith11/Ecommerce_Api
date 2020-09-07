module.exports = (app) => {
  const path = require("path");

  const user = require(path.join(
    __dirname,
    "../controllers/user.controller.js"
  ));

  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  //Login a user
  router.post("/login", user.login);
  
  //Refresh
  router.post("/refresh", user.refresh)

//   // Retrieve all User
//   router.get("/", user.findAll);

//   // Retrieve all published User
//   router.get("/published", user.findAllPublished);

//   // Retrieve a single User with id
//   router.get("/:id", user.findOne);

//   // Update a User with id
//   router.put("/:id", user.update);

//   // Delete a User with id
//   router.delete("/:id", user.delete);

//   // Create a new User
//   router.delete("/", user.deleteAll);

  app.use("/api/users", router);
};
