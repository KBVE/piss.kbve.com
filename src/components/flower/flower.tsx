import { component$, useClientEffect$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './flower.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    count: 0,
    number: 50,
  });

  useClientEffect$(({ cleanup }) => {
    const timeout = setTimeout(() => (state.count = 1), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 1000);
    cleanup(() => clearInterval(internal));
  });

  return (
    <>
      <div
        style={{
          '--state': `${state.count * 0.1}`,
          'position': 'fixed',
          'top': 0,
          'left': 0,
          'z-index': '-1',
        }}
        class={{
          host: true,
        }}
      >
        {Array.from({ length: state.number }, (_, i) => (
          <div
            key={i}
            class={{
              square: true,
              odd: i % 2 === 0,
            }}
            style={{ '--index': `${i + 1}` }}
          />
        )).reverse()}
      </div>
    </>
  );
});