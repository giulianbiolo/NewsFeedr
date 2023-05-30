<template>
  <div class="px-4 pt-4">
    <div class="card bg-base-100 block shadow-lg h-full">
      <div class="card-body relative h-full overflow-hidden p-0">
        <div class="hero h-full">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
              <h1 class="text-5xl font-bold">Reset your password!</h1>
              <p class="py-6">If you've forgotten your password, don't worry! Just enter your email and new password.</p>
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
                  <input type="password" placeholder="Password" class="input input-bordered" v-model="password_1" />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Repeat password</span>
                  </label>
                  <input type="password" placeholder="Password" class="input input-bordered" v-model="password_2" />
                  <label class="label">
                    <router-link to="/login" class="label-text-alt link link-hover">Return to login page.</router-link>
                  </label>
                </div>

                <div class="form-control mt-6">
                  <button class="btn btn-primary" @click="passwordResetHandler()">Reset Password</button>
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
import HttpResponse from '~/models/http_response';

definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
});

// const { signIn } = useAuth();
const email = useState<string>('email');
const password_1 = useState<string>('password_1');
const password_2 = useState<string>('password_2');

const passwordResetHandler = async () => {
  if (password_1.value !== password_2.value) {
    alert("Passwords do not match");
  }

  const credentials = {
    email: email.value,
    password: password_1.value,
  };

  try {
    const result = await useFetch('/api/auth/password-reset', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as HttpResponse;

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert("Password reset successful");
      return navigateTo('/login');
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}
</script>
