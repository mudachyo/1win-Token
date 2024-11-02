// ==UserScript==
// @name         1win Autoclicker
// @version      1.4
// @namespace    Violentmonkey Scripts
// @author       mudachyo
// @match        https://cryptocklicker-frontend-rnd-prod.100hp.app/*
// @grant        none
// @icon         https://cryptocklicker-frontend-rnd-prod.100hp.app/images/common/Coin.webp
// @downloadURL  https://github.com/mudachyo/1win-Token/raw/main/1win-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/1win-Token/raw/main/1win-autoclicker.user.js
// @homepage     https://github.com/mudachyo/1win-Token/
// ==/UserScript==

console.log('1win Autoclicker: Скрипт запущен');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentEnergy() {
    const energyElement = document.querySelector('span[class*="_energyText_"]');
    return energyElement ? parseInt(energyElement.textContent.replace(/[^\d]/g, '')) : 0;
}

function findClickerElement() {
    return document.querySelector('#coin');
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
            const pointerId = Math.floor(Math.random() * 100);

            triggerPointerEvent(element, 'pointerover', coordinates, pointerId);
            triggerPointerEvent(element, 'pointerenter', coordinates, pointerId);
            triggerPointerEvent(element, 'pointerdown', coordinates, pointerId);
            triggerTouchEvent(element, 'touchstart', coordinates);
            triggerPointerEvent(element, 'gotpointercapture', coordinates, pointerId);
            triggerPointerEvent(element, 'pointerup', coordinates, pointerId);
            triggerPointerEvent(element, 'lostpointercapture', coordinates, pointerId);
            triggerPointerEvent(element, 'pointerout', coordinates, pointerId);
            triggerPointerEvent(element, 'pointerleave', coordinates, pointerId);
            triggerTouchEvent(element, 'touchend', coordinates);

            const randomDelay = getRandomInt(40, 130);
            setTimeout(autoclicker, randomDelay);
        }
    } else {
        setTimeout(autoclicker, 1000);
    }
}

function triggerPointerEvent(element, eventType, coordinates, pointerId) {
    const event = new PointerEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: coordinates.x,
        clientY: coordinates.y,
        screenX: coordinates.x + window.screenX,
        screenY: coordinates.y + window.screenY,
        pointerId: pointerId,
        width: eventType.includes('down') ? 23 : 1,
        height: eventType.includes('down') ? 23 : 1,
        pressure: eventType.includes('down') ? 1 : 0,
        isTrusted: true
    });

    element.dispatchEvent(event);
}

function triggerTouchEvent(element, eventType, coordinates) {
    const touch = new Touch({
        identifier: Math.floor(Math.random() * 100),
        target: element,
        clientX: coordinates.x,
        clientY: coordinates.y,
        screenX: coordinates.x + window.screenX,
        screenY: coordinates.y + window.screenY,
        radiusX: 11.5,
        radiusY: 11.5,
        rotationAngle: 0,
        force: 1
    });

    const touchEvent = new TouchEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window,
        touches: eventType === 'touchend' ? [] : [touch],
        targetTouches: eventType === 'touchend' ? [] : [touch],
        changedTouches: [touch],
        isTrusted: true
    });

    element.dispatchEvent(touchEvent);
}

function getRandomCoordinates(element) {
    const rect = element.getBoundingClientRect();
    const x = getRandomInt(rect.left, rect.right);
    const y = getRandomInt(rect.top, rect.bottom);
    return {
        x,
        y
    };
}

console.log('1win Autoclicker: Автокликер запущен');
setTimeout(() => {
    autoclicker();
}, 5000);