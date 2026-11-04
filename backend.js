const express = require ('express')
const cors = require ('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator').default
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model ("Usuario", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://andreiamachion_db_user:mongo123@cluster0.d7majmq.mongodb.net/`)
}

// let filmes = [
//     {
//         titulo: "Verity",
//         sinopse: "Contratada para ser a escritora fantasma da renomada autora Verity Crawford, a tarefa de Lowen Ashleigh toma um rumo sombrio quando ela descobre notas autobiográficas arrepiantes. Diante de uma série de segredos de família mortais, Lowen luta para separar a ficção da realidade enquanto também confunde os limites com o marido de Verity.",
//     },
//     {
//         titulo: "Poderoso Chefão",
//         sinopse: "Uma família mafiosa luta para estabelecer sua supremacia nos Estados Unidos depois da Segunda Guerra Mundial. Uma tentativa de assassinato deixa o chefão Vito Corleone incapacitado e força os filhos Michael e Sonny a assumir os negócios.",
//     },
// ]

//GET - http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi')
})

//GET - http://localhost:3000/filmes
app.get ('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})
//POST - http://localhost:3000/filmes
app.post ('/filmes',  async (req, res) => {
    //pega o que o usuario digita
    let titulo = req.body.titulo
    let sinopse = req.body.sinopse
    //instancia um objeto do modelo Filme
    let filme = new Filme ({titulo: titulo, sinopse: sinopse})
    //salva o filme
    await filme.save()
    //vai buscar a lista de filmes no banco
    const filmes = await Filme.find()
    res.json(filmes)
})

//POST - http://localhost:3000/signup
app.post ('/signup', async (req, res) =>  {
    try {
        let login = req.body.login
        let password = req.body.password
        const criptografada = await bcrypt.hash(password, 10)
        let usuario = new Usuario({login: login, password: criptografada})
        const respostaMongo = await usuario.save()
        console.log(respostaMongo)
        res.status(201).end()
    }
    catch (e) {
        console.log(e)
        res.status(409).end()
    }
})

app.listen(3000, async() => {
    try {
        await conectarAoMongo()
        console.log('servidor na escuta e banco conectado')
    }
    catch (e) {
        console.log('erro: ', e)
    }
})