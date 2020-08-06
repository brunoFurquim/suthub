const google = window.google

let input = $('#inputPais')[0]

let autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode'],
})

let informacoes = {}

autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace()
    informacoes = {
        place,
        nome_pais: place.name
    }
})