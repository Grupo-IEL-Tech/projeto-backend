const router = require('express').Router();
const controller = require('../controllers/categoryController');
const auth = require('../middleware/auth');
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.remove);
module.exports = router;
