const router = require('express').Router();
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/', controller.create); // cadastro inicial público
router.post('/token', controller.token); // login público
router.get('/:id', controller.show);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);
module.exports = router;
