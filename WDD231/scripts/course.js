const container = document.getElementById('course-cards');
const totalEl = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.chip[data-filter]');

const courses = [
  { code: 'WDD 231', title: 'Web Frontend Development I', subject: 'WDD', credits: 2, completed: false, image: 'images/wdd231.jpg' },
  { code: 'WDD 131', title: 'Dynamic Web Fundamentals', subject: 'WDD', credits: 2, completed: true, image: 'images/wdd131.jpg' },
  { code: 'CSE 210', title: 'Programming with Classes', subject: 'CSE', credits: 2, completed: true, image: 'images/cse210.jpg' },
  { code: 'CSE 110', title: 'Introduction to Programming', subject: 'CSE', credits: 2, completed: true, image: 'images/cse110.jpg' },
  { code: 'WDD 130', title: 'Web Fundamentals', subject: 'WDD', credits: 2, completed: true, image: 'images/wdd130.jpg' }
];

let currentFilter = 'all';

function renderCourses(list) {
  if (!container) return;
  container.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('article');
    card.className = `card${c.completed ? ' completed' : ''}`;

    if (c.image) {
      const img = document.createElement('img');
      img.className = 'card-thumb';
      img.src = c.image;
      img.alt = `${c.title} course image`;
      img.loading = 'lazy';
      img.width = 120;
      img.height = 84;
      card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'card-body';

    const h3 = document.createElement('h3');
    h3.textContent = `${c.code}`;
    if (c.completed) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = 'Completed';
      h3.appendChild(badge);
    }

    const p = document.createElement('p');
    p.textContent = c.title;

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `${c.subject} • ${c.credits} credits`;

    body.append(h3, p, meta);
    card.append(body);
    container.append(card);
  });
}

function updateCredits(list) {
  if (!totalEl) return;
  const total = list.reduce((sum, c) => sum + c.credits, 0);
  totalEl.textContent = String(total);
}

function applyFilter(subject) {
  currentFilter = subject;
  const filtered = subject === 'all' ? courses : courses.filter(c => c.subject === subject);
  renderCourses(filtered);
  updateCredits(filtered);
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    applyFilter(btn.dataset.filter || 'all');
  });
});

applyFilter('all');
