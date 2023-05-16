<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <form @submit.prevent="login" class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <button type="submit" class="btn">Accedi</button><br>
            <NuxtLink to="/registrazione" class="btn btn-secondary ml-3">non sei registrato? registrati</NuxtLink>
          </form>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Aggiungi qui la logica per il login
    },
  },
});
</script>