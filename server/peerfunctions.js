let peer = null;
let peerId = null;
let conn = null;
let call = null;

// function connect(peerid) {
//   // on open will be launch when you successfully connect to PeerServer
//   conn.on('open', function () {
//     // here you have conn.id
//     conn.send('hi!');
//   });
// }

function initialize() {
  peer = new Peer('', {
    host: location.hostname,
    port: location.port || (location.protocol === 'https:' ? 443 : 80),
    path: '/peerjs',
    debug: 3,
  });
  peer.on('open', function (id) {
    peerId = id;
  });
  peer.on('error', function (err) {
    alert('' + err);
  });

  // // Heroku HTTP routing timeout rule (https://devcenter.heroku.com/articles/websockets#timeouts) workaround
  // function ping() {
  //     console.log(peer)
  //     peer.socket.send({
  //         type: 'ping'
  //     })
  //     setTimeout(ping, 16000)
  // }
  // ping()
}

function addName() {
  var names = document.getElementById('names');
  var name = document.getElementById('inputfield').value;
  names.innerHTML += name;
  conn.send(name);
}

function begin() {
  conn.on('data', function (data) {
    var names = document.getElementById('names');
    names.innerHTML += data;
  });
  conn.on('close', function () {
    // something here when the connection gets cut off
  });
  peer.on('error', function (err) {
    // somethign here when there's an issue
  });
  call.on('stream', function (stream) {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
  });
}

function start() {
  initialize();
  peer.on('open', function () {
    alert('Ask your friend to join using your peer ID: ' + peerId);
  });
  peer.on('connection', function (c) {
    if (conn) {
      c.close();
      return;
    }
    conn = c;
    var call = peer.call(peerId, navigator.getUserMedia());
    begin();
  });
}

function join() {
  initialize();
  peer.on('open', function () {
    var destId = prompt("Opponent's peer ID:");
    conn = peer.connect(destId, {
      reliable: true,
    });
    conn.on('open', function () {
      begin();
    });
  });
  peer.on('call', function (call) {
    call.answer(navigator.getUserMedia());
  });
}
