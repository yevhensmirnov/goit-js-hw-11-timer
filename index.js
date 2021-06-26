"use scrict"
const $day = document.querySelector('[data-value="days"]'),
    $hour = document.querySelector('[data-value="hours"]'),
    $min = document.querySelector('[data-value="mins"]'),
    $sec = document.querySelector('[data-value="secs"]'),
    $timer = document.querySelector('.timer');

class Timer {
    constructor({ onTick, selector, deadline }) {
        this.onTick = onTick;
        this.selector = selector;
        this.deadline = deadline;
    }

    start() {
        
        this.timers = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.deadline - currentTime;
            const { days, hours, mins, secs } = this.getTimes(deltaTime);
            setClock({ days, hours, mins, secs });
            this.stopTimer(deltaTime);
        }, 100);
    }

    getTimes(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24))),
            hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
            mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
            secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    stopTimer(time) {
        if (time <= 0) {
            clearInterval(this.timers);
            $timer.textContent = 'Did you meet the deadline?';
        }
    }
}

const timer = new Timer({
    onTick: setClock, selector: '#timer-1', deadline: new Date('Jun 29, 2021'),
});
timer.start();

function setClock({ days, hours, mins, secs }) {
    $day.textContent = `${days}`;
    $hour.textContent = `${hours}`;
    $min.textContent = `${mins}`;
    $sec.textContent = `${secs}`;
}