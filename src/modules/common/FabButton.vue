<template>
  <!-- btn y btn-circle son clases de daily-ui. fixed bottom-10 right-10 son clases de tailwindcss -->
  <button @click="$emit('click')" :class="['btn btn-circle btn-secondary fixed', position]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

defineEmits(['click']); // Evento "click", utilizado para emitirse a componente FabButton cuando demos click en "button" para así imprimir en consola "button de FabButton clickeado". Para ello, se utiliza la directiva @click="$emit('click')" en button y en el componente FabButton se define el evento "click" con () => console.log('button de FabButton clickeado'), es decir, así: <fab-button @click="() => console.log('button de FabButton clickeado')">.
</script>

<style scoped>
@reference "tailwindcss";

.top-left {
  @apply top-10 left-10;
}
.top-right {
  @apply top-10 right-10;
}
.bottom-left {
  @apply bottom-10 left-10;
}
.bottom-right {
  @apply bottom-10 right-10;
}
</style>
