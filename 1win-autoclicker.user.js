// ==UserScript==
// @name         1win Autoclicker
// @version      1.0
// @namespace    Violentmonkey Scripts
// @author       mudachyo
// @match        https://cryptocklicker-frontend-rnd-prod.100hp.app/*
// @grant        none
// @icon         https://cdn.prod.website-files.com/65b6a1a4a0e2af577bccce96/65ba99c1616e21b24009b86c_blum-256.png
// @downloadURL  https://github.com/mudachyo/1win-Token/raw/main/1win-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/1win-Token/raw/main/1win-autoclicker.user.js
// @homepage     https://github.com/mudachyo/1win-Token/
// ==/UserScript==

console.log('1win Autoclicker: Скрипт запущен');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentEnergy() {
    const energyElement = document.querySelector('span._energyText_qsqzt_106');
    return energyElement ? parseInt(energyElement.textContent.trim()) : 0;
}

function findClickerElement() {
    return document.querySelector('img#coin._coin_24iid_65');
}

function autoclicker() {
    const element = findClickerElement();
    if (element) {
        const currentEnergy = getCurrentEnergy();

        if (currentEnergy < 25) {
            const pauseDuration = getRandomInt(60, 180) * 1000;
            console.log(`1win Autoclicker: Мало энергии (${currentEnergy}), пауза на ${pauseDuration / 1000} секунд`);
            setTimeout(autoclicker, pauseDuration);
        } else {
            const coordinates = getRandomCoordinates(element);

            triggerEvent(element, 'pointerdown', coordinates);
            triggerEvent(element, 'mousedown', coordinates);
            triggerEvent(element, 'pointermove', coordinates);
            triggerEvent(element, 'mousemove', coordinates);
            triggerEvent(element, 'pointerup', coordinates);
            triggerEvent(element, 'mouseup', coordinates);
            triggerEvent(element, 'click', coordinates);

            const randomDelay = getRandomInt(40, 130);
            setTimeout(autoclicker, randomDelay);
        }
    } else {
        setTimeout(autoclicker, 1000);
    }
}

function triggerEvent(element, eventType, coordinates) {
    const event = new MouseEvent(eventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordinates.x,
        clientY: coordinates.y,
        screenX: coordinates.x + window.screenX,
        screenY: coordinates.y + window.screenY,
    });

    element.dispatchEvent(event);
}

function getRandomCoordinates(element) {
    const rect = element.getBoundingClientRect();
    const x = getRandomInt(rect.left, rect.right);
    const y = getRandomInt(rect.top, rect.bottom);
    return { x, y };
}

console.log('1win Autoclicker: Автокликер запущен');
setTimeout(() => {
    autoclicker();
}, 5000);
