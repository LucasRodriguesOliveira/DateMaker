import fieldsProps from './field-props.js';
import colorsClassNames from './color-names.js';

const btnGenerate = document.getElementById('btn-generate');
btnGenerate.onclick = generate;

Array.prototype.getRandomValue = function() {
  return this.length > 0 ? this[parseInt(Math.random() * this.length)] : -1;
}


function randomlyPickAValue(arrayOfValues) {
  const randomValue = arrayOfValues.getRandomValue();

  if(randomValue === -1) {
    return 'Lista vazia! Faça qualquer coisa.';
  }

  return randomValue;
}

function createText(text) {
  return document.createTextNode(text);
}

function createElement(tag, classList, childs) {
  const element = document.createElement(tag);

  element.classList.add(...classList);

  if((Array.isArray(childs) && childs.length)
  ) {
    element.append(...childs);
  } else if (!!childs) {
    element.append(childs);
  }

  return element;
}

function createFieldTitle(title) {
  return createElement('div', ['field-title'], createText(title));
}

function createContentField(content) {
  const contentText = createText(randomlyPickAValue(content));

  return createElement('div', ['field-result'], contentText);
}

function getColor() {
  const color = randomlyPickAValue(colorsClassNames.filter((color) => !color.used));
  color.used = true;

  return color.name;
}

function createField({ title, values }) {
  const titleField = createFieldTitle(title);
  const contentField = createContentField(values);
  const color = getColor();

  const field = createElement('div', ['field', color], [titleField, contentField]);

  return field;
}

function createFields(props) {
  return props
    .filter((fieldProp) => {
      if(Object.keys(fieldProp).includes('only')) {
        return fieldProp.only;
      } else {
        return true;
      }
    })
    .filter((fieldProp) => !fieldProp.ignore)
    .map((fieldProp) => createField(fieldProp));
}

function clear(resultBox) {
  Array
    .from(resultBox.children)
    .forEach((child) => {
      resultBox.removeChild(child);
  });

  colorsClassNames.forEach((color) => color.used = false);
}

function generate() {
  const [resultBox] = document.getElementsByClassName('result');

  if(resultBox.children.length >= 4) {
    clear(resultBox);
  }

  const fields = createFields(fieldsProps);

  resultBox.append(...fields);
}
