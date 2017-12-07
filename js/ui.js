function dce(what) {
  return document.createElement(what);
}

function dct(what) {
  return document.createTextNode(what);
}

function blahblah() {
  let blah = name + ': ' + document.getElementById('message').value + '\n';
  document.getElementById('chat').value += blah;
  send('say|' + blah);
  document.getElementById('message').value = '';
}

function chat() {
  let div = dce('div');
  let input = dce('input');
  let blah = dce('button');
  let textarea = dce('textarea');

  div.className = 'chat';
  blah.appendChild(dct('Blah'));
  blah.addEventListener('click', blahblah, false);

  input.type = "text";
  input.id = "message";
  input.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') blahblah();
  }, false);

  textarea.id = "chat";

  div.appendChild(textarea);
  div.appendChild(dce('br'));
  div.appendChild(input);
  div.appendChild(blah);
  return div;
}

function ui() {
  let dom = document.getElementById('ui');
  while (dom.firstChild) { dom.removeChild(dom.firstChild); }

  let players = dce('table');
  for (var i = 0; i < gangs.length; ++i) {
    let td = dce('td');
    td.style.background = gangs[i].colors;
    td.appendChild(dct(gangs[i].name + ' $' + gangs[i].cash));
    let tr = dce('tr');
    tr.appendChild(td);
    players.appendChild(tr);
  }

  let button = dce('button');
  button.appendChild(dct(name));
  button.addEventListener('click', updatename, false);

  dom.appendChild(button);
  dom.appendChild(dce('br'));
  dom.appendChild(document.createTextNode('Hood id: ' + id));
  dom.appendChild(players);
  dom.appendChild(chat());

  // hood
  dom = document.getElementById('hood');
  while (dom.firstChild) { dom.removeChild(dom.firstChild); }
  dom.appendChild(hood());
}
