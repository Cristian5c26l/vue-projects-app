import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { mount } from '@vue/test-utils';
import { fakeProjects } from '../../../mocks/projects.fake';
import { useRouter } from 'vue-router';
import type { Mock } from 'vitest';

vi.mock('vue-router'); // moce de todo el vue-router
vi.mock('@/modules/projects/store/projects.store'); // mock de todo el store

describe('<ProjectView />', () => {
  test('should be render with a project', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: fakeProjects,
    });

    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    // console.log(wrapper.html());
    const tableRows = wrapper.findAll('tr.hover\\:bg-base-300');

    expect(tableRows.length).toBe(fakeProjects.at(0)?.tasks.length);
  });

  test('should redirect to projects page if projectId not found', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: [],
    });

    const replaceSpy = vi.fn();

    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    }); // Tener mockeado el replace del useRouter antes de que suceda router.replace('/) al montar el componente ProjectView con mount

    mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    // console.log(wrapper.html());

    expect(replaceSpy).toHaveBeenCalledWith('/');
  });
});
