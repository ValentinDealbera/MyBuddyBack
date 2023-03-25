const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const getDogsByName = require('../controllers/getDogsByName');
const getDogsById = require('../controllers/getDogsById');
const getTemperaments = require('../controllers/getTemperaments');
const postNewDog = require('../controllers/postNewDog');
const deleteDog = require('../controllers/deleteDog');


const router = Router();

// Configurar los routers
router.get('/dogs', getAllDogs)

router.get('/dogs/name', getDogsByName)

router.get('/dogs/:idRaza', getDogsById)

router.get('/temperaments', getTemperaments)

router.post('/dogs', postNewDog)

router.delete('/dogs/:idRaza', deleteDog)
module.exports = router;
