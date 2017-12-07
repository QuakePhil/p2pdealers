var backlog = 'Welcome to O.G. Chat 1.0\n';

function sendchat(blah) {
  blah = blah + '\n';
  dge('chat').value += blah;
  backlog += blah;
  send('say|' + blah);
}

function blahblah() {
  let message = dge('message').value;
  let blah = gang.name + ': ' + message;
  sendchat(blah);
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
