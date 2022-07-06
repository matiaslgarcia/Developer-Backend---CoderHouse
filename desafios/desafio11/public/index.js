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

  const newMessage = {
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
      text: document.getElementById("text").value 
    }
  sockets.emit("new-message", newMessage);
  return false
}

function renderMessage(data) {
  document.getElementById("messages").innerHTML = data.map(msg => {
    return (
      `
            <div class="media w-50 mb-3">
                <div class="media-body ml-3">
                 <p class="text-small mb-0 text-muted">${msg.author.id}</p>
                    <div class="text-general rounded py-2 px-3 mb-2">
                        <p class="text-small mb-0 text-white">
                          <img src=${msg.author.avatar} alt="avatar" style="width: 45px; height: 100%;"> ${msg.text}
                        </p>
                    </div>
                </div>
            </div>
         `
    )
  })
}

function normalizador(data){
    const aut = data.map(msg => {return msg})
    const autoresTodos = {
      id: "100000",
      autores : aut
    }

    const autores = new normalizr.schema.entity('autores')

    const organigrama = new normalizr.schema.entity('organigrama', {
      autor: autores,
      mensajes: [autoresTodos.autores.text]
    })

    const grupo = new normalizr.schema.entity('grupo', {
      autoresTodos: [organigrama]
    })

    function print(objeto) {
      console.log(util.inspect(objeto,false,12,true))
    }

    console.log('Objeto normalizado')
    const normalizedHolding = normalize(autoresTodos, grupo)
    print(normalizedHolding)
}

sockets.on('messages', function(data) {
  renderMessage(data)
  normalizador(data)
  }
)