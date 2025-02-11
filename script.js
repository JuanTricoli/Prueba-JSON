"use strict";

// Variable global que contendrá los datos cargados desde JSON
let translations = {};
let currentLang = 'en';
let allOpen = false;

// Determinar la versión según un parámetro en la URL (por ejemplo: ?version=alt)
const urlParams = new URLSearchParams(window.location.search);
const version = urlParams.get('version') || 'default';
// Puedes tener más versiones; aquí se usan "default" y "alt"
const jsonFile = version === 'alt' ? 'data-alt.json' : 'data-default.json';

// Elementos del DOM (se mantienen iguales)
const titleName = document.getElementById('titleName');
const titleRole = document.getElementById('titleRole');
const titleLocation = document.getElementById('titleLocation');
const linkedinBtn = document.getElementById('linkedinBtn');
const toggleAllBtn = document.getElementById('toggleAll');
const printBtn = document.getElementById('printBtn');

const btnAbout = document.getElementById('btnAbout');
const txtAbout = document.getElementById('txtAbout');

const btnExperience = document.getElementById('btnExperience');
const exp1Title = document.getElementById('exp1Title');
const exp1Desc = document.getElementById('exp1Desc');
const exp2Title = document.getElementById('exp2Title');
const exp2Desc = document.getElementById('exp2Desc');

const btnSkills = document.getElementById('btnSkills');
const skill1 = document.getElementById('skill1');
const skill2 = document.getElementById('skill2');
const skill3 = document.getElementById('skill3');
const skill4 = document.getElementById('skill4');
const skill5 = document.getElementById('skill5');

const btnEducation = document.getElementById('btnEducation');
const edu1 = document.getElementById('edu1');
const edu2 = document.getElementById('edu2');
const edu3 = document.getElementById('edu3');

const btnLanguages = document.getElementById('btnLanguages');
const lang1 = document.getElementById('lang1');
const lang2 = document.getElementById('lang2');

const btnProjects = document.getElementById('btnProjects');
const projectsHeader = document.getElementById('projectsHeader');
const proj1 = document.getElementById('proj1');
const proj2 = document.getElementById('proj2');
const proj3 = document.getElementById('proj3');

const btnContact = document.getElementById('btnContact');
const contactHeader = document.getElementById('contactHeader');
const contactDesc = document.getElementById('contactDesc');
const lblName = document.getElementById('lblName');
const lblPhone = document.getElementById('lblPhone');
const lblEmail = document.getElementById('lblEmail');
const lblMessage = document.getElementById('lblMessage');
const btnSubmit = document.getElementById('btnSubmit');
const txtMessage = document.getElementById('message');
const theContactFormEl = document.getElementById('theContactForm');
const successMsg = document.getElementById('successMsg');
const formErrorMsg = document.getElementById('formErrorMsg');

// Botones de idioma
const langEn = document.getElementById('langEn');
const langEs = document.getElementById('langEs');

// Lista de todos los botones de sección y cajas
const toggleButtons = document.querySelectorAll('.toggle-btn');
const infoBoxes = document.querySelectorAll('.info-box');

// Función para actualizar el botón Expandir/Colapsar Todo según el estado actual
function updateToggleAllButton() {
  allOpen = Array.from(infoBoxes).every(box => box.classList.contains('visible'));
  const t = translations[currentLang];
  toggleAllBtn.textContent = allOpen ? t.collapseAll : t.expandAll;
  toggleAllBtn.setAttribute('aria-expanded', allOpen);
}

// Función para cargar las traducciones (ahora provenientes del JSON)
function loadLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  titleName.innerText = t.name;
  titleRole.innerText = t.role;
  titleLocation.innerText = t.location;
  linkedinBtn.innerText = t.linkedin;

  toggleAllBtn.innerText = allOpen ? t.collapseAll : t.expandAll;
  printBtn.innerText = t.printCV;

  btnAbout.innerText = t.btnAbout;
  btnExperience.innerText = t.btnExperience;
  btnSkills.innerText = t.btnSkills;
  btnEducation.innerText = t.btnEducation;
  btnLanguages.innerText = t.btnLanguages;
  btnProjects.innerText = t.btnProjects;
  btnContact.innerText = t.btnContact;

  txtAbout.innerText = t.txtAbout;

  exp1Title.innerText = t.exp1Title;
  exp1Desc.innerText = t.exp1Desc;
  exp2Title.innerText = t.exp2Title;
  exp2Desc.innerText = t.exp2Desc;

  skill1.innerText = t.skill1;
  skill2.innerText = t.skill2;
  skill3.innerText = t.skill3;
  skill4.innerText = t.skill4;
  skill5.innerText = t.skill5;

  edu1.innerText = t.edu1;
  edu2.innerText = t.edu2;
  edu3.innerText = t.edu3;

  lang1.innerText = t.lang1;
  lang2.innerText = t.lang2;

  projectsHeader.innerText = t.projectsHeader;
  proj1.innerText = t.proj1;
  proj2.innerText = t.proj2;
  proj3.innerText = t.proj3;

  contactHeader.innerText = t.contactHeader;
  contactDesc.innerHTML = t.contactDesc;
  lblName.innerText = t.lblName;
  lblPhone.innerText = t.lblPhone;
  lblEmail.innerText = t.lblEmail;
  lblMessage.innerText = t.lblMessage;
  txtMessage.placeholder = t.msgPlaceholder;
  btnSubmit.value = t.submitBtn;

  successMsg.classList.remove('visible');
  formErrorMsg.classList.remove('visible');
}

// Función para actualizar el estado de los botones de idioma
function updateLangButtons(activeLang) {
  langEn.classList.toggle('active', activeLang === 'en');
  langEs.classList.toggle('active', activeLang === 'es');
}

// Cargar el archivo JSON con la información
fetch(jsonFile)
  .then(response => response.json())
  .then(data => {
    translations = data;
    // Detectamos el idioma del usuario y cargamos el contenido
    const userLang = navigator.language || navigator.userLanguage;
    let defaultLang = userLang.toLowerCase().startsWith('es') ? 'es' : 'en';
    loadLang(defaultLang);
    updateLangButtons(defaultLang);
  })
  .catch(error => {
    console.error("Error loading JSON data: ", error);
  });

// Eventos para cambiar de idioma
langEn.addEventListener('click', () => { loadLang('en'); updateLangButtons('en'); });
langEs.addEventListener('click', () => { loadLang('es'); updateLangButtons('es'); });

// Eventos para mostrar/ocultar secciones
toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const target = document.getElementById(targetId);

    if (target.classList.contains('visible')) {
      target.classList.remove('visible');
      btn.classList.add('glow');
      btn.style.animation = 'pulseBtn 3s infinite ease-in-out';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      target.classList.add('visible');
      btn.classList.remove('glow');
      btn.style.animation = 'none';
      btn.setAttribute('aria-expanded', 'true');
    }
    updateToggleAllButton();
  });
});

toggleAllBtn.addEventListener('click', () => {
  allOpen = !allOpen;
  infoBoxes.forEach((box, idx) => {
    if (allOpen) {
      box.classList.add('visible');
      toggleButtons[idx].classList.remove('glow');
      toggleButtons[idx].style.animation = 'none';
      toggleButtons[idx].setAttribute('aria-expanded', 'true');
    } else {
      box.classList.remove('visible');
      toggleButtons[idx].classList.add('glow');
      toggleButtons[idx].style.animation = 'pulseBtn 3s infinite ease-in-out';
      toggleButtons[idx].setAttribute('aria-expanded', 'false');
    }
  });
  updateToggleAllButton();
});

printBtn.addEventListener('click', () => { window.print(); });

// Evento para el formulario de contacto (sin cambios)
theContactFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  theContactFormEl.classList.remove('error');
  formErrorMsg.classList.remove('visible');

  const nameVal = document.getElementById('name').value.trim();
  const phoneVal = document.getElementById('phone').value.trim();
  const emailVal = document.getElementById('email').value.trim();
  const msgVal = document.getElementById('message').value.trim();

  if (!nameVal || !phoneVal || !emailVal || !msgVal) {
    theContactFormEl.classList.add('error');
    formErrorMsg.textContent = translations[currentLang].formError;
    formErrorMsg.classList.add('visible');
    setTimeout(() => { theContactFormEl.classList.remove('error'); }, 1000);
    return;
  }

  const subject = encodeURIComponent(`Contact from ${nameVal}`);
  const body = encodeURIComponent(`Name: ${nameVal}\nPhone: ${phoneVal}\nEmail: ${emailVal}\nMessage: ${msgVal}`);
  const mailtoLink = `mailto:tricolijuan3@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
  successMsg.classList.add('visible');
  theContactFormEl.reset();
});
