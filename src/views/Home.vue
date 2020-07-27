<template>
  <div class="main">
    <div class="welcome container">
      <div class="card">
        <div class="card-content center-align">
          <h2 class="teal-text">Simply Chat</h2>
          <form @submit.prevent="enterChat">
            <div class="row">
              <div class="input-field col s12">
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="name"
                  class="validate"
                  autocomplete="off"
                />
                <label class="active" for="name">Enter your name</label>
                <span class="helper-text red-text" data-error="wrong" v-if="feedback">{{feedback}}</span>
              </div>
            </div>
            <button class="btn teal">Enter Chat</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: null,
      feedback: null, // For Name sValidation
    };
  },
  props: {
    msg: String,
  },
  methods: {
    enterChat() {
      /* Check Name is valid or not */
      if (this.name && this.name.slice(0, 3).match("^[a-zA-Z]{3}$")) {
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.feedback = "You must enter a valid name to join.";
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&display=swap");

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 99vh;
  overflow: hidden;
  background: linear-gradient(#009688 50%, #d8dbd7 50%);
}

.welcome {
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  & .card {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  & h2 {
    font-size: 3em;
    font-family: "Acme", sans-serif;
  }

  & p {
    margin-bottom: 1rem;
  }

  & button {
    margin: 2rem auto;
  }
}
</style>