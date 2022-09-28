
const createCartAndRenderView = async () => {
    fetch(`/api/carrito/`, {
        method: 'POST',
    }).then(
        response => response.json()
            .then(
                data => (
                    fetch(`api/carrito/${data}/productos`,{
                            method: 'GET'
                         }).then(re=> re))))
}