const form = document.createElement('form');
form.style.width = '70%';
form.style.height='60%';
form.style.marginLeft = 'auto';
form.style.marginRight = 'auto';
form.id = 'formHoguera';
form.innerHTML = `
<div style="border: black 2px solid; padding-top: 5%; background-color: #84eee6">

  <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="nombre" class="form-control" placeholder="Nombre"></div>
  <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="temporada" type="number" class="form-control" placeholder="Temporada"></div>
  <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="ubicacion" class="form-control" placeholder="Ubicación"></div>
  <div class="mb-2"><input style="width: 30%; padding: 1%; margin: 2%" required name="parejas" type="number" class="form-control" placeholder="Parejas"></div>
  <button style="width: 12%; padding: 1.5%; background-color: antiquewhite; border-radius: 50%; margin: 5%" class="btn btn-primary">Guardar</button>

</div>
  
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
