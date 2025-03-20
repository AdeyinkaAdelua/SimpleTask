window.addEventListener('load', () => {
    let timerInterval;
    let timeRemaining = 25 * 60; // Default to 25 minutes
    const timerDisplay = document.querySelector('#timer');
    const startButton = document.querySelector('#start-timer');
    const resetButton = document.querySelector('#reset-timer');
    const modeRadios = document.querySelectorAll('input[name="mode"]');

    // Update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Timer countdown function
    function startCountdown() {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert("Time's up!");
                // Switch to break after Pomodoro, or reset if in break mode
                if (document.querySelector('input[name="mode"]:checked').value === 'pomodoro') {
                    switchMode('short-break'); // Switch to short break after Pomodoro
                } else if (document.querySelector('input[name="mode"]:checked').value === 'short-break') {
                    switchMode('pomodoro'); // Switch to Pomodoro after short break
                } else if (document.querySelector('input[name="mode"]:checked').value === 'long-break') {
                    switchMode('pomodoro'); // Switch to Pomodoro after long break
                }
            }
        }, 1000);
    }

    // Start the timer
    startButton.addEventListener('click', () => {
        startButton.disabled = true; // Disable the start button while the timer runs
        startCountdown();
    });

    // Reset the timer
    resetButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        startButton.disabled = false;
        switchMode(document.querySelector('input[name="mode"]:checked').value); // Reset to current mode
    });

    // Switch between Pomodoro, short break, and long break
    function switchMode(mode) {
        switch (mode) {
            case 'pomodoro':
                timeRemaining = 25 * 60; // 25 minutes
                break;
            case 'short-break':
                timeRemaining = 5 * 60; // 5 minutes
                break;
            case 'long-break':
                timeRemaining = 15 * 60; // 15 minutes
                break;
        }
        updateTimerDisplay();
    }

    // Change timer mode based on selected radio button
    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            switchMode(e.target.value);
        });
    });

    // Set initial mode and update display
    switchMode('pomodoro');
});
