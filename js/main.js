/**
 * Función que inicializa el tutorial cuando se hace clic en el botón de iniciar tutorial.
 * Muestra un overlay con instrucciones paso a paso para utilizar la aplicación.
 */
document.getElementById('startTutorial').addEventListener('click', function () {
    // Mostrar el overlay del tutorial
    document.querySelector('.overlay-tutorial').style.display = 'flex';
    // Limpiar el contenido del elemento de animación de texto
    document.getElementById('textAnimation').textContent = "";

    let currentStep = 1; // Variable para rastrear el progreso del tutorial

    /**
     * Función para escribir el texto letra por letra de manera animada.
     * @param {string} text - Texto que se escribirá.
     * @param {function} callback1 - Función de devolución de llamada a ejecutar después de escribir el texto.
     * @param {function} callback2 - Función de devolución de llamada opcional para ejecutar después de un retraso.
     */
    function typeWriter(text, callback1, callback2 = null) {
        let charIndex = 0;
        const speed = 50;
        const textElement = document.getElementById('textAnimation');
        const textLength = text.length;

        function type() {
            if (charIndex < textLength) {
                textElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, speed);
            } else {
                if (callback1) {
                    callback1();
                }
                if (callback2) {
                    setTimeout(callback2, 500);
                }
            }
        }

        type();
    }

    /**
     * Función para avanzar al siguiente paso del tutorial.
     */
    function nextStep() {
        switch (currentStep) {
            case 1:
                document.getElementById('textAnimation').textContent = "";
                document.querySelector('.clic-menu').style.display = 'block';
                typeWriter("El menú te ayudará a poder navegar sobre la aplicación", function () {
                    currentStep++;
                });
                break;
            case 2:
                document.querySelector('.clic-menu').style.display = 'none';
                document.getElementById('textAnimation').textContent = "";
                document.querySelector('.slider-circle').style.display = 'block';
                typeWriter("Podrás navegar por los diferentes libros deslizando de izquierda a derecha!", function () {
                    currentStep++;
                });
                break;
            case 3:
                document.getElementById('textAnimation').textContent = "";
                document.querySelector('.clic-busqueda').style.display = 'block';
                typeWriter("Puedes buscar los libros en tiempo real por autor, editorial, idioma.", function () {
                    currentStep++;
                });
                break;
            case 4:
                document.querySelector('.clic-busqueda').style.display = 'none';
                document.getElementById('textAnimation').textContent = "";
                document.querySelector('.clic-libro').style.display = 'block';
                typeWriter("Para leer el libro solo necesitas dar doble clic en la portada del libro.", function () {
                    currentStep++;
                });
                break;
            case 5:
                document.querySelector('.clic-libro').style.display = 'none';
                document.getElementById('textAnimation').textContent = "";
                document.getElementById('siguienteBtn').style.display = 'none';
                document.getElementById('cerrarBtn').style.display = 'none';
                document.getElementById('terminarBtn').style.display = 'block';
                typeWriter("Gracias por seguir el tutorial. ¡Cualquier duda relacionada puedes llamar a soporte!", function(){
                    currentStep++;
                });
                break;
            default:
                closeTutorial();
                break;
        }
    }

    /**
     * Función para cerrar el tutorial y ocultar el overlay.
     */
    function closeTutorial() {
        document.querySelector('.overlay-tutorial').style.display = 'none';
        currentStep = 1; // Reiniciar el progreso del tutorial
    }

    // Evento clic para el botón "Siguiente"
    document.getElementById('siguienteBtn').addEventListener('click', function () {
        this.disabled = true;
        nextStep();
        // Habilitar el botón después de 5 segundos para evitar clics repetidos
        setTimeout(() => {
            document.getElementById('siguienteBtn').disabled = false;
        }, 5000);
    });

    // Evento clic para el botón "Cerrar"
    document.getElementById('cerrarBtn').addEventListener('click', function () {
        closeTutorial();
    });

    // Evento clic para el botón "Terminar"
    document.getElementById('terminarBtn').addEventListener('click', function () {
        closeTutorial();
    });

    // Iniciar el tutorial mostrando el mensaje de bienvenida
    typeWriter("¡Bienvenido al tutorial! Aquí aprenderás cómo utilizar nuestra aplicación");
});
