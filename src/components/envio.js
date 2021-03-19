import React, { useState } from "react"

const getRndStr = () =>
  String(Math.floor(Math.random() * 10)) +
  String(Math.floor(Math.random() * 100)) +
  String(Math.floor(Math.random() * 1000)) +
  String(Math.floor(Math.random() * 10000))

const uploadToDropbox2 = (rndName, file, index, onDone, onLoading) => {
  var xhr = new XMLHttpRequest()

  xhr.upload.onprogress = function(evt) {
    var percentComplete = parseInt((100.0 * evt.loaded) / evt.total)
    // Upload in progress. Do something here with the percent complete.
  }

  xhr.onload = function() {
    if (xhr.status === 200) {
      var fileInfo = JSON.parse(xhr.response)
      // Upload succeeded. Do something here with the file info.
    } else {
      var errorMessage = xhr.response || "Unable to upload file"
      // Upload failed. Do something here with the error.
    }
    if (onDone) onDone(true)
  }

  try {
    const path =
      "/Envios/" + rndName + "_" + index + "." + file.name.split(".").pop()
    const t2 =
      "ZQmJldm5GTkFBQUFBQUFBQUFjcDIyRTV2TVloR21EMm5LOTNOR3BsMWx6SXZialNFMEZuQWZtVTIzWlZ6SA"
    const t1 = `VVV${t2}==`;
    const t = atob(t1)
    xhr.open("POST", "https://content.dropboxapi.com/2/files/upload")
    xhr.setRequestHeader("Authorization", `Bearer ${t}`)
    xhr.setRequestHeader("Content-Type", "application/octet-stream")
    xhr.setRequestHeader(
      "Dropbox-API-Arg",
      JSON.stringify({
        path: path,
        mode: "add",
        autorename: false,
        mute: false,
      })
    )
  } catch (e) {
    console.error(e)
    return
  }

  xhr.onerror = function(err) {
    console.error(err)
  }
  xhr.send(file)
  if (onLoading) onLoading(true)
}

const sendData = (e, onLoading, onDone) => {
  e.preventDefault()
  const nome = document.getElementById("nome").value
  const email = document.getElementById("email").value
  const notas = document.getElementById("notas").value
  const local = document.getElementById("local").value
  const latitude = document.getElementById("latitude").value
  const longitude = document.getElementById("longitude").value
  const fotos = document.getElementById("fotos").files
  const uniqueName = getRndStr()
  let blob = new File(
    [
      "Nome: ",
      nome,
      "\nEmail: ",
      email,
      "\nNotas: ",
      notas,
      "\nLocal e Data: ",
      local,
      "\nLatitude ((WGS84 graus decimais):",
      latitude,
      "\nLongitude ((WGS84 graus decimais):",
      longitude,
    ],
    "conteudos.txt",
    {
      type: "application/json",
    }
  )
  uploadToDropbox2(uniqueName, blob, 0)
  for (let i = 0, numFiles = fotos.length; i < numFiles; i++) {
    const foto = fotos[i]
    /*
    if (i === 0) {
      uploadToDropbox(uniqueName, foto, onLoading, onDone)
    } else {
      uploadToDropbox(uniqueName, foto)
    }
    */
    uploadToDropbox2(uniqueName, foto, i, onLoading, onDone)
  }
}

const ThankYouEnvio = ({ onExit }) => (
  <div>
    <h2 className="w-100 tc">Obrigado</h2>
    <p className="w-100 pa3 tc">Em breve entraremos em contacto consigo.</p>
    <div className="w-100 flex items-center justify-center">
      <div className="Button secondary mb3" onClick={onExit}>
        ❤
      </div>
    </div>
  </div>
)

const LoadingEnvio = () => (
  <div>
    <h2 className="w-100 tc">A enviar...</h2>
    <p className="w-100 pa3 tc">
      Por favor aguarde enquanto processamos o envio.
    </p>
  </div>
)

const Envio = (props) => {
  const { onExit } = props;
  const [isDone, setDone] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const formGroupCx = "flex items-center mv3"
  if (isDone) {
    return <ThankYouEnvio onExit={onExit} />
  }
  if (isLoading) {
    return <LoadingEnvio />
  }
  return (
    <div {...props}>
      <h2 className="w-100 tc">Contribua</h2>
      <form
        action="http://localhost:6666/upload"
        method="post"
        className="w-100 ph5"
        enctype="multipart/form-data"
      >
        <div className={formGroupCx}>
          <label for="email">Email do observador* </label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className={formGroupCx}>
          <label for="name">Nome do observador* </label>
          <input type="text" name="nome" id="nome" required />
        </div>
        <div className={formGroupCx}>
          <label for="notas">Nome do mamífero</label>
          <input type="text" name="notas" id="notas" />
        </div>
        <div className={formGroupCx}>
          <label for="local">Data e Local do registo* </label>
          <input type="text" name="local" id="local" required />
        </div>
        <div className={formGroupCx}>
          <label for="Latitude">Latitude (WGS84 graus decimais)* </label>
          <input type="text" name="latitude" id="latitude" required />
        </div>
        <div className={formGroupCx}>
          <label for="Longitude">Longitude (WGS84 graus decimais)* </label>
          <input type="text" name="longitude" id="longitude" required />
        </div>
        <div className={`${formGroupCx} flex-column`}>
          <p className="w-100" for="fotos">Anexo (com foto/vídeo):</p>
          <input
            className="w-90"
            multiple
            id="fotos"
            name="fotos"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="flex justify-between mb3">
          <div className="Button secondary" onClick={onExit}>
            Cancelar
          </div>
          <div className="">
            <input
              type="submit"
              value="Enviar"
              className="Button"
              onClick={e => sendData(e, setLoading, setDone)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Envio
