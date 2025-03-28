<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4"><RouterLink to="/">Proyectos</RouterLink></h2>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul v-else class="menu">
      <!-- Cada li con template (que solo agrupa a details), es un menú desplegable de un proyecto con sus tareas-->
      <li v-for="project in projectsStore.projects" :key="project.id">
        <!--template aquí sirve como agrupador sin representacion HTML. Solo sirve para agrupar elementos (el div agrupa elementos y tiene representacion HTML).-->
        <template v-if="project.tasks.length > 0">
          <details>
            <summary>
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>
        <!--Enlace al proyecto solamente, en caso de que no tenga tareas-->
        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';

const projectsStore = useProjectsStore();
</script>
