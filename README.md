Integrantes: Pedro Henrique e Anderson Oliveira

# 🛒 Digital Store – Back-end

API REST desenvolvida para o projeto **Digital Store**, utilizando Node.js, Express e MySQL. O sistema disponibiliza uma estrutura de back-end para gerenciamento das funcionalidades de uma loja virtual.

## 🚀 Tecnologias utilizadas

- **Node.js** – Ambiente de execução JavaScript.
- **Express** – Framework para criação da API.
- **MySQL** – Banco de dados relacional.
- **JWT** – Autenticação baseada em tokens.
- **Swagger** – Documentação e testes dos endpoints.
- **NPM** – Gerenciamento de dependências.

## 📋 Pré-requisitos

Antes de iniciar, instale:

- Node.js
- NPM
- MySQL Server
- Git

## 📥 Instalação

### 1. Clonar o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd digital-store-backend
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Acesse o MySQL:

```bash
sudo mysql
```

Crie o banco de dados e o usuário:

```sql
CREATE DATABASE digital_store;

CREATE USER 'digital_user'@'localhost'
IDENTIFIED BY 'SUA_SENHA_FORTE';

GRANT ALL PRIVILEGES ON digital_store.*
TO 'digital_user'@'localhost';

FLUSH PRIVILEGES;

EXIT;
```

### 4. Configurar as variáveis de ambiente

Caso exista o arquivo `.env.example`, copie-o:

```bash
cp .env.example .env
```

Abra o arquivo:

```bash
nano .env
```

Configure as variáveis:

```env
PORT=3009

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=digital_store
DB_USER=digital_user
DB_PASSWORD=SUA_SENHA_FORTE

JWT_SECRET=sua_chave_secreta_longa
JWT_EXPIRES_IN=1d
```

**Importante:** Nunca compartilhe o arquivo `.env` ou publique suas senhas e chaves secretas no GitHub.

### 5. Executar as migrations

Para criar as tabelas do banco de dados:

```bash
npm run db:migrate
```

### 6. Iniciar o servidor

Execute:

```bash
npm run dev
```

Se tudo estiver configurado corretamente, a API deverá apresentar mensagens semelhantes a:

```bash
Conexão com MySQL estabelecida.

Digital Store API em http://localhost:3009
```

## 🌐 Testando a API

Com o servidor em execução, acesse:

| Endereço | Descrição |
|---|---|
| http://localhost:3009/health | Verificação de funcionamento da API |
| http://localhost:3009/api-docs | Documentação Swagger |

A documentação Swagger permite visualizar os endpoints disponíveis e realizar testes diretamente pelo navegador.

## 🛠️ Comandos úteis

| Comando | Função |
|---|---|
| `npm install` | Instala as dependências |
| `npm run db:migrate` | Executa as migrations |
| `npm run dev` | Inicia o servidor em desenvolvimento |
| `node -v` | Verifica a versão do Node.js |
| `npm -v` | Verifica a versão do NPM |

## ⚠️ Problemas comuns

**Porta 3009 ocupada:**

```bash
sudo lsof -i :3009
```

**Erro de conexão com MySQL:**

Confira as configurações do arquivo `.env`, principalmente usuário, senha, host e permissões.

**Módulo não encontrado:**

```bash
npm install
```

**Erro ao executar migrations:**

Verifique se está na pasta correta do projeto e se o `package.json` contém o script `db:migrate`.

## 🔒 Segurança

- Não publique o arquivo `.env`.
- Utilize senhas fortes no banco de dados.
- Não compartilhe o JWT_SECRET.
- Mantenha as dependências atualizadas.

## 👨‍💻 Desenvolvimento

Projeto desenvolvido para fins de aprendizado e prática de desenvolvimento back-end, utilizando tecnologias do ecossistema JavaScript.

---

**Digital Store – Back-end**

Desenvolvido com Node.js, Express e MySQL. 🚀
