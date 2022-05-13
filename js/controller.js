'use-strict'
import {API_KEY} from './config.js';
// import {async} from 'regenerator-runtime';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';




const resultsContainer = document.querySelector('.form__submissions-emojis');
// const spinnerContainer = document.querySelector('.spinner-box');
const submitBtn = document.querySelector('.btn__form');


// const renderSpinner = function(parentEl) {
//         const markup =`<div class="spinner">
//         <svg>
//             <use href="img/icons.svg#icon-loader"></use>
//         </svg>
//         </div>`; 
//         parentEl.innerHTML = '';
//         parentEl.insertAdjacentHTML('afterbegin', markup);
// };


export const state = {
    data: {
        "prompt": "Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \nDie hard:",
        "temperature": 0.8,
        "max_tokens": 60,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "stop": ["\n"],
    }
};


const renderEmoji = async function(inputValue) {
    try {
        //loading emojis
        // renderSpinner(resultsContainer);
        const newPrompt = `"Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \n${inputValue}: `;
        
        state.data.prompt= newPrompt;
        console.log(state.data);
        const res = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(state.data),
        });
        const info = await res.json();

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);
        let emoji = info.choices[0].text;
        console.log(info);

        
        const markup = `<p class="emojis">${inputValue}: ${emoji}</p>`;
        resultsContainer.insertAdjacentHTML('afterbegin', markup);
        localStorage.setItem('result',markup);
    }catch(error) {
        alert(error);
    }
};

submitBtn.addEventListener('click', function (e){
    e.preventDefault();
    const input = document.querySelector('.movie-title');
    let inputValue = input.value;
    renderEmoji(`${inputValue}`);
    inputValue='';
    input.blur();
});