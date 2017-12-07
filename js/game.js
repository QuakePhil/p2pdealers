var gangs = [];
var gang = {
  id: 0,
  colors: '',
  name: '',
  cash: 0,
  product: 0
}

var raiding = 0;

// distribute $product of product
function reup(product) {
  if (gang.cash < product) {
    return 'Not enough cash\n';
  }
  sendchat(gang.name + ' reupped $' + product);
  gang.cash -= product;
  gang.product += product;
  send('info|' + JSON.stringify(gang));
  ui();
  return '';
}

function sell() {
  if (gang.product == 0) {
    return 'No product to sell\n';
  }

  if (typeof gang.lastsale !== 'undefined') {
    var wait = Date.now() - gang.lastsale;
    if (wait < 60000) {
      var more = Math.floor((60000 - wait) / 1000);
      return 'Must wait at least a minute until selling again\n(' + more + ' more seconds)\n';
    }
  }

  var sales = 0;
  var expenses = 0;
  var starting = gang.cash;
  var out = '';

  for (var i = 0; i < floor.length; ++i) {
    if (typeof floor[i]['colors'] !== 'undefined') {
      if (floor[i]['colors'] == gang.colors) {
        if (gang.product >= 100) {
          sales += 120; // apply some set profit margin
          gang.product -= 100;
        } else if (gang.product > 0) {
          sales += gang.product;
          gang.product = 0;
        }
      }
      if (floor[i]['goons'] == gang.colors) {
        expenses += 10
      }
    }
  }
  gang.cash += sales;
  if (gang.cash >= expenses) {
    gang.cash -= expenses;
    out = 'Starting with $' + starting + '\nSales: $' + sales + '\nExpenses: $' + expenses + '\nNet of $' + gang.cash + '\n';
  } else {
    gang.cash = 0;
    out = 'Starting with $' + starting + '\nSales: $' + sales + '\nExpenses: $' + expenses + '\nYou went broke\n';
    // all hired goons should then leave
  }
  gang.lastsale = Date.now();

  send('info|' + JSON.stringify(gang));
  ui();
  return out;
}
