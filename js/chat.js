var backlog = 'Welcome to O.G. Chat 1.0\n';

function sendchat(blah) {
  blah = blah + '\n';
  dge('chat').value += blah;
  backlog += blah;
  send('say|' + blah);
}

function blahblah() {
  let message = dge('message').value;
  if (message.charAt(0) == '/') {
    let out = '';
    if (message == '/reup') {
      out = reup(200);
    } else if (message == '/sell') {
      out = sell();
    } else {
      out = '/help - this message\n/reup - purchase $200 worth of product\n/sell - self explanatory\n';
    }
    dge('chat').value += out;
    backlog += out;
  } else {
    let blah = gang.name + ': ' + message;
    sendchat(blah);
  }
  dge('message').value = '';
}

function chat() {
  let div = dce('div');
  let input = dce('input');
  let blah = dce('button');
  let textarea = dce('textarea');

  div.className = 'chat';
  blah.appendChild(dct('Blah'));
  blah.addEventListener('click', blahblah, false);

  input.type = 'text';
  input.id = 'message';
  input.addEventListener('keypress', function(e) {
    if (e.key == 'Enter') blahblah();
  }, false);

  textarea.id = 'chat';
  textarea.value = backlog;
  textarea.disabled = true;

  div.appendChild(textarea);
  div.appendChild(dce('br'));
  div.appendChild(input);
  div.appendChild(blah);
  return div;
}
