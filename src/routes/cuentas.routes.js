const { Router } = require('express');
const {
  listCuentas,
  getCuentaById,
  searchCuentas,
  cuentasBalance,
  isActiveHandler
} = require('../controllers/cuentas.controller');

const router = Router();

router.get('/cuentas', searchCuentas);
router.get('/cuenta/:id', getCuentaById);
router.get('/cuentasBalance', cuentasBalance);
router.get('/isActive', isActiveHandler);

module.exports = router;
