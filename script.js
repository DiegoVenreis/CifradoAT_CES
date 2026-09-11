/*1*/
const frecuenciasEspanol = {
    "A": 12.53,
    "B": 1.42,
    "C": 4.68,
    "D": 5.86,
    "E": 13.68,
    "F": 0.69,
    "G": 1.01,
    "H": 0.70,
    "I": 6.25,
    "J": 0.44,
    "K": 0.02,
    "L": 4.97,
    "M": 3.15,
    "N": 6.71,
    "Ñ": 0.31,
    "O": 8.68,
    "P": 2.51,
    "Q": 0.88,
    "R": 6.87,
    "S": 7.98,
    "T": 4.63,
    "U": 3.93,
    "V": 0.90,
    "W": 0.01,
    "X": 0.22,
    "Y": 0.90,
    "Z": 0.52
};

/*2*/
const palabrasComunes = [
    "DE", "LA", "QUE", "EL", "EN", "Y", "A",
    "LOS", "DEL", "SE", "LAS", "POR", "UN",
    "PARA", "CON", "NO", "UNA", "SU", "ES",
    "AL", "LO", "COMO", "MAS", "PERO", "SUS",
    "LE", "HA", "ME", "SI", "SIN", "SOBRE",
    "ESTE", "YA", "ENTRE", "CUANDO", "TODO",
    "ESTA", "SER", "SON", "DOS", "TAMBIEN",
    "FUE", "HABIA", "ERA", "MUY", "HAY",
    "HASTA", "DESDE", "PORQUE", "SISTEMA",
    "INFORMACION", "MUCHO", "TIEMPO", "PERSONAS",
    "TRABAJO", "MOMENTO", "LUGAR", "HISTORIA",
    "DESARROLLO"
];


/*3*/
const bigramasEspanol = [
    "DE", "ES", "EN", "LA", "EL", "ER",
    "RE", "AR", "RA", "OS", "ON", "AS",
    "AL", "SE", "AN", "NE", "TE", "TA",
    "DO", "LO", "LE", "NO", "TO", "AD",
    "NA", "CO", "QU", "UE", "OR", "RI",
    "CI", "CA", "DA", "MA", "MI", "PA",
    "PO", "PR", "SI", "SO", "SU", "TI",
    "TR", "ST", "NT", "ND", "RO", "SA"
];

/*4*/
const trigramasEspanol = [
    "QUE", "ENT", "EST", "LOS", "LAS",
    "DEL", "PAR", "CON", "POR", "UNA",
    "ADO", "ADA", "ERA", "RES", "CIO",
    "ACI", "TRA", "PRO", "DES", "TER",
    "PER", "STA", "STE", "NTE", "MEN",
    "TEX", "CIF", "DRA", "ESP", "IST",
    "ION", "COM"
];

/*5*/
function mostrarModulo() {
    const metodo = document.getElementById("metodo").value;
    const contenedor = document.getElementById("contenedorModulo");

    if (metodo === "cesar") {
        contenedor.classList.remove("oculto");
    } else {
        contenedor.classList.add("oculto");
    }
}

/*6*/
function obtenerAlfabeto() {
    const texto = document.getElementById("alfabeto").value;
    return Array.from(texto);
}

/*7*/
function validarAlfabeto(alfabeto) {
    if (alfabeto.length < 2) {
        alert("El conjunto de caracteres debe tener al menos 2 caracteres.");
        return false;
    }

    const caracteres = new Set(alfabeto);

    if (caracteres.size !== alfabeto.length) {
        alert("El conjunto de caracteres no puede contener caracteres repetidos.");
        return false;
    }
    return true;
}

/*8*/
function adaptarMensajeAlAlfabeto(mensaje, alfabeto) {
    const tieneMayusculas = alfabeto.some(caracter => caracter >= "A" && caracter <= "Z");
    const tieneMinusculas = alfabeto.some(caracter => caracter >= "a" && caracter <= "z");

    if (tieneMayusculas && !tieneMinusculas) {
        return mensaje.toUpperCase();
    }

    if (tieneMinusculas && !tieneMayusculas) {
        return mensaje.toLowerCase();
    }
    return mensaje;
}

/*9*/
function cifrarCesar(mensaje, alfabeto, modulo) {
    let resultado = "";

    for (let caracter of mensaje) {
        const posicion = alfabeto.indexOf(caracter);

        if (posicion === -1) {
            resultado += caracter;
            continue;
        }

        const nuevaPosicion = (posicion + modulo) % alfabeto.length;
        resultado += alfabeto[nuevaPosicion];
    }
    return resultado;
}

/*10*/
function descifrarCesar(mensaje, alfabeto, modulo) {
    let resultado = "";

    for (let caracter of mensaje) {
        const posicion = alfabeto.indexOf(caracter);

        if (posicion === -1) {
            resultado += caracter;
            continue;
        }
        
        let nuevaPosicion = (posicion - modulo) % alfabeto.length;

        if (nuevaPosicion < 0) {
            nuevaPosicion += alfabeto.length;
        }
        resultado += alfabeto[nuevaPosicion];
    }
    return resultado;
}

/*11*/
function cifrarAtbash(mensaje, alfabeto) {
    let resultado = "";

    for (let caracter of mensaje) {
        const posicion = alfabeto.indexOf(caracter);

        if (posicion === -1) {
            resultado += caracter;
            continue;
        }
        const nuevaPosicion = alfabeto.length - 1 - posicion;
        resultado += alfabeto[nuevaPosicion];
    }
    return resultado;
}

/*12*/
function cifrar() {
    let mensaje = document.getElementById("mensaje").value;
    const alfabeto = obtenerAlfabeto();
    const metodo = document.getElementById("metodo").value;

    if (!validarAlfabeto(alfabeto)) {
        return;
    }

    if (mensaje.length === 0) {
        alert("Escribe un mensaje para cifrar.");
        return;
    }

    mensaje = adaptarMensajeAlAlfabeto(mensaje, alfabeto);
    let resultado = "";

    if (metodo === "cesar") {
        let modulo = parseInt(document.getElementById("modulo").value);

        if (isNaN(modulo)) {
            alert("Introduce un módulo válido.");
            return;
        }

        modulo = ((modulo % alfabeto.length) + alfabeto.length) % alfabeto.length;
        resultado = cifrarCesar(mensaje, alfabeto, modulo);
    }

    else {
        resultado = cifrarAtbash(mensaje, alfabeto);
    }

    document.getElementById("resultado").value = resultado;
}

/*13*/
function normalizarParaAnalisis(texto) {
    return texto.toUpperCase().normalize("NFC");
}

/*14*/
function calcularFrecuencias(texto) {
    const frecuencias = {};
    let total = 0;
    const textoNormalizado = normalizarParaAnalisis(texto);

    for (let caracter of textoNormalizado) {
        if (Object.prototype.hasOwnProperty.call( frecuenciasEspanol, caracter)) {
            if (!frecuencias[caracter]) {
                frecuencias[caracter] = 0;
            }
            
            frecuencias[caracter]++;
            total++;
        }
    }

    if (total > 0) {
        for (let letra in frecuencias) {
            frecuencias[letra] = (frecuencias[letra] / total) * 100;
        }
    }
    return frecuencias;
}

/*15*/
function puntuacionFrecuencia(texto) {
    const frecuencias = calcularFrecuencias(texto);
    let diferenciaTotal = 0;

    for (let letra in frecuenciasEspanol) {
        const esperada =frecuenciasEspanol[letra];
        const observada = frecuencias[letra] || 0;
        const diferencia = Math.abs(observada - esperada);
        
        diferenciaTotal += diferencia;
    }
    return -diferenciaTotal;
}

/*16*/
function puntuacionBigramas(texto) {
    const textoNormalizado = normalizarParaAnalisis(texto);
    let puntuacion = 0;

    for (let bigrama of bigramasEspanol) {
        let posicion = 0;

        while ((posicion = textoNormalizado.indexOf(bigrama, posicion)) !== -1) {
            puntuacion += 2;
            posicion += bigrama.length;
        }
    }
    return puntuacion;
}

/*17*/
function puntuacionTrigramas(texto) {
    const textoNormalizado = normalizarParaAnalisis(texto);
    let puntuacion = 0;

    for (let trigrama of trigramasEspanol) {
        let posicion = 0;
        while ((posicion = textoNormalizado.indexOf(trigrama, posicion)) !== -1) {
            puntuacion += 4;
            posicion += trigrama.length;
        }
    }
    return puntuacion;
}

/*18*/
function puntuacionPalabras(texto) {
    const textoNormalizado =
        normalizarParaAnalisis(texto);
    let puntuacion = 0;
    const palabras = textoNormalizado.split(/[\s,.;:!?¿¡()"'-]+/);

    for (let palabra of palabras) {
        if (palabrasComunes.includes(palabra)) {
            puntuacion += 15;
        }
    }
    return puntuacion;
}

/*19*/
function penalizacionTexto(texto) {
    const textoNormalizado = normalizarParaAnalisis(texto);
    let penalizacion = 0;

    const patronesRaros = [
        "WQ", "WZ", "QW", "QZ",
        "KQ", "QK", "JQ", "QJ",
        "ZX", "XZ", "WJ", "JW"
    ];

    for (let patron of patronesRaros) {
        let posicion = 0;
        while((posicion = textoNormalizado.indexOf( patron, posicion)) !== -1) {
            penalizacion -= 8;
            posicion += patron.length;
        }
    }

    const consonantes = textoNormalizado.match(/[BCDFGHJKLMNPQRSTVWXYZÑ]{3,}/g);

    if (consonantes) {
        penalizacion -= consonantes.length * 3;
    }
    return penalizacion;
}

/*20*/
function evaluarTexto(texto) {
    const frecuencia = puntuacionFrecuencia(texto);
    const bigramas = puntuacionBigramas(texto);
    const trigramas = puntuacionTrigramas(texto);
    const palabras = puntuacionPalabras(texto);
    const penalizacion = penalizacionTexto(texto);

    return (frecuencia + bigramas + trigramas + palabras + penalizacion);
}

/*21*/
function descifrarAutomaticamente() {
    let mensaje = document.getElementById("mensaje").value;
    const alfabeto = obtenerAlfabeto();

    if (!validarAlfabeto(alfabeto)) {
        return;
    }

    if (mensaje.length === 0) {
        alert("Escribe un mensaje para descifrar.");
        return;
    }

    mensaje = adaptarMensajeAlAlfabeto(mensaje, alfabeto);

    let mejorTexto = "";
    let mejorPuntuacion = -Infinity;
    for (let modulo = 0; modulo < alfabeto.length; modulo++) {
        const candidato = descifrarCesar(mensaje, alfabeto, modulo);
        const puntuacion = evaluarTexto(candidato);

        if (puntuacion > mejorPuntuacion) {
            mejorPuntuacion = puntuacion;
            mejorTexto = candidato;
        }
    }

    const candidatoAtbash = cifrarAtbash( mensaje, alfabeto);

    const puntuacionAtbash = evaluarTexto(candidatoAtbash);

    if (puntuacionAtbash > mejorPuntuacion) {
        mejorPuntuacion = puntuacionAtbash;
        mejorTexto = candidatoAtbash;
    }

    document.getElementById("resultado").value = mejorTexto;
}

mostrarModulo();