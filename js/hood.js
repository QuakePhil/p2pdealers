var floors = 20;
var rooms = 5; // rooms per floor

function hood() {
  let apt = floors * rooms;
  let div = dce('table');
  for (var i = 0; i < floors; ++i) {
    let floor = dce('tr');
    for (var j = 0; j < rooms; ++j) {
      let room = dce('td');
      room.appendChild(dct('#' + apt));
      floor.appendChild(room);
      apt--;
    }
    div.appendChild(floor);
  }
  return div;
}
