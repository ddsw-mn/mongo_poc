module.exports = (err, _req, res, _next) => {
  return res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
}