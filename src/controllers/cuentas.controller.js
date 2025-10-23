const cuentas = require('../data/cuentas.json');

// GET /cuentas
function listCuentas(req, res) {
  const result = {
    count: cuentas.length,
    data: cuentas
  };
  return res.json(result);
}

// GET /cuenta/:id
function getCuentaById(req, res) {
  const { id } = req.params;
  const account = cuentas.find(c => c.id === String(id));
  const finded = Boolean(account);
  return res.json({
    finded,
    account: account || null
  });
}

// GET /cuentasqueryParam=valor
function searchCuentas(req, res) {
  const { queryParam } = req.query;

  if (!queryParam || queryParam.trim() === '') {
    return listCuentas(req, res);
  }

  const q = queryParam.trim().toLowerCase();

  // Buscar por ID
  const byId = cuentas.find(c => c.id.toLowerCase() === q);
  if (byId) {
    return res.json({ finded: true, account: byId });
  }

  // Buscar por género
  const byGender = cuentas.filter(c => String(c.gender).toLowerCase() === q);
  if (byGender.length > 0) {
    return res.json({ finded: true, data: byGender });
  }

  // Buscar por nombre
  const byName = cuentas.filter(c => c.name.toLowerCase().includes(q));
  if (byName.length > 0) {
    return res.json({ finded: true, data: byName });
  }

  return res.json({ finded: false, account: null, data: [] });
}

// GET /cuentasBalance
function cuentasBalance(req, res) {
  const activos = cuentas.filter(c => c.isActive === true);
  const status = activos.length > 0;
  const accountBalance = activos.reduce((acc, c) => acc + Number(c.balance), 0);

  return res.json({
    status,
    accountBalance: Number(accountBalance.toFixed(2))
  });
}

module.exports = {
  listCuentas,
  getCuentaById,
  searchCuentas,
  cuentasBalance
};
