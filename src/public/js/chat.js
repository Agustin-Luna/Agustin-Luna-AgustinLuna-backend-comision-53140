const socket = io();

let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msg => {
    data = msg; // Corregir la asignación aquí
});

socket.on ('messageLogs', msgs => {
    renderizar(msgs);
});

// Llamar a renderizar después de obtener los mensajes iniciales del servidor
socket.emit('obtenerMensajes', mensajes => {
    renderizar(mensajes);
});

const renderizar = (msgs) => {
    let messages = '';
    
    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}"> ${message.user}: ${message.message}</div>`;
    });
    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
};

Swal.fire({
    title: "Identificate",
    input: "email",
    text: "Ingresa tu correo electronico para identificarte",
    inputValidator: (value) => {
        if (!value) 
            return 'Necesitas ingresar un correo electronico para continuar';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(value))
            return 'Ingresa un correo electronico valido';
        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if(result.isConfirmed){
        user = result.value;
        // Renderizar después de obtener el usuario
        renderizar(data);
    }
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0) {
            const message = chatBox.value;
            socket.emit('message', {user, message});
            chatBox.value = '';
        }
    }
});

socket.on('nuevo_user', () => {
    Swal.fire({
        title: "Se conecto un nuevo usuario",
        toast: true,
        position: "top-rigth" // Corregir la posición a "top-right"
    });
});
