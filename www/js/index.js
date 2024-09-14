document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Dispositivo pronto');
}

function takePhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

function onSuccess(imageURI) {
    var image = document.getElementById('photo');
    image.src = imageURI;
    uploadPhoto(imageURI);
}

function onFail(message) {
    alert('Falha ao capturar foto: ' + message);
}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://10.0.2.2/projetoFoto/upload.php"), onUploadSuccess, onUploadFail, options);
}

function onUploadSuccess(r) {
    alert("Foto enviada com sucesso: " + r.response);
}

function onUploadFail(error) {
    alert("Erro ao enviar foto: " + error.code);
}
