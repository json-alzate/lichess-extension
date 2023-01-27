Lichess Puzzle Timer
====================

Una extensión para Google Chrome que agrega un temporizador al entrar en la página de entrenamiento de [Lichess](https://lichess.org/training).

Instalación
-----------

1.  Descargar el repositorio y descomprimir en una carpeta.
2.  Abrir Google Chrome.
3.  Ir a `chrome://extensions/`.
4.  Activar el modo de desarrollador (si no está ya activado) en la parte superior derecha.
5.  Hacer clic en "Cargar extensión sin empaquetar" y seleccionar la carpeta descomprimida.

Uso
---

1.  Ir a la página de entrenamiento de Lichess.
2.  El temporizador se mostrará en la esquina superior derecha de la página, dentro del div con la clase `puzzle__tools`.
3.  El temporizador se reiniciará automáticamente cada vez que se cambie de ejercicio.
4.  El temporizador se detendrá automáticamente cuando se muestre un feedback de ejercicio.

Características
---------------

*   El temporizador se muestra en minutos y segundos.
*   El temporizador cambia de color según el tiempo transcurrido: verde <= a 3 minutos, naranja > 3 minutos y <= 5 minutos y rojo mas de 5 minutos.

Créditos
--------

*   [Lichess](https://lichess.org/) por proporcionar la plataforma de entrenamiento.
*   [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) por ser el lenguaje utilizado para desarrollar la extensión.

Notas
-----

*   La extensión solo funcionará en la página de entrenamiento de Lichess y no afectará a otras páginas.
*   Esta extensión no es oficial de Lichess y no está afiliada a ellos.