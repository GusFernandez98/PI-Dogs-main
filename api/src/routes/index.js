const { Router } = require('express');
// Importar todos los routers;
const dogsRouter = require('./routeDog');
const temperamentsRouter = require('./routeTemp');
// Ejemplo: const authRouter = require('./auth.js');
 
const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/dogs', dogsRouter);
mainRouter.use('/temperaments', temperamentsRouter);


module.exports = mainRouter;
