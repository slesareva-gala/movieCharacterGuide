"use strict";

// получение по AJAX запросу 
const getData = (url) => fetch(url)
    .then(response => response.json());

export { getData };

// универсальный аниматор
const animate = ({ draw, duration = 1000, timingplane = 'linear' }) => {

    const timing = {
        linear: (x) => x,

        // Кубические функции Безье (в т.ч. ease, ease-in, ease-out и ease-in-out)
        easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),        // для вертикального скролла
        easeInOutCubic: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
        easeOutQuart: (x) => 1 - Math.pow(1 - x, 5),
        aseOutExpo: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),  // для выезжающих модальных окон
    };
    if (!(timingplane in timing)) { timingplane = 'linear'; }

    let start = performance.now(); // возвращает текущую точку времени старта анимации

    requestAnimationFrame(function animate(time) {  // принимают текущий time stamp от requestAnimationFrame()
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration; // теущий промежуток делим на продолжительность анимации
        if (timeFraction > 1) { timeFraction = 1; }
        else if (timeFraction < 0) { timeFraction = 0; }

        // вычисление текущего состояния анимации
        // число от 0 до 1 с учетом указанной линейности, заданной в настроку timing 
        // для линейно анимации -  возвращает то, что передали
        let progress = timing[timingplane](timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {    // повторит анимации
            requestAnimationFrame(animate);
        }

    });
};

export { animate };