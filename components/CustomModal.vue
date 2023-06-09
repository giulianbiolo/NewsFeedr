<template>
  <input type="checkbox" :id="modalId" class="modal-toggle" />
  <label class="modal modal-crud cursor-pointer !grid"
    @click="toggleModal()"
  >
    <label class="modal-box modal-box-crud w-11/12 max-w-5xl mr-5 lg:justify-self-center md:justify-self-end justify-self-stretch" @click="toggleModal()">
      <div class="flex flex-col w-[40rem]">
        <a :href="link" target="_blank">
          <div class="flex flex-row justify-between">
            <h2 class="text-2xl font-bold">{{ title }}</h2>
          </div>
          <br />
          <div class="flex flex-row justify-between">
            <p class="text-base-content opacity-90">{{ description }}</p>
          </div>
          <slot />
        </a>
      </div>
    </label>
  </label>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
const props = withDefaults(defineProps<{
  title: string;
  description: string;
  link: string
  modalId: string;
}>(), {
  title: 'Default title',
  description: 'Default description',
  link: '#',
  modalId: 'default-modal-id',
});

function toggleModal(): void {
  const modal = document.getElementById(props.modalId);
  if (modal !== null) {
    modal.click();
  }
}

</script>
