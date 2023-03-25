const {Dog, Temperament, conn} = require('../db')
const axios = require('axios')

const getAllDogs = async (req, res)=>{
    try {
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll({include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }})
        const formatedDatabaseDogs = dataBaseDogs.map((e,i)=>{
            return {
            id: e.id,    
            name: e.name,
            image: e.image,
            height: e.height,
            weight: e.weight,
            life_span: e.life_span,
            temperament: dataBaseDogs[i].temperaments.map(e=>e.dataValues.name).join(', ')
        }})
        const formatedDogs = dogsApi.data.map(e=>{
            return {
                name: e.name,
                id: e.id,
                image: e.image.url,
                weight: e.weight.metric,
                height: e.height.metric,
                life_span: e.life_span,
                temperament: e.temperament
            }
        })
        res.status(200).json([...formatedDogs, ...formatedDatabaseDogs])
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = getAllDogs