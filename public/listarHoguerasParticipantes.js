const cont = document.querySelector('.divCentral');

window.onload = async () => {
  const [hogueras, participantes] = await Promise.all([
    fetch('/hogueras').then(r => r.json()),
    fetch('/participantes').then(r => r.json())
  ]);
  renderListas(hogueras, participantes);
};

function renderListas(hogueras, participantes) {
  cont.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h2>Hogueras</h2>
        <ul class="list-group mb-4">
          ${hogueras.map(h => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${h.nombre} - ${h.temporada} - ${h.ubicacion} - ${h.parejas} parejas
              <span>
                <a href="anadirHoguera.html?id=${h._id}" target="_blank" class="btn btn-warning btn-sm">✏️</a>
                <button onclick="eliminar('/hogueras/${h._id}')" class="btn btn-danger btn-sm">🗑️</button>
              </span>
            </li>`).join('')}
        </ul>
      </div>

      <div class="col-md-6">
        <h2>Participantes</h2>
        <ul class="list-group mb-4">
          ${participantes.map(p => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${p.nombre} - ${p.edad} años - ${p.rol} - T${p.temporada}
              <span>
                <a href="anadirParticipante.html?id=${p._id}" target="_blank" class="btn btn-warning btn-sm">✏️</a>
                <button onclick="eliminar('/participantes/${p._id}')" class="btn btn-danger btn-sm">🗑️</button>
              </span>
            </li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

async function eliminar(url) {
  if (confirm('¿Seguro que quieres eliminar este elemento?')) {
    await fetch(url, { method: 'DELETE' });
    location.reload();
  }
}
