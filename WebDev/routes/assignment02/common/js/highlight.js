const initialHTML = `
<p>You and I have never met, kind stranger on the internet;</p>
    <blockquote>
      <p>our lives have grown in separate ways although we share years, months, weeks, days of passing time - as all who breathe delight from this fine earth do so.
      </p>
    </blockquote>
    <p>
      Together yet apart from end to starting, birth running into death
      constrained by momentary choices.
    </p>
    <p>Confined upon a chariot of spinning stone glazed lightly verdant (trees sprouting upwards, soil washing down) until seasons
      dictate unbiquitous chill- prompted change.</p>
`;

// Function to highlight input text
const highlightSelectedText = () => {
  const queryField = document.getElementById('query-field')
  // const search = document.getElementById('search-input').value.replace('.', '');
  const search = document.getElementById('search-input').value;
  const pNodes = document.getElementsByTagName('p');

  // Reset for backspace keypress
  queryField.innerHTML = initialHTML;

  // Create new RegEx out of input, remove '.' wildcard with escaped '\\.'
  const fixSearch = search.split('.').join('\\.')
  // console.log(search)
  const searchRegex = new RegExp(fixSearch);

  // Loop through paragraph elements
  for (let i in pNodes) {
    const node = pNodes[i];
    // If nodeType is an element,
    // search is not an empty string OR single space,
    // and the search returns a match index
    if (
      node.nodeType === 1 &&
      node.innerText.search(searchRegex) !== -1 &&
      (search !== '' && search !== ' ')
    ) {
      node.innerHTML = node.innerHTML.split(searchRegex).join(`<mark>${search}</mark>`)
      moveEyes(node.innerHTML.search());
    }
    else if (search === '') {
      moveEyes(true)
    }
  }
}

// for initial load and default text value
highlightSelectedText()

// Point glimmer in eyes toward first result in search
// Max [left, top] for right most word 'through.' [34px, 12px]
// Min [left, top] for left most phrase 'I thought' [12px, 8px]
// NOTE: Max && Min arbitrarily changed to look better in eyeVal formulas
function moveEyes(lookback = false) {
  // if nothing is selected
  if (lookback) {
    changeGlimmerPosition(20, 20);
  }
  // calculate and set
  else {
    // retrieve needed elements
    const eye = document.getElementsByClassName('eye')[0];
    const mark = document.getElementsByTagName('mark')[0];
    const minEl = document.getElementsByTagName('p')[2];
    const maxEl = document.getElementsByTagName('p')[3];

    // retrieve location information
    const eyeRect = eye.getBoundingClientRect();
    const markRect = mark.getBoundingClientRect();
    const minRect = minEl.getBoundingClientRect();
    const maxRect = maxEl.getBoundingClientRect();


    // define the center of each element in realtion to the page
    const eyeY = eyeRect.top + 20;
    const eyeX = eyeRect.left + 20;
    const markX = (markRect.width / 2) + markRect.left;
    const markY = (markRect.height / 2) + markRect.top;
    const minY = minRect.top;
    const minX = minRect.left;
    const maxY = maxRect.top;
    // position to far right, the max, is 'right' property
    const maxX = maxRect.right;

    // math from picture, but with updated range and base values
    // to more accurately point in direction of highlighted element
    const eyeValY = (((markY - minY) / (maxY - minY)) * 4) + 6
    const eyeValX = (((markX - minX) / (maxX - minX)) * 22) + 16

    changeGlimmerPosition(eyeValY, eyeValX)
  }
}


// set eye positions for each 'glimmer' element
function changeGlimmerPosition(top, left) {
  const glimmer = document.getElementsByClassName('glimmer');

  for (let i in glimmer) {
    if (i < 2) {
      glimmer[i].style.top = `${top}px`;
      glimmer[i].style.left = `${left}px`;
    }
  }
}
