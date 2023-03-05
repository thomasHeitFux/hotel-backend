
const { Gasto } = require('../db');
const uuid = require('uuid');


const getGastosController = async () => {
  // createOptions();
  const data = await Gasto.findAll({})

  return data
}
const createGastos = async (data) => {
  const newGasto = await Gasto.create({
    id: uuid.v4(),
    fecha: data.fecha,
    importe: data.importe,
    responsable: data.responsable,
    metodo: data.metodo,
    tipo: data.tipo,
    estructura: data.estructura,
    detalle: data.detalle
  })
  return newGasto
}
const deleteController = async (id) => {
  // return `el id es ${id}`
  try {
    Gasto.destroy({
      where: { id: id }
    })
    return ("DELETED")

  } catch (error) {
    console.log(error);
    return id
  }
}


module.exports = {
  getGastosController,
  createGastos,
  deleteController
}