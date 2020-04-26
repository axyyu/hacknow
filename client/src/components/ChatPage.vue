<template>
  <div id="chat" class="page">
    <div class="chat-video-container">
      <div class="video-container">
        <div class="person-info"></div>
        <div id="video" class="person-video" :srcObject="friendStream" ></div>
      </div>
      <div class="chat-container">
        <div id="camera" class="camera-view" :srcObject="myStream"></div>
        <div class="chat-box"></div>
      </div>
    </div>
    <div class="button-container">
      <button v-on:click="toggleMute">
        <i v-if="!muteMic" class="fas fa-microphone"></i>
        <i v-if="muteMic" class="fas fa-microphone-slash"></i>
      </button>
      <button v-on:click="toggleVideo">
        <i v-if="showVideo" class="fas fa-video"></i>
        <i v-if="!showVideo" class="fas fa-video-slash"></i>
      </button>
      <button v-on:click="$emit('change-page', 'reflections')">
        <i class="fas fa-phone-slash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  data() {
    return {
      muteMic: false,
      showVideo: true,
      myStream: null,
      friendStream: null
    };
  },
  methods: {
    requestLocalVideo(callback) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      // Request audio and video
      navigator.getUserMedia(
        { audio: true, video: true },
        function(stream) {
          window.localStream = stream;
          callback(stream);
        },
        function(err) {
          alert("Cannot get access to your camera and video !");
          console.error(err);
        }
      );
    },
    init() {
      this.$parent.peer.on("call", function(call) {
          this.$parent.setCall(call);
          this.answerCall();
        });
      this.requestLocalVideo(this.launchCall);
    },
    launchCall(stream) {
      this.myStream = stream;
      console.log('test', stream);
      document.getElementById('camera').srcObject = stream;
      if(this.$parent.conn == null) { // this is not host, join call
        this.$parent.joinCall(this.$parent.friendId);
      }
    },
    answerCall() {
      this.$parent.call.answer(window.localStream);
      this.$parent.call.on("stream", function(stream) {
        window.peer_stream = stream;
        document.getElementById('video').srcObject = stream;
        this.friendStream = stream;
        // document.getElementById(element_id).srcObject = stream;
      });
      this.$parent.call.on("close", function() {
        this.$parent.conn.close();
        this.$parent.peer.close();
        this.$parent.changePage('reflections');
        // the call has ended;
        // use call.close() to finish a call
      });
    },
    toggleMute() {
      this.muteMic = !this.muteMic;
    },
    toggleVideo() {
      this.showVideo = !this.showVideo;
    },
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chat {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 48px;
  box-sizing: border-box;
  background: palegoldenrod;
}
.chat-video-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 700px;
  background: palegoldenrod;
}
.button-container {
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  /* background: aquamarine; */
}
.button-container button {
  outline: none;
  border: none;
  font-size: 1.3em;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
}
.button-container button:hover {
  background: rgba(0, 0, 0, 0.2);
}
.button-container button:nth-child(1) {
  border-radius: 8px 0 0 8px;
}
.button-container button:nth-last-child(1) {
  border-radius: 0 8px 8px 0;
}
.video-container {
  display: flex;
  flex-direction: column;
}
.person-video {
  background: pink;
  width: 65vw;
  height: 70vh;
}
.person-info {
  background: grey;
  width: 65vw;
  height: 8vh;
}
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: right;
  margin-left: 2vw;
}
.camera-view {
  background: pink;
  width: 100%;
  height: 25vh;
}
.chat-box {
  background: rgb(187, 186, 186);
  width: 100%;
  height: 50vh;
  margin-top: 3vh;
}
</style>
