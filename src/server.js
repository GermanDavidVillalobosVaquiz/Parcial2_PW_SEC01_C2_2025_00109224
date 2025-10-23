const app = require('./app');

// Puerto 3130 
const PORT = 3130;

app.listen(PORT, () => {
  console.log(` Servidor escuchando en http://localhost:${PORT}`);
});
