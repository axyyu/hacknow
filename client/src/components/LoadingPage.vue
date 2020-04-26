<template>
  <div id="loading" class="page">
    <div>
      <img class="bear" src="../assets/bear.png" />
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingPage",
  methods: {
    async makeMatch(userId) {
      const payload = {
        name: this.$parent.name,
        problem: this.$parent.problem,
        mood: this.$parent.feeling,
        description: this.$parent.feel,
        peerId: userId
      };

      const response = await fetch('match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      try{
        // found match - join call
        const match = await response.json();
        if(match == null) throw Error;

        console.log('found match!');

        this.$parent.setMatch(match);
        this.$parent.switchPage('chat');
      }
      catch(err) {
        // no match - start server
        console.log(err);
        console.log('did not find match!');
        this.$parent.startCall();

        console.log(payload);
        await fetch('user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }
    },
    init() {
      this.$parent.initializePeer(this.makeMatch);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bear {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  max-width: 300px;
  max-height: 300px;
  margin-left: -35px;

  animation-name: bob;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(50px);
  }
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 2.5s infinite ease-in-out;
  animation: load7 2.5s infinite ease-in-out;
}
.loader {
  color: pink;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
