const title = document.getElementById('title');
const text = title.textContent;
const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#ff6b81', '#eccc68', '#a29bfe'];

title.textContent = '';
text.split('').forEach(char => {
  const span = document.createElement('span');
  span.textContent = char === ' ' ? '\u00A0' : char;
  span.classList.add('letter');
  span.addEventListener('click', () => explodeLetter(span));
  title.appendChild(span);
});

function explodeLetter(letter) {
  const rect = letter.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  letter.style.color = colors[Math.floor(Math.random() * colors.length)];
  letter.classList.remove('bounce');
  void letter.offsetWidth;
  letter.classList.add('bounce');

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const angle = Math.random() * 2 * Math.PI;
    const distance = 60 + Math.random() * 120;
    const dx = Math.cos(angle) * distance + 'px';
    const dy = Math.sin(angle) * distance + 'px';
    const size = 6 + Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      --dx: ${dx};
      --dy: ${dy};
    `;

    document.body.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove());
  }
}

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('letter')) return;

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');

    const startX = Math.random() * window.innerWidth;
    const duration = 1.5 + Math.random() * 2;
    const size = 8 + Math.random() * 12;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = Math.random() * 720;
    const drift = (Math.random() - 0.5) * 200;

    confetti.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      animation: fall ${duration}s ease-in forwards;
      --drift: ${drift}px;
      --rotation: ${rotation}deg;
    `;

    document.body.appendChild(confetti);
    confetti.addEventListener('animationend', () => confetti.remove());
    showLoveMessage(e.clientX, e.clientY);
  }
});

function showLoveMessage(x, y) {
  const msg = document.createElement('div');
  msg.textContent = '❤️ I love you!';
  msg.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    transform: translate(-50%, -50%);
    font-size: 36px;
    font-family: Arial, sans-serif;
    color: white;
    font-weight: bold;
    pointer-events: none;
    animation: floatUp 1.5s ease-out forwards;
    text-shadow: 0 0 10px #ff4757;
    white-space: nowrap;
  `;
  document.body.appendChild(msg);
  msg.addEventListener('animationend', () => msg.remove());
}