function ui() {
  let dom = document.getElementById('ui');
  while (dom.firstChild) { dom.removeChild(dom.firstChild); }

  let players = dce('table');
  for (var i = 0; i < gangs.length; ++i) {
    let td = dce('td');
    td.style.background = gangs[i].colors;
    if (gangs[i].product > 0) {
      td.appendChild(dct(gangs[i].name + ' $' + gangs[i].cash + ' ($' + gangs[i].product + ')'));
    } else {
      td.appendChild(dct(gangs[i].name + ' $' + gangs[i].cash));
    }
    let tr = dce('tr');
    tr.appendChild(td);
    players.appendChild(tr);
  }

  let button = dce('button');
  button.appendChild(dct(gang.name));
  button.addEventListener('click', updatename, false);

  dom.appendChild(button);
  dom.appendChild(dce('br'));
  dom.appendChild(document.createTextNode('Hood id: ' + gang.id));
  dom.appendChild(players);
  dom.appendChild(chat());

  // hood
  hood();

  dge('message').focus();
}
