const { Router } =  require('express'); // requiero el metodo router desde express, que me permite definir nuevas rutas para mi servidor
const router = Router(); //Ejecuto Router y lo almaceno

router.get('/',(req,res) => {
    res.json({"Title" : "Hello World"});//le paso un json generico
});

module.exports = router;