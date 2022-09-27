
const createCartAndRenderView = async () => {
    fetch(`/api/carrito/`, {
        method: 'POST',
    }).then( (response) => {
        const id = response
        fetch(`/api/carrito/${id}`,{
            method: 'GET'
        }).then((res) =>{
            console.log(res)
        })
    })
}