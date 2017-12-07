var floors = 20;
var rooms = 5; // rooms per floor
var floor = new Array(floors * rooms);
for (var i = 0; i < floor.length; ++i) {
  floor[i] = {};
}

function purchase(what, price) {
  if (gang.cash >= price) {
    if (confirm('$' + price + ': ' + what)) {
      gangs[0].cash -= price;
      return true;
    }
  } else {
    alert(what + ' You need $' + price);
  }
  return false;
}

function hire(apt, e) {
  // is e.button more common?

  if (!floor[apt]['colors']
    && purchase('Sell from #' + apt + ' ?', 100)) {
    sendchat(gang.name + ' is selling from #' + apt);
    floor[apt]['colors'] = gang.colors;
    send('hood|' + JSON.stringify([floor]));
    send('info|' + JSON.stringify(gang));
    ui();
  } else if (floor[apt]['colors'] && floor[apt]['colors'] !== gang.colors
          && purchase('Hire goons to knock ' + floor[apt] + ' out of #' + apt + ' ?', 420)) {
    sendchat(gang.name + ' hired goons on #' + apt);
    floor[apt]['colors'] = gang.colors;
    floor[apt]['goons'] = gang.colors;
    send('hood|' + JSON.stringify([floor]));
    send('info|' + JSON.stringify(gang));
    ui();
  } else if (floor[apt]['colors'] && floor[apt]['colors'] == gang.colors
          && purchase('Hire goons to protect #' + apt + ' ?', 200)) {
    sendchat(gang.name + ' hired goons for #' + apt);
    floor[apt]['goons'] = gang.colors;
    send('hood|' + JSON.stringify([floor]));
    send('info|' + JSON.stringify(gang));
    ui();
  }
  e.preventDefault();
  return false;
}

function hood() {
  // hood
  dom = dge('hood');

  while (dom.firstChild) { dom.removeChild(dom.firstChild); }

  let apt = floors * rooms - 1;
  let div = dce('table');
  for (var i = 0; i < floors; ++i) {
    let row = dce('tr');
    for (var j = 0; j < rooms; ++j) {
      let room = dce('td');
      if (typeof floor[apt]['colors'] !== undefined) {
        room.style.border = '1px dashed ' + floor[apt]['colors'];
        if (typeof floor[apt]['goons'] !== undefined) {
          room.style.borderBottom = '1px solid ' + floor[apt]['goons'];
        }
      }
      room.appendChild(dct('#' + apt));
      // Re: https://stackoverflow.com/questions/20587714/addeventlistener-for-index-how-to-use-closure#20587755
      room.addEventListener('click', hire.bind(null, apt), false);

      row.appendChild(room);
      apt--;
    }
    div.appendChild(row);
  }

  dom.appendChild(div);
}
