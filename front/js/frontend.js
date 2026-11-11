const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLCompleta)).data
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}
async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    //URL completa
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    //se posiciona nos inputs
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    //pega os valores dos inputs
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    if (titulo && sinopse) {
        //limpa as caixinhas
        tituloInput.value = ""
        sinopseInput.value = ""
        //faz a requisição: envia o novo e recebe a coleção atualizada
        const filmes = (await axios.post(URLCompleta, {titulo, sinopse})).data
        //limpa a tabela
        let tabela = document.querySelector('.filmes')
        let corpoTabela = tabela.getElementsByTagName('tbody')[0]
        corpoTabela.innerHTML = ""
        //repopula a tabela
        for (let filme of filmes) {
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            celulaTitulo.innerHTML = filme.titulo
            celulaSinopse.innerHTML = filme.sinopse
        }
    }
    else {
        let alert = document.querySelector('.alert-cadastro-filme')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        setTimeout (() => {
            alert.classList.add('d-none')
            alert.classList.remove('show')
        }, 2000)
    }
}
async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        try {
            const cadastroEndpoint = '/signup'
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post (URLCompleta, {login: usuarioCadastro, password: passwordCadastro})
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Usuário cadastrado com sucesso"
            alert.classList.add('show', 'alert-success')
            alert.classList.remove('d-none', 'alert-danger')
            setTimeout (() => {
                alert.classList.add('d-none')
                alert.classList.remove('show', 'alert-success')
                let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000) 
        }
        catch (e) {
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Usuário já cadastrado"
            alert.classList.add('show', 'alert-danger')
            alert.classList.remove('d-none', 'alert-success')
            setTimeout (() => {
                alert.classList.add('d-none')
                alert.classList.remove('show', 'alert-danger')
                let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000)
        }
    }
    else {
        let alert = document.querySelector('.alert-modal-cadastro')
        alert.innerHTML = "Preencha todos os campos"
        alert.classList.add('show', 'alert-danger')
        alert.classList.remove('d-none', 'alert-success')
        setTimeout (() => {
            alert.classList.add('d-none')
            alert.classList.remove('show', 'alert-danger')
        }, 2000)
    }
}