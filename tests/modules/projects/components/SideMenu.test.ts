import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { fakeProjects } from '../../../mocks/projects.fake';
import { nextTick } from 'vue';

describe('<SideMenu />', () => {
  const wrapper = mount(SideMenu, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createTestingPinia()],
    },
  }); // createTestingPinia crea la pinia, la cual va a contener en este caso, el store "projectsStore".

  const projectsStore = useProjectsStore();

  beforeEach(() => {
    projectsStore.$patch({
      projects: [],
    });
  });

  test('should render with no projects', () => {
    // console.log(wrapper.html());

    expect(wrapper.html()).toContain('No hay proyectos');
  });

  test('should render with projects', async () => {
    projectsStore.$patch({
      projects: fakeProjects,
    }); // Cambio en el state de projectsStore es síncrono, pero en lo que respecta al html es asincrono, por lo que hay que usar nextTick con await para esperar a que el cambio del state se vea reflejado en el html.

    // console.log(projectsStore.projectList);

    await nextTick();

    // console.log(wrapper.html());
    expect(wrapper.html()).not.toContain('No hay proyectos');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
