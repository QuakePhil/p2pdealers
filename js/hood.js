var floors = 20;
var rooms = 5; // rooms per floor
var sales = new Array(floors * rooms);

function purchase(what, price) {
  if (cash >= price) {
    if (confirm('$' + price + ': ' + what)) {
      gangs[0].cash -= price;
      cash -= price;
      return true;
    }
  }
  return false;
}

function hire(apt, e) {
  // is e.button more common?

  if (!sales[apt] && purchase('Sell from #' + apt + ' ?', 100)) {
    sendchat(name + ' is selling from #' + apt);
    sales[apt] = colors;
    send('hood|'+JSON.stringify([sales]));
    ui();
  } else if (sales[apt] && sales[apt] !== colors && purchase('Hire goons to knock ' + sales[apt] + ' out of #' + apt + ' ?', 100)) {
    sendchat(name + ' hired goons on #' + apt);
    sales[apt] = colors;
    send('hood|'+JSON.stringify([sales]));
    ui();
  }
  e.preventDefault();
  return false;
}

function hood() {
  // hood
  dom = document.getElementById('hood');
  while (dom.firstChild) { dom.removeChild(dom.firstChild); }

  let apt = floors * rooms;
  let div = dce('table');
  for (var i = 0; i < floors; ++i) {
    let floor = dce('tr');
    for (var j = 0; j < rooms; ++j) {
      let room = dce('td');
      if (typeof sales[apt] !== undefined) {
        room.style.border = '1px dashed ' + sales[apt];
      }
      room.appendChild(dct('#' + apt));
      // Re: https://stackoverflow.com/questions/20587714/addeventlistener-for-index-how-to-use-closure#20587755
      room.addEventListener('click', hire.bind(null, apt), false);

      floor.appendChild(room);
      apt--;
    }
    div.appendChild(floor);
  }

  dom.appendChild(div);
}
