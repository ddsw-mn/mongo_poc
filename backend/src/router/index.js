const express = require('express');

const UserRouter = require('./user.router');
const MetadataRouter = require('./metadata.router');
const ErrorHandlerRouter = require('./error.handler.router');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(MetadataRouter);

router.use('/users', UserRouter);

router.use(ErrorHandlerRouter);

module.exports = router;
