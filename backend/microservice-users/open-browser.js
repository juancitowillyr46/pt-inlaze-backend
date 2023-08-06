const open = require('open');

// Obtén el puerto configurado para la aplicación
const port = process.env.PORT || 3000;

// Abre el navegador automáticamente con la URL de la aplicación
open(`http://localhost:${port}`);