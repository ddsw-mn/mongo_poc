const { Router } = require('express');

const UserController = require('../controllers/user.controller');

const router = Router();

router.route(('/'))
  .get((req, res) => UserController.list(req, res))
  .post((req, res) => UserController.create(req, res));

router.route('/:username')
  .get((req, res) => UserController.retrieve(req, res))
  .put((req, res) => UserController.update(req, res))
  .delete((req, res) => UserController.delete(req, res));

module.exports = router;
