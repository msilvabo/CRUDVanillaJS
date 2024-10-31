import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { MarvelApp } from './src/marvel/marvel-app-js';
import { UserApp } from './src/users/users-app-js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id = "app-title">Hello Vite!!!</h1>
    <div class="card">
    
    </div>
  </div>
`;
const element = document.querySelector('.card');

// MarvelApp(element);
UserApp(element);


