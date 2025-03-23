<template>
  <!-- Éste dialog (modal) siempre va a estar presente sin importar si se muestra (:open="true") o no (:open="false"). -->
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <slot name="header" />
      </div>

      <div class="my-5">
        <slot name="body" />
      </div>
      <div class="border-t border-t-blue-500 pt-2">
        <slot name="footer" />
      </div>
    </div>
  </dialog>

  <!-- Éste div se coloca atrás del modal y adelante de la página ProjectsLayout.vue. Sirve para oscurecer el fondo o lo que está detrás del modal (que es ProjectsLayout.vue)y al mismo tiempo inhabilitar los elementos de la página ProjectsLayout.vue (ProjectsLayout.vue contiene ProjectsView.vue que contiene el modal). Obviamente, se tiene que mostrar cuando el modal se muestre (propiedad open de modal sea true)-->
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-0 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
