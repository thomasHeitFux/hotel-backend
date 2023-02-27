const { Router } = require("express");
const router = Router();
const {Estructura} = require('../db')


router.get('/', async (req,res) => {
    const data = await Estructura.findAll();
    const dataName = data.map( e => e.name)
    res.send(dataName)
});
// router.post('/', gastoServices.registerGasto);
// router.patch('/',userServices.updateMyUser)
// router.delete('/delete',userServices.deleteAnUser)
// router.post('/login', userServices.loginUser);

module.exports = router;