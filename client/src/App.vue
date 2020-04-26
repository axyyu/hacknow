<template>
  <div id="app">
    <HomePage v-if="isHomePage" v-on:change-page="switchPage" />
    <QuestionsPage
      v-if="isQuestionsPage"
      v-on:change-page="switchPage"
      :selectedFeeling="this.feeling"
    />
    <LoadingPage v-if="isLoadingPage" v-on:change-page="switchPage" />
    <ChatPage v-if="isChatPage" v-on:change-page="switchPage" :match="match" />
    <ReflectionsPage v-if="isReflectionsPage" v-on:change-page="switchPage" />
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import QuestionsPage from "./components/QuestionsPage.vue";
import LoadingPage from "./components/LoadingPage.vue";
import ChatPage from "./components/ChatPage.vue";
import ReflectionsPage from "./components/ReflectionsPage.vue";
import Peer from "peerjs";

export default {
  name: "App",
  components: {
    HomePage,
    QuestionsPage,
    LoadingPage,
    ChatPage,
    ReflectionsPage
  },
  data() {
    return {
      peer: null,
      peerId: null,
      conn: null,
      friendId: null,
      call: null,
      currentPage: "home",
      feeling: null,
      problem: null,
      name: "",
      feel: null,
      match: {},
      render: false
    };
  },
  computed: {
    isHomePage() {
      return this.currentPage == "home";
    },
    isQuestionsPage() {
      return this.currentPage == "questions";
    },
    isLoadingPage() {
      return this.currentPage == "loading";
    },
    isChatPage() {
      return this.currentPage == "chat";
    },
    isReflectionsPage() {
      return this.currentPage == "reflections";
    }
  },
  methods: {
    setMatch(match) {
      this.match = match;
      this.friendId = match.peerId;
    },
    setCall(call) {
      this.call = call;
    },
    setPeerId(id) {
      this.peerId = id;
    },
    switchPage(page) {
      console.log(page);
      this.currentPage = page;
    },
    selectFeeling(id) {
      this.feeling = id;
      console.log("feeling: ", id);
    },
    selectProblem(id) {
      this.problem = id;
      console.log("problem: ", id);
    },
    storeName(id) {
      this.name = id;
      console.log("name: ", id);
    },
    howIFeel(id) {
      this.feel = id;
      console.log("feeling: ", id);
    },
    initializePeer(callback) {
      var self = this;
      if (!self.peer) {
        self.peer = new Peer("", {
          host: location.hostname,
          port: 8000 || (location.protocol === "https:" ? 443 : 80),
          path: "/peerjs"
        });
        self.peer.on("open", function(id) {
          console.log("MY ID", id);
          self.peerId = id;
          callback(id);
        });
        self.peer.on("error", function(err) {
          alert("" + err);
        });
      }
    },
    initializeConn() {
      var self = this;
      self.conn.on("close", function() {});
    },
    startCall() {
      var self = this;
      self.peer.on("connection", function(c) {
        if (self.conn) {
          console.log("closing connection");
          c.close();
          return;
        }
        console.log("making connection");
        self.conn = c;
        self.friendId = c.peer;
        self.initializeConn();

        self.switchPage("chat");
      });
    },
    joinCall(destId, callback) {
      var self = this;
      self.conn = self.peer.connect(destId, {
        reliable: true
      });
      self.friendId = destId;
      self.conn.on("open", function() {
        console.log("CONNECTION MADE FROM GUEST", callback);
        self.initializeConn();
        self.call = self.peer.call(self.friendId, window.localStream);
        self.call.on("stream", callback);
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.page {
  height: 100vh;
  width: 100vw;
}
</style>
