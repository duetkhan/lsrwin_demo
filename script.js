// ===== Balance =====
let balance = parseInt(localStorage.getItem('balance')) || 10000;
const balanceEl = document.getElementById('balance');
const resetBtn = document.getElementById('reset');
balanceEl.textContent = balance;

resetBtn.addEventListener('click', () => {
    balance = 10000;
    balanceEl.textContent = balance;
    localStorage.setItem('balance', balance);
    document.querySelectorAll('.message, .dice-result, .crash-result').forEach(el => el.textContent = '');
});

// ===== Monetag Ad Function =====
function showAd() {
    // Insert Monetag script dynamically
    const script = document.createElement('script');
    script.src = "https://quge5.com/88/tag.min.js";
    script.async = true;
    script.setAttribute('data-zone', '204416');
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);
}

// ===== Slot Game =====
const reels = ['🍒', '🍋', '🍉', '🍇', '⭐', '7️⃣'];
const reelEls = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const spinBtn = document.querySelector('.spin-btn');
const slotMessage = document.querySelector('#slot-game .message');

spinBtn.addEventListener('click', () => {
    if(balance < 100){
        slotMessage.textContent = "Not enough coins!";
        return;
    }
    balance -= 100;
    let result = [];
    reelEls.forEach((reel) => {
        const symbol = reels[Math.floor(Math.random()*reels.length)];
        reel.textContent = symbol;
        result.push(symbol);
    });
    const win = result.every(s => s === result[0]);
    if(win){
        balance += 500;
        slotMessage.textContent = "🎉 Slot Win: +500 Coins!";
        showAd(); // Monetag ad on win
    } else {
        slotMessage.textContent = "Try Again!";
    }
    balanceEl.textContent = balance;
    localStorage.setItem('balance', balance);
});

// ===== Dice Game =====
const diceBtn = document.querySelector('.dice-btn');
const diceResult = document.querySelector('.dice-result');

diceBtn.addEventListener('click', () => {
    if(balance < 50){
        diceResult.textContent = "Not enough coins!";
        return;
    }
    balance -= 50;
    const roll = Math.floor(Math.random()*6)+1;
    diceResult.textContent = `You rolled: ${roll}`;
    if(roll === 6){
        balance += 300;
        diceResult.textContent += " 🎉 You win 300 coins!";
        showAd(); // Monetag ad on win
    }
    balanceEl.textContent = balance;
    localStorage.setItem('balance', balance);
});

// ===== Crash Game =====
const crashBtn = document.querySelector('.crash-btn');
const crashResult = document.querySelector('.crash-result');

crashBtn.addEventListener('click', () => {
    if(balance < 100){
        crashResult.textContent = "Not enough coins!";
        return;
    }
    balance -= 100;
    let multiplier = 1 + Math.random()*4; // 1.0 to 5.0x
    multiplier = Math.round(multiplier*100)/100;
    if(multiplier > 2.5){
        const win = 200 * multiplier;
        balance += Math.floor(win);
        crashResult.textContent = `🚀 Crash x${multiplier}! You win ${Math.floor(win)} coins!`;
        showAd(); // Monetag ad on win
    } else {
        crashResult.textContent = `💥 Crash x${multiplier}! You lost 100 coins.`;
    }
    balanceEl.textContent = balance;
    localStorage.setItem('balance', balance);
});
