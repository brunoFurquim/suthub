let buscar = async (pais) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/name/${pais}`)
    console.log("RESPONDEEEEEEEEEEEE", response)
    let info = response.data.find(elemento => elemento.translations.br === pais)
    return info !== undefined ? info : response.data[0]
}

let buscarInfoBrasil = async () => await buscar('Brasil')

let buscarIdioma = async (idioma) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/lang/${idioma}`)
    return response.data;
}

let todosPaises = async() => {
    let response = await axios.get('https://restcountries.eu/rest/v2/all')
    return response.data
}

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

let buscarBlocoRegional = async (acronimo) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/regionalbloc/${acronimo}`)
    return response.data
}
