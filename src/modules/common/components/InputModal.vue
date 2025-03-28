<template>
  <!-- Éste dialog (modal) siempre va a estar presente sin importar si se muestra (:open="true") o no (:open="false"). -->
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-if="subTitle" class="py-4">
        {{ subTitle }}
      </p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ungrese nombre de proyecto'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5">
            <!--Es de tipo sumbit este boton por defecto cuando no se le especifica el type. Si es de tipo submit, permitirá que el modal dialog (construido por daisyui) trabaje correctamente-->
            <button @click="$emit('close')" class="btn mr-4">Close</button>
            <button type="submit" class="btn btn-primary">Aceptar</button>
          </div>
        </form>
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
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  title: string;
  placeholder?: string;
  subTitle?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watch(props, (newProps) => {
  // Estaremos pendientes de las props. newProps son las propiedades actualizadas o actuales.
  if (newProps.open) {
    inputRef.value?.focus(); // si el inputRef es null (que ocurre en algun punto determinado del tiempo, es decir, cuando el componente InputModal aun no se monta), no se ejecuta focus(). Esto es gracias a "?".
  }
});

const submitValue = () => {
  // console.log({ value: inputValue.value });
  if (!inputValue.value) {
    // Si esta vacio el contenido del input del modal
    // Colocar foco en el input
    inputRef.value?.focus(); // si el inputRef es null, no se ejecuta focus(). Esto es gracias a "?".
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};
</script>
