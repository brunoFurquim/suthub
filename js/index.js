async function buscar(pais) {
    const response = await axios.get('https://restcountries.eu/rest/v2/all')
    console.log(response)
}

buscar()