const user = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log({
    message: `${req.method} ${req.baseUrl} not found at ${Date.now()}`,
  });
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  user
    .findById(id)
    .then((possibleUser) => {
      if (possibleUser) {
        req.user = possibleUser;
        next();
      } else {
        next({ message: "user not found", status: 404 });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    next({ status: 400, message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text){
    next({status: 400, message: "missing required text field" })
  }else{
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost}