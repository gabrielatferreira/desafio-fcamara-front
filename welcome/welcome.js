/* abre e fecha o menu quando clicar no icone: hamburger e X */
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show')
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content')
    var i
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
}

/* quando clicar em um item do menu, esconder o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScrool() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* When Scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScrool()
})

const acessoFazerBooking = () => {
  document.location.href = '../booking/index-booking.html'
}

const carregaNomeUsuario = () => {
  const nome = localStorage.getItem('nome')
  document.getElementById('nome-usuario').innerHTML = nome
}

carregaNomeUsuario()

/* consulta das reservas */

const createEl = (type, className) => {
  const elem = document.createElement(type);
  elem.onclick = {}
  if(className !== null && className !== '' && className !== "")
    elem.classList.add(className);
  return elem;
}

const createReservasRealizadas = (reserva, numero) => {

  const card = createEl('div', 'card');
  card.id = `card_hidden_${numero}`;
  const html = `<div class="card-container">
      <div class="date">
        <div class="menu-more">
          <div class="dropdown">
            <button onclick="myFunction()" class="dropbtn"></button>
            <div id="myDropdown" class="dropdown-content">
              <a href="#home"
                ><span class="icon-TypeEdit"></span> Editar</a
              >
              <a href="#about"
                ><span class="icon-TypeDelete"></span> Apagar</a
              >
            </div>
          </div>
        </div>
        <div class="information">
          <label id="data_reserva">${reserva.data_reserva.replaceAll("-","/")}</label>
        </div>
      </div>
      <div class="divider-1"></div>
      <div class="section">
        <div class="information">
          <i class="icon-TypePlace" id="icon-confirmation"></i>
          <h4 id="unidade_negocio">${reserva.nome_unidade_negocio}</h4>
        </div>

        <div class="information">
          <i class="icon-TypeWork" id="icon-confirmation"></i>
          <h4 id="estacao_trabalho">${reserva.nome_estacao_trabalho}</h4>
        </div>
      </div>
    </div>`
    card.innerHTML = html;
    return card;
}

const getReservasDisponiveis = async () => {

  const id_usuario = localStorage.getItem('id');
  console.log(id_usuario + "euuuu");

  const response = await fetch(`https://orangepoint.herokuapp.com/reservas/${id_usuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  });

  const myJson = await response.json();
  console.log(myJson);
  if(myJson != null && myJson != undefined && myJson.length > 0) {
    document.getElementById('sem_agendamentos').style.display = "none";
    for (var index in myJson) {
      document.getElementById("reservas_realizadas").appendChild(createReservasRealizadas(myJson[index], index))
    }
  } else {
    document.getElementById('sem_agendamentos').style.display = "block";
  }
  
}

getReservasDisponiveis();