// Cuando se haga import router from './router'; en main.ts, se va a importar por default la cadena o string "router". El objeto router ahora será el string "router".
vi.mock('@/router', () => ({
  default: 'router',
}));

// Cuando se haga la importacion del objeto o modulo "pinia" (import pinia from 'pinia'), todas sus propiedades permanecen iguales, menos la que se llama "createApp", la cual, será una función mockeada que retornará el string "pinia"
vi.mock('pinia', async (originalPiniaModule) => {
  // originalPiniaModule es el modulo original de pinia, que contiene todas sus propiedades y funciones originales. Se le pasa como argumento a la función async para que podamos acceder a sus propiedades originales.
  const modOriginal = await originalPiniaModule;
  return {
    ...modOriginal,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

describe('Main.ts', () => {
  const vue = require('vue');

  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createApp = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy,
  }); // createApp mock. Reemplaza el original retorno de metodo createApp de "vue", por un mock que es un objeto con propiedades "use" y "mount", las cuales son funciones mockeadas.

  vue.createApp = createApp; // Configurar o establecer el metodo createApp de "vue" como el mock que hemos creado.

  test('should be configured with pinia and router', async () => {
    await import('@/main'); // Ejecutar el archivo main.ts para que se ejecute su codigo interno, es decir, se monte el componente

    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app'); // Verifica que el método mountSpy haya sido llamado con el argumento '#app'.

    // console.log(useSpy.mock.calls); // muestra con qué valores ha sido llamado el mock spy "useSpy" (que mockea a funcion "use" de propiedad "createApp" de vue).
    expect(useSpy).toHaveBeenCalledWith('router'); // Evaluar que el primer argumento de la primera llamada o ejecucion de use (mockeado con useSpy) desde el archivo main.ts sea 'router'.
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
