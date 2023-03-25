const {Dog, Temperament} = require('../db')
const axios = require('axios')

const postNewDog = async (req, res)=>{
    const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataBaseDogs = await Dog.findAll()
        const allDogs = [...dogsApi.data, ...dataBaseDogs]
    try {
        const {name, image, height, weight, life_span, temperament} = req.body
        if (allDogs.find(e=>e.name.toLowerCase() === name.toLowerCase())){
            return res.status(400).json({error: 'La raza ingresada ya existe'})
        }
        if (!name || !image || !height || !weight || !life_span || !temperament){
            return res.status(400).json({error: 'Debes completar todos los datos'})
        }
        const dog = {
            name,
            image,
            height,
            weight,
            life_span
        }
        const newDog = await Dog.create(dog)
        await newDog.addTemperaments(temperament)
        const aux = await Dog.findAll({where:{
            name: name
        },include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }})
        const showDog = {
            name,
            image,
            height,
            weight,
            life_span,
            temperament: aux[0].temperaments.map(e=>e.dataValues.name).join(', ')
        }
        return res.status(201).json(showDog) 
    } catch (error) {
      res.status(500).json({error: error.message})  
    }
}

module.exports = postNewDog