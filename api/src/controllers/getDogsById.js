const {Dog, Temperament, conn} = require('../db')
const axios = require('axios')

const getDogsById = async (req, res)=>{
    try {
        const {idRaza} = req.params
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll({include: {
            model: Temperament,
            through: {
                attributes: []
            }
        }})
        const formatedDatabaseDogs = dataBaseDogs.map(e=>{
            return {
            id: e.id,
            name: e.name,
            image: e.image,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span,
            temperament: dataBaseDogs[0].temperaments.map(e=>e.dataValues.name)
        }})
        const formatedDogs = dogsApi.data.map(e=>{
            return {
                name: e.name,
                id: e.id,
                image: e.image.url,
                weight: e.weight.metric,
                height: e.height.metric,
                life_span: e.life_span,
                temperament: (e.temperament+'').split(',')
            }
        })
        const allDogs = [...formatedDogs, ...formatedDatabaseDogs]
        const specificDog = idRaza.length > 10 ? allDogs.filter(e=>e.id === idRaza) : allDogs.filter(e=>e.id === Number(idRaza))
        if(idRaza){}
        res.status(200).json(specificDog)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = getDogsById