const {Router} = require('express');
const router = Router();

const fetch = require('node-fetch')//Utilizo fetch para poder extraer los datos desde otra rest api


//Metodo para mostrar usuarios
router.get('/', async (req,res)=>{//declaro el async ya que debo esperar a que se consigan estos datos
    const response = await fetch('https://jsonplaceholder.typicode.com/users')//y posteriormente un await
    const users = await response.json(); //para finalizar almacenando los usuarios en una variable
    res.json(users)
})

module.exports= router ;