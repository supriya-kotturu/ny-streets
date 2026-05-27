import './style.css'
import './app.ts'

const mount = document.querySelector<HTMLDivElement>('#app');

if (mount) {
	mount.replaceChildren(document.createElement('demo-app'));
}
