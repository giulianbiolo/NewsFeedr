<template>
  <BaseLayout>
    <template #maincontent>
      <div class="px-4 pt-4">
        <div class="card bg-base-100 block shadow-lg h-[87vh]">
          <div class="card-body relative h-full overflow-hidden p-0">
            <div class="hero h-full">
              <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                  <h1 class="text-5xl font-bold">Register now!</h1>
                  <p class="py-6">Join our community of readers by creating your own personalized account.
                    You'll be able to save your favorite posts, subscribe to magazines, and more.</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div class="card-body">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Nome</span>
                      </label>
                      <input type="text" placeholder="Nome" class="input input-bordered" v-model="name" />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Cognome</span>
                      </label>
                      <input type="text" placeholder="Cognome" class="input input-bordered" v-model="surname" />
                    </div>
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
                      <input type="password" placeholder="Password" class="input input-bordered" v-model="password_1" />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Confirm Password</span>
                      </label>
                      <input type="password" placeholder="Confirm Password" class="input input-bordered"
                        v-model="password_2" />
                      <label class="label">
                        <label class="label">
                          <router-link to="/login" class="label-text-alt link link-hover">Already have an account? Login
                            now</router-link>
                        </label>
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
                      <button class="btn btn-primary" :disabled="!isFormValid()" @click="register()">Register</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #sidebar>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import HttpResponse from '~/models/http_response';
import BaseLayout from '~/layouts/BaseLayout.vue';

definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
});

const name = useState<string>("name");
const surname = useState<string>("surname");
const email = useState<string>("email");
const password_1 = useState<string>("password_1");
const password_2 = useState<string>("password_2");
const error = ref('');
const isAlertVisible = ref(false);

const dismissAlert = (): void => {
  isAlertVisible.value = false;
}

const isFormValid = (): boolean => {
  const out = typeof name.value == "string" && name.value.length > 0 &&
    typeof surname.value == "string" && surname.value.length > 0 &&
    typeof email.value == "string" && email.value.length > 0 &&
    typeof password_1.value == "string" && password_1.value.length > 0 &&
    typeof password_2.value == "string" && password_2.value.length > 0 &&
    password_1.value === password_2.value;
  return out || false;
}

const register = async () => {
  const credentials = {
    name: name.value,
    surname: surname.value,
    email: email.value,
    password: password_1.value,
    isAdministrator: false,
  };

  const result = (await useFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })).data.value as HttpResponse;

  if (result.statusCode !== 200) {
    error.value = `${result.statusMessage}`;
    isAlertVisible.value = true;
    return;
  }

  return navigateTo('/login');
}
</script>
