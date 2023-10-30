const menuToggler = document.getElementById("menu-toggler");
const navItems = document.getElementById("nav-items");

const projectContainer = document.querySelector(".swiper-wrapper");
const projectDescription = document.querySelector(".project-description");

const contactToggler = document.getElementById("contact-toggler");
const formContactContainer = document.getElementById("contact-form-container");
const formContact = document.getElementById("contact_form");

const downloadButton = document.querySelector("#download-button");

// <------------- DESCARGA ARCHIVO DE LA HOJA DE VIDA -------------->

const download = (path, goBlank, fileName) => {
  const downloadInstance = document.createElement('a');
  downloadInstance.href = path;
  downloadInstance.target = goBlank ? '_blank' : '';

  document.body.appendChild(downloadInstance);
  downloadInstance.click();
  document.body.removeChild(downloadInstance);
};

downloadButton.addEventListener('click', () => {
  download('assets/files/Hoja-de-vida-Julian-2.pdf', true, 'Hoja-de-vida-julian')
});

// <------------- RELLENAR EL CONTENEDOR DE LOS SLIDES ------------->
const projects = [
  {
    id: 1,
    title: "Calculadora",
    date: "",
    description:
      "Calculadora funcional en todos los aspectos hecha con HTML5, CSS3 con estilos personalizados usando la metodología BEM y Vanilla JavaScript con una metodología de programacion funcional",
    tags: [
      { name: "Html", color: "#EBFF00" },
      { name: "JavaScript", color: "#FF8A00" },
      { name: "Css", color: "#00FFFF" },
    ],
    img_src: "assets/images/media/calculadora.png",
  },
  {
    id: 2,
    title: "Alkeflix",
    date: "",
    description:
      "Una pagina web que se conecta a la API de theMovieDb que permite buscar filmes, ver una seccion con detalles de la pelicula y agregar o quitar a una seccion de favoritos",
    tags: [
      { name: "Html", color: "#EBFF00" },
      { name: "JavaScript", color: "#FF8A00" },
      { name: "Css", color: "#00FFFF" },
      { name: "React", color: "#2596be" },
    ],
    img_src: "assets/images/media/alkeflix.png",
  },
  {
    id: 2,
    title: "Spotify clone",
    date: "",
    description:
      "Buscador que permite acceder a la cuenta de un usuario en Spotify y buscar pistas, albumes, artistas, etc. Tambien permite ver una breve descripcion de cada elemento buscado y encontrado <br/> <span class='italic font-light'>Nota: Por razones de seguridad no puedo mostrar un demo, sin embargo si gustas replicar el proyecto en mi gitHub encontraras las instrucciones</span>",
    tags: [
      { name: "Html", color: "#EBFF00" },
      { name: "JavaScript", color: "#FF8A00" },
      { name: "Css", color: "#00FFFF" },
      { name: "React", color: "#2596be" },
    ],
    img_src: "assets/images/media/spotify.png",
  },
];

projectDescription.innerHTML = `
  <div class="h-full w-full border-10 rounded-2xl shadow-2xl"
    style="background-image: url('${projects[0].img_src}'); background-position: center; background-size: cover;">
      <div class="w-full h-full p-4 flex flex-col justify-end items-start backdrop-blur-md">
        <span class="font-bold relative text-lg text-left sub-sm">
        ${projects[0].title}
        </span>
        <span>30/07/2023</span>
        <p>${projects[0].description}</p>
        <span class="font-bold relative text-lg text-left sub-sm">Tecnologias usadas:</span>
        <div class="flex gap-2 mt-1" id="tags-${projects[0].id}">
        </div>
    </div>
  </div>
`;

const tagContainer = document.querySelector(`#tags-${projects[0].id}`);

projects[0].tags.forEach((item) => {
  tagContainer.innerHTML += `<span class="relative text-sm bg-[${item.color}] px-2 rounded-lg text-left ">${item.name}</span>`;
});

projects.forEach((element) => {
  projectContainer.innerHTML += `
  <div class="swiper-slide flex justify-center" id="${element.id}">
    <div class="w-10/12 md:w-7/12 xl:w-6/12 h-4/5 shadow-2xl rounded-2xl"
      style="background-image: url(${element.img_src}); background-position: center; background-size: cover;">
    </div>
</div>`;
});

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

swiper.on("activeIndexChange", (swiper) => {
  const project = projects[swiper.activeIndex];
  
  projectDescription.innerHTML = `<div class="h-full w-full border-10 rounded-2xl shadow-2xl"
  style="background-image: url('${project.img_src}'); background-position: center; background-size: cover;">
    <div class="w-full h-full p-4 flex flex-col justify-end items-start backdrop-blur-md">
      <span class="font-bold relative text-lg text-left sub-sm">
      ${project.title}
      </span>
      <span>30/07/2023</span>
      <p>${project.description}</p>
      <span class="font-bold relative text-lg text-left sub-sm">Tecnologias usadas:</span>
      <div class="flex gap-2 mt-1" id="tags-${project.id}">
      </div>
  </div>
</div>`;

const tagContainer = document.querySelector(`#tags-${project.id}`);

project.tags.forEach((item) => {
  
  tagContainer.innerHTML += `<span class="relative text-sm bg-[${item.color}] px-2 rounded-lg text-left ">${item.name}</span>`;
});

});

menuToggler.addEventListener("click", () => {
  navItems.classList.toggle("nav-items__show");
});

contactToggler.addEventListener("click", () => {
  formContactContainer.classList.toggle("contact-form__show");
});

/* <------------------ FORMULARIO -------------------->*/
async function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(this);

  const response = await fetch("https://formspree.io/f/xlezyjov", {
    method: this.method,
    body: form,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    formContact.reset();
    alert(
      "Gracias por contactarte conmigo, te estaré respondiendo muy pronto :)"
    );
  } else {
    formContact.reset();
    alert(
      "Oh no! algo ha ido mal a la hora de enviar el correo intentalo mas tarde :'("
    );
  }
}

formContact.addEventListener("submit", handleSubmit);
