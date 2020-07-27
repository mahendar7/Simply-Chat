<template>
  <div class="main">
    <div class="top-background"></div>
    <div class="chat container">
      <div class="card">
        <div class="card-content">
          <ul class="messages" v-chat-scroll ref="messages">
            <li
              class="message"
              v-for="message in messages"
              :key="message.id"
              :class="{'right-message':message.name==name , 'left-message':message.name !=name}"
            >
              <span class="teal-text" v-if="message.name !== name">{{message.name}}</span>
              <span class="black-text" v-html="message.content" v-linkified></span>
              <span class="grey-text time">{{message.timestamp}}</span>
            </li>
          </ul>

          <audio src="../assets/audio/received.mp3" hidden></audio>
        </div>
        <div class="card-action">
          <NewMessage :name="name" @changeHeight="changeHeight($event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "./NewMessage.vue";
import db from "../firebase/init"; // Accessing Firebase Database
import moment from "moment"; // Package, Coverts Seconds into Date-Time Format

import Vue from "vue";
import linkify from "vue-linkify"; // Package, Detects URLs in a String
Vue.directive("linkified", linkify);

import axios from "axios"; // Package, To Play with HTTP Requests

export default {
  name: "Chat",
  components: {
    NewMessage,
  },
  data() {
    return {
      messages: [],
      audioReceived: null, // Sound
    };
  },
  props: ["name"],
  methods: {
    /* Adjusting Meesages Height and Emoji Picker Height */
    changeHeight(height) {
      this.$refs.messages.style.height = height;
    },
    /* Adjusting Meesages Height and Emoji Picker Height */
  },
  created() {
    let messageRef = db.collection("messages").orderBy("timestamp");

    /* On Every Change get Messages Data */
    messageRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;

          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format("lll"),
            time: doc.data().timestamp,
          });
          /* Play Sound,once Message Received */
          if (doc.data().name != this.name) {
            this.audioReceived.play();
            console.log(name);
          }
          /* Play Sound,once Message Received */
        }
      });
    });
    /* On Every Change get Messages Data */
  },

  beforeMount() {
    // Intialize Audio
    this.audioReceived = new Audio("/media/received.85cadaaa.mp3");

    /* To get URL Preview (Pending Task)*/
    let url = "http://api.linkpreview.net/?key=12345&q=https://www.google.com";
    axios
      .get(url)
      .then((res) => console.table(res.data))
      .catch((err) => console.log(err));
  },
  /* To get URL Preview (Pending Task)*/
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 99vh;
  position: relative;
}
.top-background {
  position: absolute;
  top: 0;
  background: #009688;
  height: 15%;
  width: 100%;
}
.chat {
  width: 100%;
  height: 90%;

  & .messages {
    display: flex;
    flex-direction: column;
    height: 70vh;
    overflow: hidden scroll;
    padding-right: 1rem;
    background: url("../assets/images/background.jpg") no-repeat;
    background-size: cover;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #ddd;
    }
    &::-webkit-scrollbar-thumb {
      background: #aaa;
    }

    & .message {
      display: flex;
      flex-direction: column;
      background: white;
      text-align: left;
      margin-bottom: 1rem;
      margin-left: 1rem;
      max-width: 50%;
      padding: 1rem;
      border-radius: 4px;
      &:first-child {
        margin-top: 1rem;
      }

      & span {
        font-size: 1rem;
        width: 100%;
        overflow-wrap: break-word;

        &.time {
          font-size: 0.8rem;
          text-align: left;
        }
      }

      &.left-message {
        align-self: flex-start;
      }
      &.right-message {
        align-self: flex-end;
      }
    }
  }

  & .card-content {
    padding: 0;
  }
  .content {
    color: black;
  }
}

@media screen and (max-width: 600px) {
  .main {
    height: 100%;
  }
  .chat {
    height: 100%;
  }

  .messages {
    height: 100vh !important;
    position: relative;
    & .message {
      max-width: 80% !important;
    }
    & .message:last-child {
      margin-bottom: 10rem !important;
    }
  }

  .card-action {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
  }

  * {
    padding: 0;
    margin: 0;
  }
}
</style>