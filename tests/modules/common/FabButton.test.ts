import FabButton from '@/modules/common/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('<FabButton />', () => {
  test('should render with default position', () => {
    const wrapper = shallowMount(FabButton);

    // console.log(wrapper.html());
    // console.log(wrapper.props());
    expect(wrapper.props().position).toBe('bottom-right');

    const buttonClasses = wrapper.find('button').classes();
    // console.log(buttonClasses);
    const classesToHave = ['btn', 'btn-circle', 'btn-secondary', 'fixed', 'bottom-right'];
    // expect(buttonClasses).toEqual(expect.arrayContaining(classesToHave));
    expect(buttonClasses).toEqual(classesToHave);
  });

  test('should render with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    }); // Renderizar el componente FabButton (con shallowMount) enviandole la propiedad position con el valor top-left

    const button = wrapper.find('button');
    expect(button.classes()).toContain('top-left');
    expect(wrapper.props().position).toBe('top-left');
  });

  test('should render with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-right',
      },
    }); // Renderizar el componente FabButton (con shallowMount) enviandole la propiedad position con el valor top-right

    const button = wrapper.find('button');
    expect(button.classes()).toContain('top-right');
    expect(wrapper.props().position).toBe('top-right');
  });

  test('should render slot content inside button', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hola</span>',
      },
    });

    // console.log(wrapper.html());
    const slot = wrapper.find('button span');
    expect(slot.exists()).toBe(true);
    expect(slot.text()).toBe('Hola');
  });
});
