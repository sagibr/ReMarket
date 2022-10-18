const express = require(`express`);
const router = express.Router();

const User = require(`../../models/user`);
const Items = require("../../models/item");

const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

router.get("/users", verifyRoles(ROLES_LIST.Admin), (req, res, next) => {
  User.find()
    .then((data) => res.json(data))
    .catch(next);
});

router.delete(`/users/:id`, (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.delete("/items/:id", verifyRoles(ROLES_LIST.Admin), (req, res, next) => {
  Items.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
