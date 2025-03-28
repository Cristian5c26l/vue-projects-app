import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';
import type { Project } from '../interfaces/project.interface';

// const initialLoad = (): Project[] => {
//   return [
//     {
//       id: uuidv4(),
//       name: 'Project 1',
//       tasks: [],
//     },
//     {
//       id: uuidv4(),
//       name: 'Project 2',
//       tasks: [],
//     },
//     // {
//     //   id: '3',
//     //   name: 'Project 3',
//     //   tasks: [],
//     // },
//   ];
// };

export const useProjectsStore = defineStore('projects', () => {
  // const projects = ref(useLocalStorage<Project[]>('projects', initialLoad())); // Se espera que el item "projects" de local storage sea un array de proyectos. En caso de que no exista, se inicializa con el array de proyectos retornado por la función initialLoad. Cabe decir que, con solo actualizar la variable reactiva "projects", este projects.value se encargará de ser el nuevo valor del item "projects" en local storage.
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;
    projects.value.push({
      id: uuidv4(),
      name,
      tasks: [],
    });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;

    const project = projects.value.find((p) => p.id === projectId);

    if (!project) return;

    project.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    const task = project.tasks.find((t) => t.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    // Properties
    projects,

    // Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    // projectsWithCompletion: computed(() => {
    // {
    //   id,
    //   name,
    //   taskCount,
    //   completion,
    // }
    // }),
    // Numero de Tareas del proyecto -> 100 %
    // Tareas Completadas -> x
    // x = Tareas Completadas * 100 / Numero de Tareas del proyecto
    // projectsWithCompletion: computed(() =>
    //   [...projects.value].map((project) => ({
    //     id: project.id,
    //     name: project.name,
    //     taskCount: project.tasks.length,
    //     completion:
    //       project.tasks.length === 0
    //         ? 0
    //         : (project.tasks.filter((tasks) => !!tasks.completedAt).length * 100) /
    //           project.tasks.length,
    //   })),
    // ),
    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const taskCount = project.tasks.length;
        const completedTasks = project.tasks.filter((t) => t.completedAt).length;
        const completion = taskCount === 0 ? 0 : (completedTasks / taskCount) * 100;

        return {
          id: project.id,
          name: project.name,
          taskCount,
          completion,
        };
      });
    }),

    // Actions (Methods)
    addProject: addProject,
    addTaskToProject,
    toggleTask,
  };
});
