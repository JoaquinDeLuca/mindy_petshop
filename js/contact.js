
const mostrarAvisoFormulario = (e) => {
    e.preventDefault();

    let contenedorAlerta = document.getElementById('contenedorAlerta');
    contenedorAlerta.innerHTML=`
    <div class="alert alert-success m-2" style="min-height: 7vh;" role="alert" id="miAlertaContact">
        <b>¡Su mensaje ha sido enviado correctamente, gracias por contactarnos!</b>
    </div>
    `;
    setTimeout(() => {
    contenedorAlerta.innerHTML=`
    <div class="alert alert-success m-2" style="min-height: 7vh; display: none;" role="alert" id="miAlertaContact">
        Su mensaje ha sido enviado correctamente, gracias por contactarnos!
    </div>
    `;
    },3000);
    
    document.getElementById("myForm").reset();
}

let botonEnviarForm = document.getElementById('botonAlerta');
botonEnviarForm.addEventListener('click', (e) => mostrarAvisoFormulario(e));