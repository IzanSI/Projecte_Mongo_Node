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
    <div style="display: flex; justify-content: space-around; gap: 40px; flex-wrap: wrap; padding: 8%;">
      <div style="border: black 2px solid; padding: 30px; background-color: #e5cc9b; border-radius: 10px;">
        <h2>Hogueras</h2>
        <table style="border-collapse: separate; border-spacing: 0 10px; width: 100%;">
          <thead>
            <tr style="background-color: #EC8750FF; color: saddlebrown;">
              <th>Nombre</th>
              <th>Temporada</th>
              <th>Ubicación</th>
              <th>Parejas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${hogueras.map(h => `
              <tr style="color: saddlebrown; border: 1px solid black;">
                <td>${h.nombre}</td>
                <td>${h.temporada}</td>
                <td>${h.ubicacion}</td>
                <td>${h.parejas}</td>
                <td>
                  <a href="anadirHoguera.html?id=${h._id}" class="btn btn-warning btn-sm">✏️</a>
                  <button onclick="eliminar('/hogueras/${h._id}')" class="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="border: black 2px solid; padding: 30px; background-color: #e5cc9b; border-radius: 10px;">
        <h2>Participantes</h2>
        <table style="border-collapse: separate; border-spacing: 0 10px; width: 100%;">
          <thead>
            <tr style="background-color: #ec8750; color: saddlebrown;">
              <th>Nombre</th>
              <th>Edad</th>
              <th>Rol</th>
              <th>Temporada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${participantes.map(p => `
              <tr style="color: saddlebrown; border: 1px solid black;">
                <td>${p.nombre}</td>
                <td>${p.edad}</td>
                <td>${p.rol}</td>
                <td>${p.temporada}</td>
                <td>
                  <a href="anadirParticipante.html?id=${p._id}" class="btn btn-warning btn-sm">✏️</a>
                  <button onclick="eliminar('/participantes/${p._id}')" class="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
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
