const {Dog, Temperament, conn} = require('../db')
const axios = require('axios')

const getTemperaments = async (req, res)=>{
    try {
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        let arr = []
        const aux = dogsApi.data.map(e=>{
            return e.temperament + ''
        }).map(e=>{
            return e.split(',')
        })
        for (let i = 0; i < aux.length; i++) {
            for (let x = 0; x < aux[i].length; x++) {
                aux[i][x]
                arr.push(aux[i][x])
            }
        }
        const set = new Set(arr)
        const finalArr = Array.from(set).map(e=>e.trim()).map(element=>{
            return {
                name: element
            }
        })
        const end = await Temperament.bulkCreate(finalArr, {ignoreDuplicates: true})
        const final = await Temperament.findAll()
        res.status(200).json(final)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = getTemperaments