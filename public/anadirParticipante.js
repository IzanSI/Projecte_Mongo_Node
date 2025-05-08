const form = document.createElement('form');
form.id = 'formParticipante';
form.innerHTML = `
  <div class="mb-2"><input required name="nombre" class="form-control" placeholder="Nombre"></div>
  <div class="mb-2"><input required name="edad" type="number" class="form-control" placeholder="Edad"></div>
  <div class="mb-2">
    <select required name="rol" class="form-select">
      <option value="">Rol</option>
      <option value="tentador">Tentador</option>
      <option value="pareja">Pareja</option>
    </select>
  </div>
  <div class="mb-2"><input required name="temporada" type="number" class="form-control" placeholder="Temporada"></div>
  <button class="btn btn-primary">Guardar</button>
`;
document.querySelector('.divCentral').appendChild(form);

const params = new URLSearchParams(location.search);
const id = params.get('id');

if (id) {
  fetch('/participantes/' + id)
    .then(res => res.json())
    .then(data => {
      for (const [key, value] of Object.entries(data)) {
        if (form[key]) form[key].value = value;
      }
    });
}

form.onsubmit = async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const url = id ? '/participantes/' + id : '/participantes';
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert(id ? 'Participante actualizado' : 'Participante añadido');
  if (!id) form.reset(); else window.close();
};
