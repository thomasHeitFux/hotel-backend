const { Router } = require("express");
const router = Router();
const gastoServices = require("./gastos.services")

router.get('/', gastoServices.getGastos);
router.post('/', gastoServices.registerGasto);
router.delete('/delete/:id', gastoServices.deleteGasto);
router.patch('/edit',gastoServices.updateGasto)
// router.post('/login', userServices.loginUser);

module.exports = router;