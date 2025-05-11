const form = document.createElement('form');
form.id = 'formParticipante';
form.style.width = '70%';
form.style.height='60%';
form.style.padding = '2%';
form.style.marginLeft = 'auto';
form.style.marginRight = 'auto';
form.innerHTML = `

<div style="margin-top: 40px; border: black 2px solid; padding-top: 5%; background-color: #84eee6">
  <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="nombre" class="form-control" placeholder="Nombre"></div>
    <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="edad" type="number" class="form-control" placeholder="Edad"></div>
    <div class="mb-2">
      <select style="width: 33%; padding: 1%; margin: 2%" required name="rol" class="form-select">
        <option value="">Rol</option>
        <option value="tentador">Tentador</option>
        <option value="pareja">Pareja</option>
      </select>
    </div>
    <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="temporada" type="number" class="form-control" placeholder="Temporada"></div>
    <button class="btn btn-primary" style="width: 12%; padding: 1.5%; background-color: antiquewhite; border-radius: 50%; margin: 5%">Guardar</button>
</div>
  
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
