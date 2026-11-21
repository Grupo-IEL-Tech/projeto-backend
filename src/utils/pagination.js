module.exports = (query) => {
  const limit = Number(query.limit ?? 12);
  const page = Math.max(Number(query.page ?? 1), 1);
  if (!Number.isInteger(limit) || limit === 0 || limit < -1) {
    const error = new Error('O parâmetro limit deve ser -1 ou um inteiro positivo.');
    error.status = 400;
    throw error;
  }
  return { limit, page, options: limit === -1 ? {} : { limit, offset: (page - 1) * limit } };
};
