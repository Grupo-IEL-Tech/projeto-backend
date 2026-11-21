require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com MySQL estabelecida.');
    app.listen(PORT, () => console.log(`Digital Store API em http://localhost:${PORT}`));
  } catch (error) {
    console.error('Não foi possível conectar ao MySQL:', error.message);
    process.exit(1);
  }
}
start();
