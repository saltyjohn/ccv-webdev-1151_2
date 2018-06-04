const assignmentListItems = document.getElementById('assignments-list').childNodes;

// (..., 'nodeType', 1, ...) => to target element nodes only
filterChildNodes(
  assignmentListItems,
  'nodeType',
  1,
  updateListItem
);

/**
 * Function to append 'Assignment not yet completed'
 * element to assignments with any missing links
 * Also prepends bullet points for lists
 */
function updateListItem(obj) {
  // Custom Bullet mark
  createNewNode(
    obj,
    'div',
    '>',
    'link-bullet',
    'prepend'
  );

  const listItems = obj.children;
  let anchorChildren = [...obj.getElementsByTagName('a')];

  // check if any links are set to "#"
  let linksActive = true;
  anchorChildren.forEach(link => {
    if (link.getAttribute('href') === '#') {
      linksActive = false
    }
  });

  // Change color elements to active color scheme
  if (linksActive) {
    obj.classList.add('item-active')
  } else {
    // Append message
    createNewNode(
      obj,
      'p',
      '*** Assignment not yet completed***',
      'not-completed-text',
      'append'
    );
  }
}

/**
 * Extracted function for node filtering
 * TODO: decide where or not to keep function extracted...
 * is not needed for more than one instance
 * */
function filterChildNodes(nodes, filter, filterVal, callback) {
  for (element in nodes) {
    const targetElement = nodes[element];
    if (targetElement[filter] === filterVal) {
      callback(targetElement);
    }
  }
}

/**
 * Extracted function for node creation
 */
function createNewNode(targetNode, el, text, className, pend) {
  const newNode = document.createElement(el);

  newNode.innerHTML = text;
  newNode.classList.add(className)

  if (pend === 'prepend') targetNode.prepend(newNode);
  else if (pend === 'append') targetNode.append(newNode);
  else console.log(`Error: Could not add class '${className}' to target. Node setting '${pend}' not understood.`);
}
