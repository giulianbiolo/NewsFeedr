<template>
  <button v-if="isLogged()" class="btn btn-primary" @click="logOut">LogOut</button>
  <button v-else class="btn btn-primary" @click="logIn">LogIn</button>
  <div v-for="feed in data.data">
    <a :href="feed.link">
      <div>
        <p class="text-3xl">{{ feed.title }}</p>
        <p class="text-xs">{{ feed.description }}</p>
      </div>
    </a>
    <br>
  </div>
</template>

<script setup lang="ts">
  const { data } = await useFetch("/api/feeds");
  const { status, signOut } = useAuth();

  const isLogged = (): boolean => {
    return status.value == "authenticated";
  }

  const logOut = async () => {
    await signOut();
  };

  const logIn = () => {
    return navigateTo("/login");
  };
</script>
