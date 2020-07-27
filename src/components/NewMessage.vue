<template>
  <div class="new-message" ref="windowWidth">
    <form @submit.prevent>
      <div class="row">
        <VEmojiPicker
          @select="selectEmoji"
          :emojisByRow="this.$refs.windowWidth.clientWidth<=600?5:15"
          style="width:100%"
          v-if="emojiShow"
        />
        <audio src="../assets/audio/sent.mp3" hidden></audio>
        <div class="input-field col s12 input-message">
          <i
            class="material-icons prefix emojiToggler"
            :class="{'clicked':emojiShow}"
            @click="toggleEmoji"
          >{{ emojiShow ? 'close' : 'insert_emoticon' }}</i>
          <input
            type="text"
            name="new-message"
            id="new-message"
            v-model="newMessage"
            placeholder="New Message (press enter to send)"
            class="validate"
            autocomplete="off"
            @keyup.enter="addMessage"
            ref="newMessage"
          />
          <span class="helper-text red-text" data-error="wrong" v-if="feedback">{{feedback}}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import VEmojiPicker from "v-emoji-picker";

export default {
  name: "NewMessage",
  data() {
    return {
      newMessage: "",
      feedback: null, // For Message Validation
      emojiShow: false, // To Show/Hide Emoji Picker
      audioSent: null, // To Play Sent Notificaton Sound
    };
  },
  components: {
    VEmojiPicker,
  },
  props: ["name"],
  methods: {
    /* Adding New Message to Database */
    addMessage() {
      if (this.newMessage) {
        db.collection("messages").add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now(),
        });

        this.audioSent.play();

        this.newMessage = "";
        this.feedback = null;
        this.emojiShow = false;
        this.$emit("changeHeight", "70vh");
      } else {
        this.feedback = "You must enter a message";
      }
    },

    /* Emoji Selection */
    selectEmoji(emoji) {
      if (emoji.data) {
        this.newMessage += emoji.data;
        this.$refs.newMessage.focus();
      }
    },

    /* Toggle Emoji Input Box */
    toggleEmoji() {
      this.emojiShow = !this.emojiShow;

      if (this.emojiShow) {
        this.$emit("changeHeight", "10vh");
      } else {
        this.$emit("changeHeight", "70vh");
      }
    },
  },
  beforeMount() {
    this.audioSent = new Audio("/media/sent.2cfc3808.mp3");
  },
};
</script>

<style lang="scss">
.emojiToggler {
  cursor: pointer;
  &.clicked {
    color: #5cbcb3;
  }
}

div#EmojiPicker {
  transition: all 0.1s ease;
  // height: 20vh;
  overflow: hidden scroll;
}

.row {
  margin-bottom: 0;
}
</style>