
const { Gasto, Estructura, Tipo, Metodo, Responsable, Detalle } = require('../db');
const uuid = require('uuid');

const createOptions = () => {
    const data = {
        tipo: ["tipo fijo", "Tipo variable", "ingreso"],
        detalle: ["gas", "mobil", "lavanderia", "limpieza", "tim", "condominio", "pago de alquiler", "luce", "front office", "attivazione vikey", "productos de limpieza", "manuntencion ordinaria", "manuntencion condicionadores", "tv plasma", "montaggio tv", "ikea biancheria", "phone per capelli", "ingreso de alquileres"],
        metodo: ["bonifico", "carta", "cash", "paypal", "revoult"],
        estructura: ["via goitp 17", "via villafranca 2", "via degli ammiragli 67"],
        responsable: ["ana vasquez", "otro"]
    }
    data.detalle.map(e => { return Detalle.findOrCreate({ where: { name: e } }) })
    data.tipo.map(e => { return Tipo.findOrCreate({ where: { name: e } }) })
    data.metodo.map(e => { return Metodo.findOrCreate({ where: { name: e } }) })
    data.estructura.map(e => { return Estructura.findOrCreate({ where: { name: e } }) })
    data.responsable.map(e => { return Responsable.findOrCreate({ where: { name: e } }) })
}
const getGastosController = async () => {
    createOptions();
    const data = await Gasto.findAll({
        include:[
            {
              model: Tipo,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
                model: Estructura,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
              {
                model: Metodo,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
              {
                model: Responsable,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
              {
                model: Detalle,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
          ],
    })
      
    return data
}
const createGastos = async (data) => {
    const newGasto = await Gasto.create({
        id: uuid.v4(),
        fecha: data.fecha,
        importe: data.importe,
    })
    const responsableDb = await Responsable.findAll({
        where: { name: data.responsable }
    })
    let metodoDb = await Metodo.findOne({
        where: { name: data.metodo }
    })
    let TipoDb = await Tipo.findOne({
        where: { name: data.tipo }
    })

    let estructuraDb = await Estructura.findOne({
        where: { name: data.estructura }
    })
    let detalleDb = await Detalle.findOne({
        where: { name: data.detalle }
    })

    newGasto.addResponsable(responsableDb);
    newGasto.addMetodo(metodoDb)
    newGasto.addTipo(TipoDb)
    newGasto.addEstructura(estructuraDb)
    newGasto.addDetalle(detalleDb);

    return newGasto
}

module.exports = {
    getGastosController,
    createGastos
}