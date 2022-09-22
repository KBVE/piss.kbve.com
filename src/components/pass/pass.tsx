import { component$, useClientEffect$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import psl from 'psl'
import sha256 from 'sha256'
import styles from './pass.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    domain: '',
    tld: '',
    hostOnly: true,
    masterPass: '',
    finalPass: '',
    regex: '',
    pissTracker: 'a',
  });

  useClientEffect$(({ cleanup }) => {
    const timeout = setInterval(() => (state.pissTracker = ['a', 'a', 'a', 'a', 'i'][Math.floor(Math.random() * 5)]), 100);
    cleanup(() => clearInterval(timeout));
  });

  return (
    <>
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div class="input-container">
          <p style={{ margin: '0 !important' }} aria-label='domain-label'>Domain</p>
          <input
            class="edit"
            aria-labelledby='domain-label'
            placeholder='kbve.com'
            value={state.domain}
            onChange$={(event: any) => {
              state.domain = event.target.value
            }}
          />
          <small>Domain TLD is used as the salt for the password. Salt: <b>{state.tld}</b></small>
        </div>
        <div class="input-container">
          <p style={{ margin: '0 !important' }} aria-label='master-pass-label'>Master Pass</p>
          <input
            class="edit"
            aria-labelledby='master-pass-label'
            placeholder='password123'
            type="password"
            value={state.masterPass}
            onChange$={(event: any) => {
              state.masterPass = event.target.value
            }}
          />
        </div>
        <div class="input-container">
          <p style={{ margin: '0 !important' }} aria-label='final-pass-label'>Final Pass</p>
          <input
            class="edit"
            aria-labelledby='final-pass-label'
            placeholder='Final Password will Show Here'
            value={state.finalPass}
          />
        </div>
        <div class="input-container">
          <button class="button" onClick$={() => {
            function getHostName(url: string) {
              const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
              if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                return match[2];
              }
              else {
                return null;
              }
            }
            function getDomain(url: string) {
              const hostName = getHostName(url);
              let domain = hostName;

              if (hostName != null) {
                const parts = hostName.split('.').reverse();

                if (parts != null && parts.length > 1) {
                  domain = parts[1] + '.' + parts[0];

                  if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
                    domain = parts[2] + '.' + domain;
                  }
                }
              }

              return domain;
            }

            let r_salt = psl.get(state.domain);
            if (r_salt == null) {
              r_salt = getDomain(state.domain);
            }
            console.log(r_salt);
            const password = state.masterPass;
            console.log(r_salt + password);
            if (r_salt != null) {
              state.finalPass = sha256(r_salt + password);
              console.log(state.finalPass)
              state.tld = r_salt;
            }
            else {
              state.tld = 'Error in Salt'
              state.finalPass = 'ERROR'
            }

          }}>Generate P{state.pissTracker}ss</button>
        </div>
      </div>
    </>
  )
})