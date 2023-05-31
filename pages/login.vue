<template>
  <div class="px-4 pt-4">
    <div class="card bg-base-100 block shadow-lg h-[87vh]">
      <div class="card-body relative h-full overflow-hidden p-0">
        <div class="hero h-full">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
              <h1 class="text-5xl font-bold">Login now!</h1>
              <p class="py-6">Enter your email and password to access your personalized feed and saved posts.</p>
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
                  <input type="password" placeholder="Password" class="input input-bordered" v-model="password" />

                  <label class="label">
                    <router-link to="/register" class="label-text-alt link link-hover">Don't have an account yet? Register
                      now.</router-link>
                  </label>

                  <label class="label">
                    <router-link to="/password_reset" class="label-text-alt link link-hover">Reset your
                      password!</router-link>
                  </label>
                </div>

                <div class="form-control mt-6 cursor-pointer" v-if="isAlertVisible" @click="dismissAlert()">
                  <div class="alert alert-error shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ error }}</span>
                  </div>
                </div>


                <div class="form-control mt-6">
                  <button class="btn btn-primary" :disabled="!isFormValid()"
                    @click="mySignInHandler({ email, password })">Login</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
});

const { signIn } = useAuth();
const email = useState<string>('email');
const password = useState<string>('password');
const error = ref('');
const isAlertVisible = ref(false);

const dismissAlert = (): void => {
  isAlertVisible.value = false;
}

const isFormValid = (): boolean => {
  const out = typeof email.value == "string" && email.value.length > 0 &&
    typeof password.value == "string" && password.value.length > 0;
  return out;
}

const mySignInHandler = async ({ email, password }: { email: string, password: string }) => {
  const result = await signIn('credentials', { email: email, password: password, redirect: false, callbackUrl: '/'});

  if (result?.error == "CredentialsSignin") {
    error.value = `The credentials are incorrect. Try again!`;
    isAlertVisible.value = true;
  } else if (result?.error) {
    error.value = `${result.error}`;
    isAlertVisible.value = true;
  } else {
    return navigateTo('/');
  }

  return
}
</script>
