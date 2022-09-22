import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import Flower from '../components/flower/flower';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <Flower />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.kbve.com/" target="_blank">
          Made with ♡ by KBVE with Builder.io's Qwik
        </a>
      </footer>
    </>
  );
});
