const { Router } = require("express");
const router = Router();


const userRouter = require("../gastos/gastos");
const detalleRouter = require("../detalles/detalles");
const estructurasRouter = require("../estructuras/estructuras");
const metodosRouter = require("../metodos/metodos");
const tiposRouter = require("../tipos/tipos")

router.use("/",userRouter);
router.use("/detalles",detalleRouter);
router.use("/estructuras",estructurasRouter);
router.use("/metodos",metodosRouter);
router.use("/tipos",tiposRouter);


module.exports = router;