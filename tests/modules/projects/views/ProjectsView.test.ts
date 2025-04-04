import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('<ProjectsView />', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const projectsStore = useProjectsStore(); // Gracias a createTestingPinia(), los metodos del store projectsStore, como addProject, son vi functions.

  beforeEach(() => {
    projectsStore.$patch({
      projects: fakeProjects,
    });
  });

  test('should be render with projects', () => {
    // console.log(wrapper.html());
    const tableRows = wrapper.findAll('tbody tr');

    expect(tableRows.length).toBe(fakeProjects.length);

    // tableRows.forEach((row, index) => {
    //   expect(row.text()).toContain(fakeProjects.at(index)!.name);
    // });

    tableRows.forEach((row, index) => {
      const project = fakeProjects[index];
      const cells = row.findAll('td');
      expect(cells.at(0)?.text()).toBe(project.name);
      expect(cells.at(1)?.text()).toBe(project.tasks.length.toString());
    });
  });

  test('should call addProject method on happing "value" event of InputModal component', () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' }); // Hay que buscar InputModal, no input-modal
    // console.log(inputModal);
    const newProjectName = 'New Project';
    inputModal.vm.$emit('value', newProjectName); // emitir evento "value", que hace que se ejecute el metodo addProject del store projectsStore, mandandole el string o valor "New Project"

    expect(projectsStore.addProject).toHaveBeenCalled();
    expect(projectsStore.addProject).toHaveBeenCalledWith(newProjectName);
  });
});
