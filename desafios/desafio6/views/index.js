const socket = io.connect()

const addProduct = (e) => {
  console.log('entra?')
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  }

  socket.emit('new-product', product)
  return false
}

const render = (data) => {
  document.getElementById("products").innerHTML = data.map(prod => {
    return (
      `
       <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img
                            src="${prod.thumbnail}"
                            alt="image"
                            style="width: 45px; height: 45px"
                    />
                </div>
            </td>
            <td>
                <p class=" mb-1 control-label">${prod.title}</p>
            </td>
            <td>${prod.price}</td>
        </tr>
      `
    )
  })
}

socket.on('products', function (data){
  render(data)
})

