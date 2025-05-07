const { Router } = require('express');

const MetadataController = require('../controllers/metadata.controller');

const router = Router();

router.get('/health', MetadataController.health);

module.exports = router;
