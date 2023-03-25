const {Dog} = require('../db')

const deleteDog = async (req, res) => {
    try {     
        const {idRaza} = req.params
        console.log(idRaza);
        await Dog.destroy({
            where: { id: idRaza }
        })
        res.status(200).json({status: 'deleted succesfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = deleteDog