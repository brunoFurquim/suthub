let info_brasil = {}

$('#botaoPesquisaBrasil').click(async () => {
    var dados = await buscarInfoBrasil()

    info_brasil = {
        nome: dados.nativeName,
        capital: dados.capital,
        dinheiro: dados.currencies[0].name,
        fusosHorarios: dados.timezones,
        linguagens: dados.languages.map(linguagem => linguagem.nativeName),
        populacao: dados.population,
        subregiao: dados.subregion,
        dominioPrincipal: dados.topLevelDomain[0],
        bandeira: dados.flag,
    }

    //adiciona informações sobre o brasil em uma tabela
    let tabela = $('#tableInformacoesBrasil')[0]
    if (tabela.rows.length == 2)
        tabela.deleteRow(1)
    let linha = tabela.insertRow(1)
    let coluna;
    Object.values(info_brasil).forEach((elemento, indice) => {
        //não insere a ultima propriedade na tabela
        if (indice !== 8) {
            coluna = linha.insertCell(indice)
            if (indice === 3) coluna.innerHTML = '<button class="btn btn-outline-info" id="visualizarFusos" data-toggle="modal" data-target="#modalFusos">Visualizar</button>'
            else coluna.innerHTML = elemento
        }
    })

    //adiciona fusos horários na lista em um modal
    let listaFusos = $('#modalFusosList')[0]
    listaFusos.innerHTML = ''
    let li;
    info_brasil.fusosHorarios.forEach((fuso) => {
        li = document.createElement('li')
        li.innerText = fuso
        listaFusos.appendChild(li)
    })
})


$('#botaoPesquisaPaises').click(async () => {
    let pais = informacoes.nome_pais

    let response = await buscar(pais)
    console.log('Response', response)
    let linguagens = response.languages.map(linguagem => {
        return {
            codigo: linguagem.iso639_1,
            nome: linguagem.name
        }
    })

    let listaIdiomas = $('#listaIdiomasOficiais')[0]
    listaIdiomas.innerHTML = ''
    let li;
    linguagens.forEach(linguagem => {
        li = document.createElement('li')
        li.innerHTML = `<button class="btn btn-outline-primary mb-2" id="${linguagem.codigo}">${linguagem.nome}</button>`
        listaIdiomas.appendChild(li)

        $(`#${linguagem.codigo}`).click(async () => {
            let response = await buscarIdioma(linguagem.codigo)
            //PAROU AQUI, JA TA RETORNANDO OS PAISES QUE FALAM CADA IDIOMA
            console.log(response)
            let liIdioma;
            let lista = response.map(pais => pais.name)
            let listaIdiomasModal = $('#modalIdiomasList')[0]
            listaIdiomasModal.innerHTML = ''
            lista.forEach(pais => {
                liIdioma = document.createElement('li')
                liIdioma.innerText = pais;
                listaIdiomasModal.appendChild(liIdioma)
            })

            $('#modalIdiomas').modal('show');
        })
    })
})
