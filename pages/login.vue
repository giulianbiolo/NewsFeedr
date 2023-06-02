<template>
  <BaseLayout>
    <template #maincontent>
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
                        <router-link to="/register" class="label-text-alt link link-hover">Don't have an account yet?
                          Register
                          now.</router-link>
                      </label>
                      <label class="label">
                        <router-link to="/password_reset" class="label-text-alt link link-hover">Reset your
                          password!</router-link>
                      </label>
                    </div>
                    <div class="form-control mt-6">
                      <button class="btn btn-primary" @click="mySignInHandler({ email, password })">Login</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '~/layouts/BaseLayout.vue';
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

const mySignInHandler = async ({ email, password }: { email: string, password: string }) => {
  const result = await signIn('credentials', { email: email, password: password, callbackUrl: '/' });
  if (result?.error) {
    alert('You have made a terrible mistake while entering your credentials');
  } else {
    return navigateTo('/');
  }
}
</script>
