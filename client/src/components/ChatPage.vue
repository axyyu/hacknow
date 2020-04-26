<template>
  <div id="chat" class="page">
    <div class="chat-video-container">
      <div class="video-container">
        <div class="person-info"></div>
        <video id="video" class="person-video" autoplay="autoplay"></video>
      </div>
      <div class="chat-container">
        <video id="camera" class="camera-view" autoplay="autoplay"></video>
        <div class="chat-box">
          <form v-on:submit.prevent="sendChat">
            <input v-model="message" />
          </form>
          <div class="message" v-for="item in chat" :key="item.message">
            <span :class="item.me ? 'me' : 'notme'">{{item.message}}</span>
          </div>
        </div>
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
      <button v-on:click="endCall">
        <i class="fas fa-phone-slash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatPage",
  data() {
    return {
      muteMic: false,
      showVideo: true,
      chat: [],
      chatInit: false,
      message: ""
    };
  },
  methods: {
    sendChat() {
      console.log(this.message);
      const data = {
        me: true,
        message: this.message
      };
      this.$parent.conn.send(data);
      this.chat = [...this.chat, data];
      this.message = "";
    },
    endCall() {
      this.$parent.call.close();
      this.$parent.conn.close();
      this.$emit("change-page", "reflections");
    },
    stopStreamedVideo(videoElem) {
      const stream = videoElem.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });

      videoElem.srcObject = null;
    },
    // requestLocalVideo(callback) {
    //   navigator.getUserMedia =
    //     navigator.getUserMedia ||
    //     navigator.webkitGetUserMedia ||
    //     navigator.mozGetUserMedia;

    //   // Request audio and video
    //   navigator.getUserMedia(
    //     { audio: true, video: true },
    //     function(stream) {
    //       window.localStream = stream;
    //       console.log("WINDOW LOCAL", window.localStream);
    //       callback(stream);
    //     },
    //     function(err) {
    //       alert("Cannot get access to your camera and video !");
    //       console.error(err);
    //     }
    //   );
    // },
    init() {
      console.log("IM GUEST", this.$parent.conn == null);
      var self = this;

      if (this.$parent.conn != null) {
        self.$parent.peer.on("call", function(call) {
          self.$parent.setCall(call);
          self.answerCall();
        });
      } // host

      // self.requestLocalVideo(self.launchCall);
      self.launchCall();
    },
    launchCall() {
      var self = this;
      console.log("test", window.localStream);
      document.getElementById("camera").srcObject = window.localStream;
      if (self.$parent.conn == null) {
        // this is not host, join call
        self.$parent.joinCall(self.$parent.friendId, self.handleJoinCall);
      }
    },
    handleJoinCall(stream) {
      console.log("SETTING UP STREAM");
      window.peer_stream = stream;
      document.getElementById("video").srcObject = stream;

      if (!this.chatInit) {
        this.$parent.conn.on("data", this.handleChat);
        this.chatInit = true;
      }
    },
    answerCall() {
      console.log("CALL ANSWERED", window.localStream);
      var self = this;

      self.$parent.call.answer(window.localStream);
      self.$parent.call.on("stream", this.handleJoinCall);
      self.$parent.call.on("close", function() {
        self.endCall();
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
    handleChat(data) {
      console.log(data);
      data.me = false;
      this.chat = [...this.chat, data];
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me {
  color: darkgreen;
}
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
  object-fit: cover;
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
  object-fit: cover;
}
.chat-box {
  background: rgb(187, 186, 186);
  width: 100%;
  height: 50vh;
  margin-top: 3vh;
}
</style>
