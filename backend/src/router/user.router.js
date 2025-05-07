const { Router } = require('express');

const UserController = require('../controllers/user.controller');

const router = Router();
const controller = new UserController();

router.route('/')
  .get((req, res) => controller.list(req, res))
  .post((req, res) => controller.create(req, res));

router.route('/:username')
  .get((req, res) => controller.retrieve(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.delete(req, res));

module.exports = router;
