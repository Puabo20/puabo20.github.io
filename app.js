const mainContent = document.getElementById('main-content');
const buttons = document.querySelectorAll('#sidebar button');

function loadModule(moduleName) {
  const moduleUrl = `modules/${moduleName}.html`;
  mainContent.innerHTML = 'Loading...';
  fetch(moduleUrl)
    .then(res => {
      if (!res.ok) throw new Error('Module not found');
      return res.text();
    })
    .then(html => {
      mainContent.innerHTML = html;
    })
    .catch(err => {
      mainContent.innerHTML = `<h2>Module "${moduleName}" is coming soon!</h2>`;
    });
}

// Initial load:
loadModule('system-dashboard');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const moduleName = btn.getAttribute('data-module');
    loadModule(moduleName);
  });
});
