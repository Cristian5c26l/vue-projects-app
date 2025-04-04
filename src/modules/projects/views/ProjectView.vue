<template>
  <!--w-full ocupa todo el ancho de la pantalla-->
  <div class="w-full">
    <section class="m-2">
      <bread-crumbs :name="project?.name ?? 'No name'" />
    </section>

    <section class="m-2">
      <div v-if="tasks.length > 0" class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id" class="hover:bg-base-300">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectsStore.toggleTask(project?.id ?? '', task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt ?? '-' }}</td>
            </tr>

            <tr>
              <th></th>
              <td colspan="2">
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="newTask"
                  @keyup.enter="addTask"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">No hay tareas en este proyecto</h2>
        <p class="text-gray-500">Agrega una tarea para comenzar a trabajar en este proyecto.</p>
        <input
          type="text"
          class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
          placeholder="Nueva tarea"
          v-model="newTask"
          @keyup.enter="addTask"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/projects.store';
import { type Task, type Project } from '../interfaces/project.interface';

// import { useRoute } from 'vue-router';

// const route = useRoute();

// console.log(route.params.id); // Se usa "id" porque así está definido, como "project/:id", en el archivo de rutas src/router/index.ts

interface Props {
  id: string;
}

const router = useRouter();

const props = defineProps<Props>();

const projectsStore = useProjectsStore();

const project = ref<Project | null>();

const tasks = ref<Task[]>([]);

const newTask = ref('');

// let project = projectsStore.projectList.find((project) => project.id === props.id); // project puede ser undefined en algun momento del tiempo (como por ejemplo, que la persona cambie de ruta /project/1 a /project/2). Por eso es undefined.

const addTask = () => {
  if (!project.value) return;

  projectsStore.addTaskToProject(project.value.id, newTask.value);
  newTask.value = '';
};

watch(
  () => props.id,
  () => {
    // Estar pendiente de cuando cambie la propiedad id del objeto "props". Cuando cambie, ejecutar la funcion del segundo argumento del watch
    project.value = projectsStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      router.replace('/');
    }

    tasks.value = project.value?.tasks ?? [];
    newTask.value = '';
  },
  { immediate: true }, // Ejecutar funcion del segundo argumento del watch tan pronto se monte el componente ProjectView.vue
);
</script>
