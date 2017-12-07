// can we refactor this datachannel stuff?
// all we need for the p2p api is:
// send(s), open(id), connect(id), onopen(user), onleave(user), onmessage(s, user)
var h = new DataChannel();

function send(what) {
  console.log('sending:', what);
  h.send(what);
}

function outro() {
  dge('connectButton').disabled = true;
  dge('intro').style.display = 'none';

  ui();
}

function startPeers() {
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  raiding = 0;
  gang.id = array[0];
  gang.cash = 420;
  if (gang.name == '') gang.name = gangname();
  gang.colors = dge('colors').value;
  console.log('starting with:', gang);
  h.open(gang.id);
  gangs.push(gang);
  outro();
}

function connectPeers() {
  gang.id = prompt('Enter hood id');
  if (!gang.id) return;
  raiding = 1;
  gang.cash = 420;
  if (gang.name == '') gang.name = gangname();
  gang.colors = dge('colors').value;
  console.log('raiding with:', gang);
  h.connect(gang.id);
  gangs.push(gang);
  outro();
}

h.onopen = function(user) {
  console.log('opened:', user);
  gangs.push({user: user});
  ui();
  send('info|' + JSON.stringify(gang));
  if (raiding !== 1) {
    send('hood|' + JSON.stringify([sales]));
  }
}

h.onleave = function(user) {
  console.log('left:', user);
  for (var i in gangs) if (gangs[i].user == user) {
    gangs.splice(i, 1);
  }
  ui();
}

h.onmessage = function(message, user) {
  let redraw = false;
  console.log('received:', message, user);
  spec = message.split('|', 2);
  console.log(spec);
  if (spec[0] == 'info') {
    spec[1] = JSON.parse(spec[1]);
    for (var i in gangs) if(gangs[i].user == user) {
      spec[1].user = user;
      gangs[i] = spec[1];
      redraw = true;
    }
    console.log(gangs);
    console.log('set info for user', user, ' to ', spec[1]);
  }
  if (spec[0] == 'say') {
    dge('chat').value += spec[1];
    backlog += spec[1];
  }
  if (spec[0] == 'hood') {
    let info = JSON.parse(spec[1]);
    sales = info[0];
    redraw = true;
  }

  if (redraw !== false) {
    ui();
  }
}
