import { mount } from '@vue/test-utils'; // mount sí renderiza sus componentes de vue internos. shallowMount no lo hace
import CustomModal from '@/modules/common/components/CustomModal.vue';

describe('<CustomModal />', () => {
  test('should render dialog with default state', () => {
    const wrapper = mount(CustomModal);

    // console.log(wrapper.html());

    const modal = wrapper.find('.modal'); // modal hace referencia al dialog

    expect(modal.exists()).toBe(true);
    expect(modal.attributes('open')).toBeUndefined();
  });

  test('should render dialog with header, body and footer slots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<span>Header content</span>',
        body: '<span>Body content</span>',
        footer: '<span>Footer content</span>',
      },
    });

    // console.log(wrapper.html());
    expect(wrapper.text()).toContain('Header content');
    // expect(wrapper.find('.my-5').text()).toContain('Body content');
    expect(wrapper.text()).toContain('Body content');
    expect(wrapper.text()).toContain('Footer content');
  });

  test('should open and close dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeDefined();

    const modalBackground = wrapper.find('.modal-backdrop');
    expect(modalBackground.exists()).toBe(true);
    //   console.log(modalBackground.classes());
    expect(modalBackground.classes()).toEqual([
      'modal-backdrop',
      'fixed',
      'top-0',
      'left-0',
      'z-0',
      'bg-black',
      'opacity-40',
      'w-screen',
      'h-screen',
    ]);

    // Cambiar la prop open a false
    await wrapper.setProps({ open: false }); // El cambio del valor de la propiedad "open" no es sincrono, hay que esperar a que cambie

    // console.log(wrapper.html());
    expect(modal.attributes('open')).toBeUndefined();
    // expect(modalBackground.exists()).toBe(false);// En este punto, ya tenemos la referencia al elemento con clase .modal-backdrop y el elemento ya está grabado en modalBackground y aunque se oculte con el "v-if", tendremos siempre la referencia al elemento.
    expect(wrapper.find('.modal-backdrop').exists()).toBe(false);
  });
});
