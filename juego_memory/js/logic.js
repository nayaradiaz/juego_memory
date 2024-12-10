const element = document.getElementById("evento");
element.addEventListener("click", validar);

let valor = null;
let idCarta1 = null;
let idCarta2 = null;
let clickCount = 0;
let contAcertadas = 0;
let contRestantes = 6;

function generar() {
    let num;
    for (let i = 1; i < 13; i++) {
        num = i % 6;

        document.getElementById("generar").innerHTML += `
        <div id=${i} data-value=${num} class="carta bg-no-repeat bg-cover bg-center h-64 w-92 flex flex-col items-center justify-center
            border-solid border-4 border-blue-600 rounded-md"  style="background-image: url('/img/familia.png');">
            
           
        </div>
       
           
        `
    }
}
function validar(e) {
    const carta = e.target;
    num=carta.dataset.value;
    console.log(num)
    let img = `url('/img/pareja${num}.png')`;
    let imgOri=  "url('/img/familia.png')" 
    console.log(img)
    if (carta.classList.contains("carta") && !carta.classList.contains("seleccionada")) {
        carta.classList.add("shadow-2xl","border-gray-500", "seleccionada");
        carta.style.backgroundImage = img;
        if (valor == null && clickCount < 2) {
            console.log("Primera carta");
            idCarta1 = carta.id;
            valorCarta1=carta.dataset.value
            console.log("ID Primera Carta:", idCarta1);
            clickCount = 1;
            valor = 1;
        } 
        else if (valor == 1) {
            console.log("Segunda carta");
            idCarta2 = carta.id;
            valorCarta2=carta.dataset.value

            console.log("ID Segunda Carta:", idCarta2);

            clickCount += 1;

            if (valorCarta1 === valorCarta2) {
                console.log("Son iguales");
                carta.classList.replace("border-gray-500", "border-green-500");
                const carta1 = document.getElementById(idCarta1);
                if (carta1) {
                    carta1.classList.replace("border-gray-500", "border-green-500");
                }
                contAcertadas++;
                contRestantes--;
                panelDatos();

            } else {
                console.log("No coinciden");
                carta.classList.replace("border-gray-500", "border-red-500");
               

                const carta1 = document.getElementById(idCarta1);
                if (carta1) {
                    carta1.classList.replace("border-gray-500", "border-red-500");
                    

                }

                setTimeout(() => {
                    carta.classList.replace("border-red-500", "border-blue-600");
                    carta.style.backgroundImage = imgOri;
                    if (carta1) {
                        carta1.classList.replace("border-red-500", "border-blue-600");
                        carta1.style.backgroundImage = imgOri;
                    }

                    carta.classList.remove("seleccionada", "shadow-2xl");
                    if (carta1) {
                        carta1.classList.remove("seleccionada", "shadow-2xl");
                    }
                }, 1000);
            }

            idCarta1 = null;
            idCarta2 = null;
            clickCount = 0;
            valor = null;
        }
    }
}

function panelDatos() {
    let mostrar = document.getElementById("mostrarDatos");
    mostrar.innerHTML='';

   
    mostrar.classList.add('w-3/6', 'p-2', 'bg-gray-100', 'h-full', 'flex', 'flex-col', 'items-center', 'border', 'border-blue-600', 'rounded-lg');
        const header = document.createElement('h2');
        header.classList.add('text-xl', 'font-semibold', 'mb-4');
        header.innerText = "Estadísticas del Juego";
        
        document.body.appendChild(mostrar);
        mostrar.appendChild(header);

        const parejasAcertadas = document.createElement('p');
        parejasAcertadas.id = 'parejas-acertadas';
        parejasAcertadas.classList.add('text-lg');
        parejasAcertadas.innerText = "Parejas acertadas: " + contAcertadas; 

        const parejasRestantes = document.createElement('p');
        parejasRestantes.id = 'parejas-restantes';
        parejasRestantes.classList.add('text-lg');
        parejasRestantes.innerText = "Parejas restantes: "+contRestantes; 

        mostrar.appendChild(parejasAcertadas);
        mostrar.appendChild(parejasRestantes);
    element.appendChild(mostrar)
}


panelDatos();

