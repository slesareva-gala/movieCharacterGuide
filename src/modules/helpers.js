"use strict";

// получение по AJAX запросу 
const getData = (url) => fetch(url)
    .then(response => response.json());

export { getData };