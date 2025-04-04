import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('useProjectsStore', () => {
  // Antes de cada prueba, crear una nueva instancia de Pinia (que va a contener cada store) y activarla
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      // getters,
      projectList,
      noProjects,
      projectsWithCompletion,
      // properties,
      projects,
      // functions (actions)
      addProject,
      addTaskToProject,
      toggleTask,
    } = useProjectsStore();

    expect(projectList).toEqual([]);
    expect(noProjects).toBe(true);
    expect(projectsWithCompletion).toEqual([]);
    expect(projects).toEqual([]);
    expect(addProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(toggleTask).toBeInstanceOf(Function);
  });

  test('should add a project', () => {
    const projectsStore = useProjectsStore();
    projectsStore.addProject('');
    expect(projectsStore.projects).toEqual([]);

    const newProjectName = 'New project';

    projectsStore.addProject(newProjectName);
    expect(projectsStore.projects.length).toBe(1);
    expect(projectsStore.projects[0]).toEqual({
      id: expect.any(String),
      name: newProjectName,
      tasks: [],
    });
    expect(projectsStore.projects).toEqual([
      {
        id: expect.any(String),
        name: newProjectName,
        tasks: [],
      },
    ]);
  });

  test('should load from localStorage', () => {
    // const localStorageProjects = fakeProjects;

    localStorage.setItem('projects', JSON.stringify(fakeProjects)); // grabar en localStorage el item "projects", que tenga como valor un string que es un array, el cual es localStorageProjects
    const { projects } = useProjectsStore(); // Load projects from "projects" item in localStorage
    const [project1, project2, project3] = projects;
    expect(project1).toEqual({
      id: fakeProjects.at(0)!.id,
      name: fakeProjects.at(0)!.name,
      tasks: expect.any(Array),
    });

    expect(project2).toEqual({
      id: fakeProjects.at(1)!.id,
      name: fakeProjects.at(1)!.name,
      tasks: expect.any(Array),
    });

    expect(project3).toEqual({
      id: fakeProjects.at(2)!.id,
      name: fakeProjects.at(2)!.name,
      tasks: expect.any(Array),
    });

    expect(projects.length).toBe(fakeProjects.length);
  });

  test('should add a task to a project', () => {
    const projectsStore = useProjectsStore();

    projectsStore.addProject('New project');
    const project = projectsStore.projects.at(0)!;
    const taskName = 'New task';

    projectsStore.addTaskToProject(project.id, taskName);
    expect(project.tasks.length).toBe(1);
    expect(project.tasks.at(0)).toEqual({
      id: expect.any(String),
      name: taskName,
      // completedAt: undefined,
    });
  });

  test('should toggle a task', () => {
    const projectsStore = useProjectsStore();

    projectsStore.addProject('New project');
    const project = projectsStore.projects.at(0)!;
    const taskName = 'New task';

    projectsStore.addTaskToProject(project.id, taskName);
    const task = project.tasks.at(0)!;

    projectsStore.toggleTask(project.id, task.id);
    expect(task).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });

    expect(task.completedAt).toBeInstanceOf(Date);
  });

  test('should return the projects with completion', () => {
    const projectsStore = useProjectsStore();
    projectsStore.$patch((state) => {
      state.projects = fakeProjects;
    }); // que la propiedad "projects" del store projectsStore, que es un objeto, tenga el valor de fakeProjects

    //   console.log(projectsStore.projectsWithCompletion);

    expect(projectsStore.projectsWithCompletion).toEqual([
      { id: '1', name: 'Project 1', taskCount: 4, completion: 25 },
      { id: '2', name: 'Project 2', taskCount: 0, completion: 0 },
      { id: '3', name: 'Project 3', taskCount: 2, completion: 50 },
      { id: '4', name: 'Project 4', taskCount: 3, completion: 33 },
    ]);
  });
});
