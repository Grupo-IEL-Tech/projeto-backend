module.exports = {
  openapi: '3.0.3',
  info: { title: 'Digital Store API', version: '1.0.0', description: 'API REST do projeto final de Back-end.' },
  servers: [{ url: 'http://localhost:3000' }],
  components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } },
  paths: {
    '/health': { get: { summary: 'Verifica se a API está online', responses: { 200: { description: 'API online' } } } },
    '/v1/user': { post: { summary: 'Cadastrar usuário', responses: { 201: { description: 'Criado' }, 400: { description: 'Dados inválidos' } } } },
    '/v1/user/token': { post: { summary: 'Gerar token JWT', responses: { 200: { description: 'Token gerado' }, 400: { description: 'Credenciais inválidas' } } } },
    '/v1/user/{id}': {
      get: { summary: 'Buscar usuário', responses: { 200: { description: 'Encontrado' }, 404: { description: 'Não encontrado' } } },
      put: { summary: 'Atualizar usuário', security: [{ bearerAuth: [] }], responses: { 204: { description: 'Atualizado' } } },
      delete: { summary: 'Excluir usuário', security: [{ bearerAuth: [] }], responses: { 204: { description: 'Excluído' } } }
    },
    '/v1/category/search': { get: { summary: 'Listar categorias', responses: { 200: { description: 'Lista' } } } },
    '/v1/category': { post: { summary: 'Criar categoria', security: [{ bearerAuth: [] }], responses: { 201: { description: 'Criada' } } } },
    '/v1/category/{id}': {
      get: { summary: 'Buscar categoria', responses: { 200: { description: 'Encontrada' } } },
      put: { summary: 'Atualizar categoria', security: [{ bearerAuth: [] }], responses: { 204: { description: 'Atualizada' } } },
      delete: { summary: 'Excluir categoria', security: [{ bearerAuth: [] }], responses: { 204: { description: 'Excluída' } } }
    },
    '/v1/product/search': { get: { summary: 'Listar produtos', responses: { 200: { description: 'Lista' } } } },
    '/v1/product': { post: { summary: 'Criar produto', security: [{ bearerAuth: [] }], responses: { 201: { description: 'Criado' } } } },
    '/v1/product/{id}': {
      get: { summary: 'Buscar produto', responses: { 200: { description: 'Encontrado' } } },
      put: { summary: 'Atualizar produto', security: [{ bearerAuth: [] }], responses: { 204: { description: 'Atualizado' } } },
      delete: { summary: 'Excluir produto', security: [{ bearerAuth: [] }], responses: { 204: { description: 'Excluído' } } }
    }
  }
};
