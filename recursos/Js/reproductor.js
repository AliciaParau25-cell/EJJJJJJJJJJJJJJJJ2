var maximo, medio, barra, progreso, play, bucle;

function redimensionaBarra() {
    if (!medio.ended) {
        var total = parseInt(medio.currentTime * maximo / medio.duration);
        progreso.style.width = total + 'px';
    } else {
        progreso.style.width = '0px';
        play.value = '\u25BA';
        window.clearInterval(bucle);
    }
}

function desplazarMedio(e) {
    var ratonX = e.pageX - barra.offsetLeft;
    var nuevoTiempo = (ratonX * medio.duration) / maximo;
    medio.currentTime = nuevoTiempo;
    progreso.style.width = ratonX + 'px';
}

function accionPlay() {
    if (!medio.paused && !medio.ended) {
        medio.pause();
        play.value = '\u25BA';
        window.clearInterval(bucle);
    } else {
        medio.play();
        play.value = '||';
        bucle = setInterval(redimensionaBarra, 1000);
    }
}

function iniciar() {
    maximo = 705; 
    medio = document.getElementById('medio');
    barra = document.getElementById('barra');
    progreso = document.getElementById('progreso');
    play = document.getElementById('play');

    // Botón Play
    play.addEventListener('click', accionPlay, false);
    // Barra de progreso
    barra.addEventListener('click', desplazarMedio, false);

    // Reiniciar
    document.getElementById('reiniciar').addEventListener('click', function() {
        medio.currentTime = 0;
    }, false);

    // Retrasar 5s
    document.getElementById('retrasar').addEventListener('click', function() {
        medio.currentTime = Math.max(0, medio.currentTime - 5);
    }, false);

    // Adelantar 5s
    document.getElementById('adelantar').addEventListener('click', function() {
        medio.currentTime = Math.min(medio.duration, medio.currentTime + 5);
    }, false);

    // Silenciar
    document.getElementById('silenciar').addEventListener('click', function() {
        if(medio.muted) {
            medio.muted = false;
            this.value = "silenciar";
        } else {
            medio.muted = true;
            this.value = "escuchar";
        }
    }, false);

    // Volumen Mas
    document.getElementById('masVolumen').addEventListener('click', function() {
        if(medio.volume < 1) medio.volume = Math.min(1, medio.volume + 0.1);
    }, false);

    // Volumen Menos
    document.getElementById('menosVolumen').addEventListener('click', function() {
        if(medio.volume > 0) medio.volume = Math.max(0, medio.volume - 0.1);
    }, false);
}

window.addEventListener('load', iniciar, false);