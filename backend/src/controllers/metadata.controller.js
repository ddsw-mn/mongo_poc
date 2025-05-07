const pack = require('../../../package.json');

class MetadataController {

  health(_req, res) {
    res.status(200).json({
      name: pack.name,
      version: pack.version,
      environment: process.env.NODE_ENV || 'development',
    });
  }
}

module.exports = new MetadataController();