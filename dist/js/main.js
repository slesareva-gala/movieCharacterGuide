(()=>{"use strict";(e=>{const t=document.querySelector(".content"),n=t.querySelector(".movie-list"),s=t.querySelector(".title"),a=t.querySelector(".characters"),o=document.querySelector(".button-movie-list");let l;const i=(e="error")=>{"notMovieList"===e?(o.style.display="none",n.innerHTML=""):(o.style.display="none",s.innerHTML="Guide is not available",n.innerHTML="",a.innerHTML="We apologize for the temporary inconvenience you have faced.")};document.addEventListener("DOMContentLoaded",(()=>{var c;(c=e,fetch(c).then((e=>e.json()))).then((e=>((e=>{const t=[],s={};e.forEach((e=>{"movies"in e&&e.movies.forEach((e=>s[e]=e))}));for(let e in s)t.push(e);t.length?(t.sort(),(e=>{const t=document.createElement("h2"),s=document.createElement("ul"),a=document.createElement("li");let o="";s.classList.add("movies"),a.textContent="All",a.classList.add("all","active"),s.append(a),e.forEach((e=>{const t=document.createElement("li");let n=e.slice(0,1).toUpperCase();n!==o&&(t.classList.add("letter-begin"),o=n),t.textContent=e,s.append(t)})),t.classList.add("title"),t.textContent="Movie list",n.append(t),n.append(s),l="All"})(t)):i("notMovieList")})(e),(e=>{let t="";e.forEach((e=>{t+=(e=>{let t="name"in e?e.name:"name not specified",n=`\n              <div class="heroes">\n                <h3 class="name" >${t}</h3>                        \n                  <span class="real-name">${"realName"in e&&e.realName!==t?e.realName:""}</span>\n                  <img src="${"photo"in e?e.photo:""}" alt="no photo" class="image" />`;for(let t in e)"name,realName,photo,movies".includes(t)||(n+=`\n                      <div class="heroes-description">\n                        <span class="property">${"birthDay"===t?"birthday":"deathDay"===t?"death day":t}</span>\n                        <span class="value">${e[t]}</span>\n                      </div>`);return"movies"in e&&(n+='\n                  <span class="heroes-movies">movies with this character</span>\n                  <div class="heroes-description">\n                    <ul class="movies">',e.movies.forEach((e=>{n+=`\n                      <li class="movies">${e}</li>`})),n+="\n                    </ul>\n                  </div> "),n+"</div>"})(e)})),a.innerHTML=t})(e),"none"!==o.style.display&&o.addEventListener("click",(()=>{n.style.display="none"===n.style.display?"":"none"})),t.addEventListener("click",(e=>{if(e.target.matches(".movies li")){const t=e.target.textContent;if(l===t)return;l=t;const o=e=>e.textContent===t?(e.classList.add("active"),!0):(e.classList.remove("active"),!1);s.innerHTML="Movie character cards"+("All"===t?"":`: <span class="title-movie">${t}</span>`),n.querySelectorAll("li").forEach((e=>{o(e)})),a.querySelectorAll(".heroes").forEach((e=>{let n="All"===t;e.querySelectorAll("li").forEach((e=>{o(e)&&(n=!0)})),n?e.classList.remove("close"):e.classList.add("close")}))}})),e))).catch((e=>(i(),e)))}))})("/db/dbHeroes.json")})();