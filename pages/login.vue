<template>
  <div class="hero h-full">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
          In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="Email" class="input input-bordered" v-model="email" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="text" placeholder="Password" class="input input-bordered" v-model="password" />
            <label class="label">
              <a href="/register" class="label-text-alt link link-hover">Don't have an account yet?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="mySignInHandler({ email, password })">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
});
const { signIn } = useAuth();
const email = useState<string>('email');
const password = useState<string>('password');

const mySignInHandler = async ({ email, password }: { email: string, password: string }) => {
  const result = await signIn('credentials', { email: email, password: password, callbackUrl: '/' });
  if (result?.error) {
    // Handle error
    alert('You have made a terrible mistake while entering your credentials');
  } else {
    // Handle success
    return navigateTo('/');
  }
}
</script>
