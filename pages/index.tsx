import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import snapCfg from '../snap.config';
import snapManifest from '../snap.manifest.json';
import { JsonRpcError } from 'json-rpc-engine';

const Home: NextPage = () => {
  const [snapId, setSnapId] = useState('');

  // run only client-side
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      setSnapId(
        `local:${window.location.protocol}//${window.location.hostname}:${snapCfg.cliOptions.port}`,
      );
    } else {
      setSnapId(`npm:${snapManifest.source.location.npm.packageName}`);
    }
  }, []);

  const connect = async () => {
    await window.ethereum?.request({
      method: 'wallet_enable',
      params: [
        {
          wallet_snap: { [snapId]: {} },
        },
      ],
    });
  };
  const sendHello = async () => {
    try {
      const response = await window.ethereum?.request({
        method: 'wallet_invokeSnap',
        params: [
          snapId,
          {
            method: 'hello',
          },
        ],
      });
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + (err as JsonRpcError).message || err);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Hello, Snaps!</h1>
      <details>
        <summary>Instructions</summary>
        <ul>
          {/* eslint-disable-next-line react/no-unescaped-entities*/}
          <li>First, click "Connect". Then, try out the other buttons!</li>
          <li>Please note that:</li>
          <ul>
            <li>
              The <code>snap.manifest.json</code> and <code>package.json</code>{' '}
              must be located in the server root directory..
            </li>
            <li>
              The Snap bundle must be hosted at the location specified by the{' '}
              <code>location</code> field of <code>snap.manifest.json</code>.
            </li>
          </ul>
        </ul>
      </details>
      <br />

      <button className="connect" onClick={() => connect()}>
        Connect
      </button>
      <button className="sendHello" onClick={() => sendHello()}>
        Send Hello
      </button>
    </div>
  );
};

export default Home;
