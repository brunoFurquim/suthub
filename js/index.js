//busca informacoes de um pais recebendo nome como parametro
let buscar = async (pais) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/name/${pais}`)
    let info = response.data.find(elemento => elemento.translations.br === pais)
    return info !== undefined ? info : response.data[0]
}

//busca informacoes do brasil
let buscarInfoBrasil = async () => await buscar('Brasil')

//busca paises que falam idioma passado como parametro
let buscarIdioma = async (idioma) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/lang/${idioma}`)
    return response.data;
}

//busca informacoes de todos os paises
let todosPaises = async() => {
    let response = await axios.get('https://restcountries.eu/rest/v2/all')
    return response.data
}

//lista blocos regionais
let listarBlocosRegionais = async () => {
    let paises = await todosPaises()
    paises = paises.map(pais => {
        return pais.regionalBlocs[0] !== undefined ? pais.regionalBlocs[0] : undefined
    })
    
    let blocosRegionais = []
    paises.forEach(pais => {        
        if (pais !== undefined) {
            let paisObjeto = {
                nome: pais.name,
                acronimo: pais.acronym,
            }
            let index = blocosRegionais.findIndex(bloco => bloco.nome === paisObjeto.nome)
            if (index === -1) blocosRegionais.push(paisObjeto)
        }       
    })
    return blocosRegionais;
}

//busca paises que pertencem ao bloco regional passado como parametro
let buscarBlocoRegional = async (acronimo) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/regionalbloc/${acronimo}`)
    return response.data
}

//lista blocos regionais como botões (que abrem um modal mostrando paises pertencentes ao bloco regional selecionado)
let criarListaBlocosRegionais = async () => {
    let blocosRegionais = await listarBlocosRegionais()
    let listaBlocosRegionais = $('#listaBlocosRegionais')[0]
    listaBlocosRegionais.innerHTML = ''

    let li;
    blocosRegionais.forEach((bloco) => {
      li = document.createElement('li')
      li.innerHTML = `<button class="btn btn-secondary mt-2" id="${bloco.acronimo}">${bloco.nome}</button>`
      listaBlocosRegionais.appendChild(li)

      $(`#${bloco.acronimo}`).click(async () => {
        let response = await buscarBlocoRegional(bloco.acronimo)
        let paises = response.map(pais => {
          return {
            nome: pais.translations.br === undefined ? pais.name : pais.translations.br,
            latitude: pais.latlng[0],
            longitude: pais.latlng[1]
          }
        })

        let listaPaisesBlocoRegional = $('#listaPaisesBlocoRegional')[0]
        listaPaisesBlocoRegional.innerHTML = ''
        let liPaisBlocoRegional;
        paises.forEach(pais => {
          liPaisBlocoRegional = document.createElement('li')
          liPaisBlocoRegional.innerText = `${pais.nome} - (lat: ${pais.latitude}, long: ${pais.longitude})`
          listaPaisesBlocoRegional.appendChild(liPaisBlocoRegional)
        })

        $('#modalPaisesBlocoRegional').modal('show')
      })
    })
  }
