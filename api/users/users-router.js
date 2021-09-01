const express = require("express");
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then(user=>{
      if(user){
        res.status(200).json(user);
      }else{
        res.status(404).json({ message: "user not found" })
      }
    })
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(err=>{
      next(err.message)
    })
});

router.put("/:id", validateUserId, validateUser, (err, req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
