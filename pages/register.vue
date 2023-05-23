<template>
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
            <input type="password" placeholder="Confirm Password" class="input input-bordered" v-model="password_2" />
            <label class="label">
              <label class="label">
                <router-link to="/login" class="label-text-alt link link-hover">Already have an account?</router-link>
              </label>
            </label>
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary"
              @click="register(name, surname, email, password_1, password_2)">Register</button>
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

const name = useState<string>("name");
const surname = useState<string>("surname");
const email = useState<string>("email");
const password_1 = useState<string>("password_1");
const password_2 = useState<string>("password_2");


const register = async (
  name: string,
  surname: string,
  email: string,
  password_1: string,
  password_2: string
) => {
  const { signIn } = useAuth();

  if (password_1 === password_2) {
    const credentials = {
      name: name,
      surname: surname,
      email: email,
      password: password_1,
    };

    try {
      await useFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      await signIn('credentials', { email: email, password: password_1, callbackUrl: '/' });

      return navigateTo('/');
    } catch (error) {
      alert(error);
    }

  } else {
    alert("Passwords do not match");
  }
}
</script>
