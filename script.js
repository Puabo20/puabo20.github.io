
async function launchOS() {
  document.getElementById('status').textContent = 'Launching...';
  try {
    const response = await fetch('modules.yaml');
    if (!response.ok) throw new Error('Module fetch failed');
    const text = await response.text();
    const modules = parseYAML(text);
    const list = document.getElementById('modules-list');
    list.innerHTML = '';
    modules.forEach(m => {
      const li = document.createElement('li');
      li.textContent = m.name + " – " + m.status;
      list.appendChild(li);
    });
    document.getElementById('modules-section').style.display = 'block';
    document.getElementById('status').textContent = 'Modules Loaded Successfully';
  } catch (e) {
    document.getElementById('status').textContent = 'Error loading modules.';
  }
}

function parseYAML(text) {
  return text.trim().split('
- ').slice(1).map(block => {
    const lines = block.split('
').map(l => l.trim());
    const obj = {};
    lines.forEach(line => {
      const [key, ...val] = line.split(': ');
      obj[key] = val.join(': ');
    });
    return obj;
  });
}
