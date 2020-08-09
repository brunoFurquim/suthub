let buscar = async (pais) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/name/${pais}`)
    console.log("RESPONDEEEEEEEEEEEE", response)
    let info = response.data.find(elemento => elemento.translations.br === pais)
    return info !== undefined ? info : response.data[0]
}

let buscar_info_brasil = async () => await buscar('Brasil')

let buscarIdioma = async (idioma) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/lang/${idioma}`)
    return response.data;
}
