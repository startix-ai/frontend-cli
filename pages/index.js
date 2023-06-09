import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

function depolywebsite(){

  const name = document.querySelector('#domain_name_input').value
  console.log(name)

  fetch('https://63knpdfhra.execute-api.ap-southeast-2.amazonaws.com/test/record/', {
    method: 'POST',
    body: JSON.stringify({
      "domain_name": name
    }),
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
    },
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
}

function dumpCSSText(element){
  return
}

function displayCSSPanel(element, cssRules) {
  const panel = document.createElement('div');
  panel.id = 'css-panel';
  panel.style.position = 'fixed';
  panel.style.top = '10px';
  panel.style.right = '10px';
  panel.style.backgroundColor = 'white';
  panel.style.border = '1px solid black';
  panel.style.padding = '10px';
  panel.style.zIndex = '1000';
  panel.style.maxHeight = '80vh';
  panel.style.overflowY = 'auto';

  const title = document.createElement('h3');
  title.innerText = 'CSS Styles';
  panel.appendChild(title);

  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules[i];
    const styleText = document.createElement('p');
    styleText.innerText = `${rule}: ${cssRules.getPropertyValue(rule)};`;
    panel.appendChild(styleText);
  }

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.onclick = () => panel.remove();
  panel.appendChild(closeButton);

  const existingPanel = document.getElementById('css-panel');
  if (existingPanel) {
    existingPanel.remove();
  }
  document.body.appendChild(panel);
}

function elementSelected(event) {
  event.stopPropagation();
  event.preventDefault();

  const selectedElement = event.target;
  const cssRules = getComputedStyle(selectedElement);
  displayCSSPanel(selectedElement, cssRules);
}

let editorMode = false;
let quitEditorButton;

function toggleEditorMode() {
  editorMode = !editorMode;
  if (editorMode) {
    document.body.style.cursor = 'pointer';
    document.addEventListener('click', elementSelected, true);

    // Create the "Quit Editor Mode" button
    quitEditorButton = document.createElement('button');
    quitEditorButton.innerText = 'Quit Editor Mode';
    quitEditorButton.style.position = 'fixed';
    quitEditorButton.style.bottom = '10px';
    quitEditorButton.style.right = '10px';
    quitEditorButton.style.zIndex = '1000';
    quitEditorButton.onclick = toggleEditorMode;
    document.body.appendChild(quitEditorButton);
  } else {
    document.body.style.cursor = 'default';
    document.removeEventListener('click', elementSelected, true);

    // Remove the "Quit Editor Mode" button
    if (quitEditorButton) {
      quitEditorButton.remove();
    }
  }
}



export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            A static page for deploy & undeploy website to domains.
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        {/*<div className={styles.center}>*/}
        {/*  <Image*/}
        {/*    className={styles.logo}*/}
        {/*    src="/next.svg"*/}
        {/*    alt="Next.js Logo"*/}
        {/*    width={180}*/}
        {/*    height={37}*/}
        {/*    priority*/}
        {/*  />*/}
        {/*  <div className={styles.thirteen}>*/}
        {/*    <Image*/}
        {/*      src="/thirteen.svg"*/}
        {/*      alt="13"*/}
        {/*      width={40}*/}
        {/*      height={31}*/}
        {/*      priority*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <form>

          <label htmlFor="name">Domain Name:</label>
          <input type="text" name="domain_name_input" id="domain_name_input"/>

        </form>

        <div className={styles.grid}>
          <a
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            onClick={depolywebsite}
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dumpCSSText(this)}
          >
            <h2 className={inter.className}>
              Undeploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleEditorMode}
          >
            <h2 className={inter.className}>
              Edit <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
