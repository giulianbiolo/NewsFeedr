<template>
  <div class="hero h-full">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Register now!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
          In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nome</span>
            </label>
            <input type="text" placeholder="Nome" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Cognome</span>
            </label>
            <input type="text" placeholder="Cognome" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="Email" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="text" placeholder="Password" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input type="text" placeholder="Confirm Password" class="input input-bordered" />
            <label class="label">
              <a href="/login" class="label-text-alt link link-hover">Already have an account?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Register</button>
          </div>
        </div>
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
