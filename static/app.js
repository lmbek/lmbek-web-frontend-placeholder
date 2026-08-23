// Greeting definitions
const greetings = {
  en: {
    badge: '👋 Hello, World!',
    code: 'console.log("Hello, World! 👋");',
  },
  da: {
    badge: '🇩🇰 Hej Verden!',
    code: 'fmt.Println("Hej, Verden! 🇩🇰")',
  },
  go: {
    badge: '⚡ Go 1.26',
    code: 'package main\n\nfunc main() {\n    println("Hello, World! 🚀")\n}',
  },
  sh: {
    badge: '💻 Terminal',
    code: 'echo "Hello, World! 🌍"',
  },
};

// Interactive Greetings Switcher
function setupGreetingButtons() {
  const buttons = document.querySelectorAll('.greeting-btn');
  const badgeEl = document.getElementById('greeting-badge');
  const codeEl = document.getElementById('code-snippet');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const lang = btn.getAttribute('data-lang');
      const greeting = greetings[lang] || greetings.en;

      if (badgeEl) badgeEl.textContent = greeting.badge;
      if (codeEl) {
        codeEl.innerHTML = `<code>${escapeHtml(greeting.code)}</code>`;
      }
    });
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}

// Live Clock
function updateClock() {
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  }
}

// Check Service & Cluster Info
async function fetchSystemStatus() {
  const statusText = document.getElementById('status-text');
  try {
    const res = await fetch('/api/info');
    if (res.ok) {
      const data = await res.json();
      if (statusText) {
        const envLabel = data.environment ? data.environment.toUpperCase() : 'LOCAL';
        statusText.textContent = `Cluster Environment: ${envLabel} · Status: ${data.status}`;
      }
    }
  } catch (err) {
    if (statusText) {
      statusText.textContent = 'Platform Online (Local Mode)';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupGreetingButtons();
  updateClock();
  setInterval(updateClock, 1000);
  fetchSystemStatus();
});
