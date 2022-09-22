import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { PissLogo } from '../icons/piss';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <div style={{
          'display': 'flex',
          'flex-direction': 'row',
          'align-items': 'center'
        }}>
          <a href="https://n.kbve.com/piss" target="_blank">
            <PissLogo />
          </a>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
            <h1 style={{
              'text-transform': 'uppercase',
              'font-weight': 'bolder',
              'text-decoration': 'unset',
              'color': 'rgba(0, 0, 0, 0.90)',
              'margin': '0 !important',
            }}>
              Piss
            </h1>
            <p style={{
              margin: '0 !important',
              color: 'rgba(0, 0, 0, 0.45)',
            }}>
              Partially Improved Security Suite
            </p>
          </div>
        </div>
      </div>
      <ul>
        <li>
          <a href="https://kbve.com" target="_blank" className="dark-link">
            Back to Mothership
          </a>
        </li>
      </ul>
    </header>
  );
});
