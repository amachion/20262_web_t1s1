const express = require ('express')
const cors = require ('cors')

const app = express()
app.use(express.json())
app.use(cors())

let filmes = [
    {
        titulo: "Verity",
        sinopse: "Contratada para ser a escritora fantasma da renomada autora Verity Crawford, a tarefa de Lowen Ashleigh toma um rumo sombrio quando ela descobre notas autobiográficas arrepiantes. Diante de uma série de segredos de família mortais, Lowen luta para separar a ficção da realidade enquanto também confunde os limites com o marido de Verity.",
    },
    {
        titulo: "Poderoso Chefão",
        sinopse: "Uma família mafiosa luta para estabelecer sua supremacia nos Estados Unidos depois da Segunda Guerra Mundial. Uma tentativa de assassinato deixa o chefão Vito Corleone incapacitado e força os filhos Michael e Sonny a assumir os negócios.",
    },
]

//GET - http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi')
})

//GET - http://localhost:3000/filmes
app.get ('/filmes', (req, res) => {
    res.json(filmes)
})

//POST - http://localhost:3000/filmes
app.post ('/filmes', (req, res) => {
    //pega o que o usuario digita
    let titulo = req.body.titulo
    let sinopse = req.body.sinopse
    //monta o json
    let filme = {titulo: titulo, sinopse: sinopse}
    //acrescenta o filme ao vetor de filmes
    filmes.push(filme)
    res.json(filmes)
})


app.listen(3000, () => console.log('servidor na escuta'))