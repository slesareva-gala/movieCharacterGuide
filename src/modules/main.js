"use strict";

import { getData, animate } from './helpers';

const main = (pathData, timing = 1000) => {
    console.log('main');
    // блок контента
    const content = document.querySelector('.content');
    // блок списка фильмов
    const movieList = content.querySelector('.movie-list');
    // содержание страницы блока карточек героев
    const title = content.querySelector('.title');
    // блок карточек героев
    const characters = content.querySelector('.characters');
    // кнопка вызова/закрытия списка фмльмов
    const buttonМovieList = document.querySelector('.button-movie-list');

    // текущий фильтр отбора
    let filterMovie;

    // установка компонентов страницы
    const componentsPage = (status = 'error') => {

        if (status === 'notMovieList') {
            // нет списка фильмов
            buttonМovieList.style.display = "none";
            movieList.innerHTML = '';

        } else {
            // нет данных 
            buttonМovieList.style.display = "none";
            title.innerHTML = 'Guide is not available';
            movieList.innerHTML = '';
            characters.innerHTML = 'We apologize for the temporary inconvenience you have faced.';
        }
    };

    // прорисовка списка фильмов
    const renderMovieList = (dbHeroes) => {

        // добавление на страницу списка фильмов
        const addMovieList = (movies) => {
            const title = document.createElement('h2');
            const ulList = document.createElement('ul');
            const liAll = document.createElement('li');
            let letterBegin = '';

            ulList.classList.add('movies');

            // пункт "Все"            
            liAll.textContent = 'All';
            liAll.classList.add('all', 'active');
            ulList.append(liAll);

            // остальные пункты списка
            movies.sort().forEach((name) => {
                const liOther = document.createElement('li');
                let letterFirst = name.slice(0, 1).toUpperCase();

                // первое название на текущую букву
                if (letterFirst !== letterBegin) {
                    liOther.classList.add('letter-begin');
                    letterBegin = letterFirst;
                }

                liOther.textContent = name;
                ulList.append(liOther);
            });

            // добавили название 
            title.classList.add('title');
            title.textContent = 'Movie list';
            movieList.append(title);
            // добавили элементы
            movieList.append(ulList);

            filterMovie = 'All';
        };

        // список названий фильмов
        const movies = [];
        const moviesList = {};

        // формирование списка фильмов по данным базы
        dbHeroes.forEach(hero => {
            // есть список фильмов у героя
            if ('movies' in hero) {
                hero.movies.forEach(movie => moviesList[movie] = movie);
            }
        });
        for (let name in moviesList) { movies.push(name); }
        if (movies.length) {
            // добавить на страницу            
            addMovieList(movies);
        } else {
            // нет списка фильмов
            componentsPage('notMovieList');
        }
    };

    // прорисовка карточек героев
    const renderHeroes = (dbHeroes) => {
        // формирование карточки героя
        const cardHero = (hero) => {
            let name = 'name' in hero ? hero.name : 'name not specified';
            let realName = ('realName' in hero && hero.realName !== name) ? hero.realName : '';

            let htmlHero = `
              <div class="heroes">
                <h3 class="name" >${name}</h3>                        
                  <span class="real-name">${realName}</span>
                  <img src="${'photo' in hero ? hero.photo : ''}" alt="no photo" class="image" />`;

            for (let key in hero) {
                if (!'name,realName,photo,movies'.includes(key)) {
                    let txt = key === 'birthDay' ? 'birthday' :
                        key === 'deathDay' ? 'death day' : key;
                    htmlHero += `
                      <div class="heroes-description">
                        <span class="property">${txt}</span>
                        <span class="value">${hero[key]}</span>
                      </div>`;
                }
            }
            if ('movies' in hero) {
                htmlHero += `
                  <span class="heroes-movies">movies with this character</span>
                  <div class="heroes-description">
                    <ul class="movies">`;
                hero.movies.sort().forEach((name) => {
                    htmlHero += `
                      <li class="movies">${name}</li>`;
                });
                htmlHero += `
                    </ul>
                  </div> `;
            }

            return htmlHero + `</div>`;
        };

        let htmlCharacters = ``;
        dbHeroes.forEach(hero => {
            // формируем карточку героя
            htmlCharacters += cardHero(hero);
        });
        // записываем в верстку
        characters.innerHTML = htmlCharacters;
    };

    // фильтрация карточек
    const filtration = (nameMovie) => {

        // переключатель выделения активности фильма
        const toggleActive = (movie) => {
            if (movie.textContent === nameMovie) {
                movie.classList.add('active');
                return true;
            } else {
                movie.classList.remove('active');
                return false;
            }
        };

        // наименование отбора
        title.innerHTML = `Movie character cards` +
            (nameMovie === 'All' ? '' : `: <span class="title-movie">${nameMovie}</span>`);

        // в списке фильмов выделяем отбор
        movieList.querySelectorAll('li').forEach((movie) => {
            toggleActive(movie);
        });

        // формируем отбор карточек
        characters.querySelectorAll('.heroes').forEach((card) => {
            let inFilter = nameMovie === 'All';
            card.querySelectorAll('li').forEach((movie) => {
                if (toggleActive(movie)) { inFilter = true; }
            });
            if (inFilter) {
                card.classList.remove('close');
            } else {
                card.classList.add('close');
            }
        });
    };

    // плавный скролл на начало блока карточек   
    const smoothScroll = (e) => {
        e.preventDefault();

        // счетчик прокрученных строк и целевое кол-во строк к прокрутке всё за 1 сек
        const scrollY = window.scrollY;
        // необходимо докрутить до начала элемента перехода
        const transitionHeight = title.getBoundingClientRect().top;

        animate({
            duration: timing,
            timingplane: 'easeOutCubic',
            draw(progress) {
                // отключаем что-бы кнопочки не моргали при скролинге 
                if (progress === 0) { content.style.pointerEvents = "none"; }

                // вертикальный скролл документа 
                window.scrollTo(0, scrollY + transitionHeight * progress);

                // включаем кнопочки
                if (progress === 1) { content.style.pointerEvents = ""; }
            }
        });
    };

    // подключить слушателей
    const addEvent = () => {
        // открытие / закрытие списка фильмов
        if (buttonМovieList.style.display !== "none") {
            buttonМovieList.addEventListener('click', () => {
                movieList.style.display = movieList.style.display === 'none' ? '' : 'none';
            });
        }
        // отборы по фильмам
        content.addEventListener('click', (e) => {
            if (e.target.matches('.movies li')) {
                const nameMovie = e.target.textContent;

                if (filterMovie !== nameMovie) {
                    filterMovie = nameMovie;
                    // фильтрация карточек
                    filtration(nameMovie);
                }

                // переход на начало блока карточек                
                smoothScroll(e);
            }
        });
    };

    // после загрузки читаем файл героев и передаем его на прорисовку
    document.addEventListener("DOMContentLoaded", () => {
        getData(pathData)
            .then(data => {
                renderMovieList(data);
                renderHeroes(data);
                addEvent();
                return data;
            })
            .catch((error) => {
                componentsPage();
                return error;
            });
    });

}; // END main()
export default main;