const { Router } = require("express");
const router = Router();


const userRouter = require("../gastos/gastos");


router.use("/",userRouter);
router.use("/try",(req,res)=>{res.send('hola mundanos')});


module.exports = router;