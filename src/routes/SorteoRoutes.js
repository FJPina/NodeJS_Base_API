const express = require('express');
const {Listar, Buscar, Eliminar, Modificar, Crear} = require('../controllers/BeneficiariosController');

const router = express.Router();
const seguridad = require('../middlewares/security');

//Rutas
router.get('/', Listar);
router.get('/:id', Buscar);
router.delete('/:id', Eliminar);
router.put('/', Modificar);
router.post('/', Crear);


module.exports = router;