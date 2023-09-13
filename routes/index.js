const { Router } = require('express');
const UserController = require('../controllers/User.controller');

const router = Router();

router.post('/user', UserController.createUser);
router.get('/users', UserController.findAll);
router.get('/user/:id', UserController.findByPk);
router.delete('/user/:id', UserController.deleteOne)
router.put('/user/:id', UserController.updateOne);

module.exports = router;