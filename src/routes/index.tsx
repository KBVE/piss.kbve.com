import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import PassComponent from '~/components/pass/pass';

export default component$(() => {
  return (
    <div>
      <h1>
        Welcome to PISS <span class="emoji">💦</span>
      </h1>

      <PassComponent />

      <h2>Community</h2>

      <ul>
        <li>
          <span>Open issues and contribute on </span>
          <a href="https://github.com/KBVE/nfc/tree/master/piss" target="_blank">
            Github
          </a>
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'PISS',
};
