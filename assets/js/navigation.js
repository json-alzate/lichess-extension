var navItems = document.querySelectorAll("#navigation li");
var contentSections = document.querySelectorAll("#contenido-inicio, #contenido-acerca-de");

// Oculta todas las secciones de contenido excepto la primera
for (var i = 1; i < contentSections.length; i++) {
    contentSections[i].style.display = "none";
}

// Agrega un controlador de eventos de clic para cada elemento del menú
for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", function () {
        // Obtiene el identificador del elemento del menú que se ha hecho clic
        var id = this.querySelector("a").getAttribute("id");

        // Oculta todas las secciones de contenido
        for (var j = 0; j < contentSections.length; j++) {
            contentSections[j].style.display = "none";
        }

        // Muestra la sección de contenido correspondiente al elemento del menú que se ha hecho clic
        var contentSection = document.querySelector("#contenido-" + id.replace("-", ""));
        contentSection.style.display = "block";
    });
}