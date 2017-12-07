function gangname() {
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  }
  let superlatives = ['Awesome', 'Cool', 'Scary', 'Heavy', 'United', 'Super'];
  let suffix = ['Clan', 'Band', 'Crew', 'Association', 'Syndicate', 'Gang', 'Company', 'Soldiers'];
  return superlatives.random() + ' ' + suffix.random();
}

function updatename() {
  if (!gang.name) gang.name = gangname();
  let newname = prompt('New Gang Name', gang.name);
  if (newname) {
    gang.name = newname;
    if (gangs.length > 0) {
      gangs[0].name = gang.name;
      send('info|'+JSON.stringify(gang));
      ui();
    }
  }
  return name;
}
