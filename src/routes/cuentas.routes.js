const { Router } = require('express');
const {
  listCuentas,
  getCuentaById,
  searchCuentas,
  cuentasBalance
} = require('../controllers/cuentas.controller');

const router = Router();

router.get('/cuentas', searchCuentas);
router.get('/cuenta/:id', getCuentaById);
router.get('/cuentasBalance', cuentasBalance);

module.exports = router;
