// can we refactor this datachannel stuff?
// all we need for the p2p api is:
// send(s), open(id), connect(id), onopen(user), onleave(user), onmessage(s, user)
var h = new DataChannel();

var gangs = [];
var id = 0;
var colors = '';
var name = '';

function send(what) {
  console.log('sending:', what);
  h.send(what);
}

function outro() {
  document.getElementById('connectButton').disabled = true;
  document.getElementById('intro').style.display = 'none';

  ui();
}

function startPeers() {
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  id = array[0];
  if (name == '') name = gangname();
  colors = document.getElementById('colors').value;
  console.log('starting with:', id, colors);
  h.open(id);
  gangs.push({colors: colors, user: 0, name: name});
  outro();
}

function connectPeers() {
  colors = document.getElementById('colors').value;
  id = prompt('Enter hood id');
  if (!id) return;
  if (name == '') name = gangname();
  console.log('raiding with:', id);
  h.connect(id);
  gangs.push({colors: colors, user: 0, name: name});
  outro();
}

h.onopen = function(user) {
  console.log('opened:', user);
  gangs.push({colors: '', user: user, name: ''});
  ui();
  send('info|' + colors + ':' + name);
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
    let info = spec[1].split(':');
    for (var i in gangs) if(gangs[i].user == user) {
      gangs[i].colors = info[0];
      gangs[i].name = info[1];
      redraw = true;
    }
    console.log(gangs);
    console.log('set colors for user', user, ' to ', spec[1]);
  }
  if (spec[0] == 'say') {
    document.getElementById('chat').value += spec[1];
  }

  if (redraw !== false) {
    ui();
  }
}
