const controllers = require('./gastos.controllers')

const getGastos = async (req, res) => {
    const response = await controllers.getGastosController()
    if (response) { res.status(202).json(response) }
    else { res.status(400).send('anda a saber que paso') }
}

const registerGasto = (req,res)=>{
    const {fecha,importe,responsable,metodo,tipo,estructura,detalle} = req.body;
    if (!fecha||!importe||!responsable||!metodo||!tipo||!estructura||!detalle) {
        res.status(400).send(`No pueden estar vacios los datos`)
    }
    controllers.createGastos({fecha,importe,responsable,metodo,tipo,estructura,detalle})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{res.status(400).send(`sory gor ${err}`)})
}
const deleteGasto = async (req, res) => {
    const {id} = req.params
    console.log(id);
    // res.json({msg:`el id es ${id}`})
    const response = await controllers.deleteController(id)
    if (response) { res.status(202).json(response) }
    else { res.status(400).send('anda a saber que paso') }
}


module.exports = {
    getGastos,
    registerGasto,
    deleteGasto
}