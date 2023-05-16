<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6">
          <form @submit.prevent="register" class="register-form">
            <div class="form-row">
            <div class="form-group">
              <label for="nome">Nome</label>
              <input type="nome" id="nome" v-model="nome" class="form-control" required>
            </div>
              <div class="form-group">
                <label for="cognome">Cognome</label>
                <input type="cognome" id="cognome" v-model="cognome" class="form-control" required>
              </div>
            </div>
            <div class="form-group">
              <label for="data_nascita">Data di nascita</label>
              <input type="date" id="data_nascita" v-model="data_nascita" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrati</button>
          </form>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">

export default defineComponent({
  data() {
    return {
      nome: '',
      cognome: '',
      data_nascita: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      // Aggiungi qui la logica per la registrazione
    },
  },
});
</script>