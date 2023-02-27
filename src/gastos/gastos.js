const { Router } = require("express");
const router = Router();
const gastoServices = require("./gastos.services")

router.get('/', gastoServices.getGastos);
router.post('/', gastoServices.registerGasto);
// router.patch('/',userServices.updateMyUser)
// router.delete('/delete',userServices.deleteAnUser)
// router.post('/login', userServices.loginUser);

module.exports = router;