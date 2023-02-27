const controllers = require('./gastos.controllers')

const getGastos = async (req, res) => {
    const response = await controllers.getGastosController()
    if (response) { res.status(202).json(response) }
    else { res.status(400).send('anda a saber que paso') }
}

const registerGasto = (req,res)=>{
    const {fecha,importe,responsable,metodo,tipo,estructura,detalle} = req.body;
    controllers.createGastos({fecha,importe,responsable,metodo,tipo,estructura,detalle})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{res.status(400).send(`sory gor ${err}`)})
}


module.exports = {
    getGastos,
    registerGasto
}