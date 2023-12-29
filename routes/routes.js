const express = require('express')
const UserController = require('../controllers/controller')
const UserController3 = require('../auth middleware/jwt controller')
const router = express.Router();


router.post('/register' ,UserController3.register);
router.post('/login', UserController3.login);
router.get('/verify', UserController3.verify);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router