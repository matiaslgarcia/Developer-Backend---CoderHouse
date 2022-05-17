const sockets = io.connect()

function addProduct() {
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value
  }
  sockets.emit('new-product', product)
  return false
}

function render(data){
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
                <p class="mb-1 control-label">${prod.title}</p>
            </td>
            <td>${prod.price}</td>
        </tr>
      `
    )
  })
}

sockets.on('products', function(data){
  render(data)
})

function addMessage() {
  let date = new Date();
  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    date: date.toLocaleDateString(),
    hour: date.toLocaleTimeString(),
  }
  sockets.emit("new-message", message);
  return false
}

function renderMessage(data) {
  document.getElementById("messages").innerHTML = data.map(msg => {
    return (
      `
            <div class="media w-50 mb-3">
                <div class="media-body ml-3">
                 <p class="text-small mb-0 text-muted">${msg.email}</p>
                    <div class="text-general rounded py-2 px-3 mb-2">
                        <p class="text-small mb-0 text-white">${msg.message}</p>
                    </div>
                    <p class="small text-muted">${msg.hour} | ${msg.date}</p>
                </div>
            </div>
         `
    )
  })
}

sockets.on('messages', function(data) {
  renderMessage(data)
  }
)

