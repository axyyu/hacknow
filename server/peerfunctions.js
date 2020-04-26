let peer = null;
let peerId = null;
let friendId = null;
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

function onReceiveStream(stream, element_id) {
  // Retrieve the video element according to the desired
  // Set the given stream as the video source
  document.getElementById(element_id).srcObject = stream;

  // Store a global reference of the stream
  window.peer_stream = stream;
}

function requestLocalVideo(callbacks) {
  // Monkeypatch for crossbrowser geusermedia
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  // Request audio an video
  navigator.getUserMedia(
    { audio: true, video: true },
    callbacks.success,
    callbacks.error
  );
}

function callFriend() {
  call = peer.call(friendId, window.localStream);

  call.on('stream', function (stream) {
    window.peer_stream = stream;

    onReceiveStream(stream, 'peer-camera');
  });
}

requestLocalVideo({
  success: function (stream) {
    window.localStream = stream;
    onReceiveStream(stream, 'my-camera');
  },
  error: function (err) {
    alert('Cannot get access to your camera and video !');
    console.error(err);
  },
});

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
  peer.on('call', function (call) {
    var acceptsCall = confirm('Videocall incoming, do you want to accept it ?');

    if (acceptsCall) {
      // Answer the call with your own video/audio stream
      call.answer(window.localStream);

      // Receive data
      call.on('stream', function (stream) {
        // Store a global reference of the other user stream
        window.peer_stream = stream;
        // Display the stream of the other user in the peer-camera video element !
        onReceiveStream(stream, 'peer-camera');
      });

      // Handle when the call finishes
      call.on('close', function () {
        alert('The videocall has finished');
      });

      // use call.close() to finish a call
    } else {
      console.log('Call denied !');
    }
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
    friendId = c.peer;
    // call = peer.call(peerId, navigator.getUserMedia());
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
    friendId = destId;
    conn.on('open', function () {
      begin();
    });
  });
  // peer.on('call', function (call) {
  //   call.answer(navigator.getUserMedia());
  // });
}
