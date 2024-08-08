const express = require ('express')
const app = express();
const morgan = require('morgan')

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);   

//Middleware
app.use(morgan('dev'))//comienzo a utilizar morgan, que me permite ver lo que va llegando al servidor
app.use(express.urlencoded({extended:false}))//usamos este metodo para poder recibir la informacion obtenida de inputs en formularios.
app.use(express.json())//usamos este metodo para que el servidor pueda recibir el formato json y entenderlo

//rutas
app.use(require('./routes/index'))
app.use('/api/movies',require('./routes/movies'))//envio los datos de las peliculas desde las rutas creadas en la carpeta routes
app.use('/api/users',require('./routes/users'))//envio datos de los usuarios, pero con node fetch desde otra rest api publica.


//comenzando server
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`)
})