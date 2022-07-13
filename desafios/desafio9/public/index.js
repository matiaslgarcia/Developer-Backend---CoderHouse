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

// Denormalizacion -------------------------------------------------------------------------------
const schemaAuthor = new normalizr.schema.Entity("authors", {}, {idAttribute: "autores.id"})
const schemaMensaje = new normalizr.schema.Entity("text", {author: schemaAuthor}, {idAttribute: "id"})
const schemaMensajes = new normalizr.schema.Entity("texts",{mensajes: [schemaMensaje]},{idAttribute: "id"})
//------------------------------------------------------------------------------------------------

sockets.on('messages', function(data) {
  let mensajesSize = JSON.stringify(data).length
  let mensajesDenormalizado = normalizr.denormalize(data.result, schemaMensajes,data.entities)
  let mensajesDenormalizadoSize = JSON.stringify(mensajesDenormalizado).length
  let porcentajeCompresion = parseInt((mensajesSize * 100) / mensajesDenormalizadoSize)
  document.getElementById("chat-header").innerText = "Porcentaje de compresión: " + porcentajeCompresion
  renderMessage(mensajesDenormalizado.mensajesNormalizados)
  }
)