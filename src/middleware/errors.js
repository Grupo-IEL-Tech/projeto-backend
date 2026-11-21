module.exports = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ message: 'Já existe um registro com esses dados.' });
  }
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ message: err.errors?.map(e => e.message) || 'Dados inválidos.' });
  }
  console.error(err);
  return res.status(err.status || 500).json({
    message: err.status ? err.message : 'Erro interno do servidor.'
  });
};
