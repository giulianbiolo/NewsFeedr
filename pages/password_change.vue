<template>
  <BaseLayout>
    <template #maincontent>
      <div class="px-4 pt-4">
        <div class="card bg-base-100 block shadow-lg h-[87vh]">
          <div class="card-body relative h-full overflow-hidden p-0">
            <div class="hero h-full">
              <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                  <h1 class="text-5xl font-bold">Change your password!</h1>
                  <p class="py-6">Want to change your password? Enter the new one!</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                  <div class="card-body">
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
                        <router-link to="/login" class="label-text-alt link link-hover">Return to login
                          page.</router-link>
                      </label>
                    </div>
                    <div class="form-control mt-6">
                      <button class="btn btn-primary" @click="passwordChangeHandler()">Change Password</button>
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
import HttpResponse from '~/models/http_response';
import BaseLayout from '~/layouts/BaseLayout.vue';
const { data } = useAuth();

definePageMeta({
  middleware: [
    function () {
      const { status } = useAuth();

      if (status.value !== "authenticated") {
        return navigateTo('/login')
      }
    }
  ],
});

const password_1 = useState<string>('password_1');
const password_2 = useState<string>('password_2');

const passwordChangeHandler = async () => {
  if (password_1.value !== password_2.value) {
    alert("Passwords do not match");
  }

  const credentials = {
    // TODO: prendere la mail da auth
    email: data.value?.user?.email || '',
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
