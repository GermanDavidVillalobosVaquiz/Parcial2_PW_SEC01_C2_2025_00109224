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

// GET /cuentas?queryParam=valor
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

// GET /isActive (id=3 opcional)
function isActiveHandler(req, res) {
  const { id } = req.query;

  // Caso A: consultar una cuenta específica
  if (id) {
    const account = cuentas.find(c => c.id === String(id));
    if (!account) {
      return res.status(404).json({
        message: `No se encontró la cuenta con id ${id}`,
        finded: false,
        isActive: null
      });
    }
    return res.status(200).json({
      message: `La cuenta con id ${id} está ${account.isActive ? 'activa' : 'inactiva'}`,
      finded: true,
      isActive: account.isActive,
      account
    });
  }

  // Caso B: sin id → hay alguna cuenta activa?
  const activas = cuentas.filter(c => c.isActive === true);
  const anyActive = activas.length > 0;

  return res.status(200).json({
    message: anyActive ? "Existen cuentas activas" : "No hay cuentas activas",
    anyActive,
    activeCount: activas.length
  });
}

module.exports = {
  listCuentas,
  getCuentaById,
  searchCuentas,
  cuentasBalance,
  isActiveHandler
};
