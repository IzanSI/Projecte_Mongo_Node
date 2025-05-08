const form = document.createElement('form');
form.id = 'formHoguera';
form.innerHTML = `
  <div class="mb-2"><input required name="nombre" class="form-control" placeholder="Nombre"></div>
  <div class="mb-2"><input required name="temporada" type="number" class="form-control" placeholder="Temporada"></div>
  <div class="mb-2"><input required name="ubicacion" class="form-control" placeholder="Ubicación"></div>
  <div class="mb-2"><input required name="parejas" type="number" class="form-control" placeholder="Parejas"></div>
  <button class="btn btn-primary">Guardar</button>
`;
document.querySelector('.divCentral').appendChild(form);

const params = new URLSearchParams(location.search);
const id = params.get('id');

if (id) {
  fetch('/hogueras/' + id)
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
  const url = id ? '/hogueras/' + id : '/hogueras';
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  alert(id ? 'Hoguera actualizada' : 'Hoguera añadida');
  if (!id) form.reset(); else window.close();
};
