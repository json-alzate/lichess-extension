'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('puzzles', 'puzzles.html', true),
            new Route('info', 'info.html'),
            new Route('settings', 'settings.html')
        ]);
    }
    init();
}());