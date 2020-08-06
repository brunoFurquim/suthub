let buscar = async (pais) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/name/${pais}`)
    return response.data[0]
}

let buscar_info_brasil = async () => await buscar('Brasil')


