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
        exibeAlerta ('.alert-cadastro-filme', "Preencha todos os campos", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
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
            exibeAlerta ('.alert-modal-cadastro', "Usuário cadastrado com sucesso", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            escondeModal('#modalCadastro', 2000)
        }
        catch (e) {
            exibeAlerta('.alert-modal-cadastro', "Usuário já cadastrado", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
            escondeModal('#modalCadastro', 2000)
        }
    }
    else {
        exibeAlerta('.alert-modal-cadastro', "Preencha todos os campos", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}
function exibeAlerta (seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout (() => {
        alert.classList.add('d-none')
        alert.classList.remove('show')
    }, timeout)
}
function escondeModal(seletor, timeout) {
    setTimeout (() => {
        let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
        modal.hide()
    }, timeout)
}

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
        //chama o back com try catch
    }
    else {
        exibeAlerta ('.alert-modal-login', "Preencha todos os campos", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}