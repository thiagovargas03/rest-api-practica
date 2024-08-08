const {Router} = require('express');
const router = Router();
const _ = require('underscore')//Utilizo underscore para recorrer el arreglo de peliculas y poder remover con DELETE

//Vuelvo a crear y utilizar el metodo router de express
const movies = require('../sample.json')//meto en una variable los datos almacenados en el json que contiene las peliculas 

//Metodo para conseguir informacion de nuestra REST API
router.get('/', (req,res) =>{
    res.json(movies)
})

//Metodo para crear de nuestra REST API
router.post('/',(req,res)=>{
    const {Titulo,Año,Director,Rating} = req.body;//obtengo los datos (estoy utilizando postman)
    if (Titulo && Año && Director && Rating) {//los valido
        const id = movies.length + 1; // creo el id basado en las peliculas ya existentes el archivo de movies.
        const newMovie = {id,...req.body}//almaceno la nueva pelicula luego de validar los datos y con su respectivo id
        movies.push(newMovie)//empujo la nueva pelicula en el servidor(no altero el archivo de peliculas,esta nueva pelicula solo existe mientras el servidor este levantado)
        res.json(movies)//muestro las peliculas

    } else{
        res.status(500).json({error:'Hubo un error.'})//error por si no se ingreso algun dato, envia tambien el status 500 que es error interno
    }    
})

//Metodo para borrar de nuestra REST API
router.delete('/:id' , (req,res) => {
    const {id} = req.params // Consigo el id de la request
    _.each(movies , (movie,i)=>{//Recorro todo el arreglo de peliculas, obteniendo una pelicula por cada vez que se recorre
        if (movie.id == id) {//Si un id del array matchea con el id de la request
            movies.splice(i,1)//Al matchear, remueve esa pelicula
        }
    })
    res.send(movies)
})
//Metodo para actualizar datos de nuestra REST API
router.put('/:id', (req,res) =>{
    const {id} = req.params //Consigo el id de la pelicula a modificar
    const {Titulo,Año,Director,Rating} = req.body//Consigo los datos que voy a actualizar
    if (Titulo && Año && Director && Rating) {//Verifico que esten todos presentes
        _.each(movies,(movie,i)=>{//Recorro todo el arreglo de peliculas, obteniendo una pelicula por cada vez que se recorre
            if (movie.id == id) {//Si un id del array matchea con el id de la request, actualiza los datos, reemplazandolos con los ingresados
                movie.Titulo = Titulo
                movie.Año = Año
                movie.Director = Director
                movie.Rating = Rating 
            }
        })
        res.json(movies)
    }else{
        res.status(500).json({error:'Hubo un error.'})
    }
})


module.exports= router ;