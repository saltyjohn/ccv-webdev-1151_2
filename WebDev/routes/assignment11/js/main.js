const forms = document.querySelectorAll('fieldset');
const createBtn = document.getElementById('create-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentViewID = 1;
let formObj = {}


let i = 1
forms.forEach(form => {
  if (form.id) {
    form.style.display = 'none';
    formObj[i] = {}
    formObj[i].page = i;
    formObj[i].el = form;
    i++;
  }
})

const showForm = (viewId, prevId) => {
  formObj[viewId].el.style.display = 'block';
  if (prevId) {
    formObj[prevId].el.style.display = 'none';
  }

  if (currentViewID === 1) {
    prevBtn.style.visibility = 'hidden';
  } else if (currentViewID === 4) {
    createBtn.style.display = 'block';
    nextBtn.style.visibility = 'hidden';
  } else {
    nextBtn.style.visibility = 'visible';
    prevBtn.style.visibility = 'visible';
  }

  if (currentViewID !== 4) {
    createBtn.style.display = 'none';
  }
}
showForm(currentViewID)

const changeView = (e) => {
  const btn = e.target;
  const prevView = currentViewID;
  if (btn.id === "prev-btn") {
    if (currentViewID > 1) {
      currentViewID--;
    }
  } else if (btn.id === 'next-btn') {
    if (currentViewID < 4) {
      currentViewID++;
    }
  }
  showForm(currentViewID, prevView)
}

prevBtn.addEventListener('click', changeView)
nextBtn.addEventListener('click', changeView)
