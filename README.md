# This is a template for Module Federation With React and Vite

## How to run this project

**To run this project open it with VS Code.**

**Step 1 :**

goto to the remote-app directory

```bash
cd remote-app
```

**Step 2 :**

Install all the required packages

```bash
pnpm i
```

**Step 3 :**

Build and Run the production build

```bash
pnpm build && pnpm serve
```

It should generate a url for you to check it and make sure its running. If its running, follow the next steps.

**Step 4 :**

```bash
cd host-app
```

**Step 5 :**

Install alll the required packages

```bash
pnpm i
```

**Step 6 :**

```bash
pnpm build && pnpm preview
```

Now it should run in a different port. If you wish to change anything goto the remote-app and change it accordingly and save it. After saving it. use the following command in the remote-app terminal.

```bash
pnpm build && pnpm serve
```

now just refresh the host-app and that's it. It should reflect on the host app. Thank me later:wink:

<br/>

<!-- Fix: Replace <br> with <br/> -->
<br/>

## How to Create a new project using **Module Federation** With React and Vite

**Step 1 :**

First create a new folder. I will name it `Mod-Fed`.

```bash
mkdir Mod-Fed
```

**Step 2 :**

Go inside the newly created folder

```bash
cd Mod-Fed
```

**Step 3 :**

Create a new react app using `vite`

```bash
pnpm create vite@latest
```

Now it will ask you to give a name of your application. In my case I will choose "remote-app". Now it will ask you to choose a freamework I'll choose "React with typescript + SWC". Then run the following commands

```bash
cd remote-app
pnpm install
pnpm run dev
```

After making sure the app is running as it should you can clean up the project as you like.

**Step 4 :**

Open your terminal and install `@originjs/vite-plugin-federation` this in dev dependancy package.

```bash
pnpm add -D @originjs/vite-plugin-federation
```

**Optional Step :**

I like to use `tailwindcss` as my css library. So I'll install it. If you don't use tailwind you can skip this part.

```bash
pnpm add -D tailwindcss
pnpm tailwindcss init
```

It should install `tailwindcss` as dev dependany and generate `tailwind.config.js` file the root of your project.

Open `tailwind.config.js` file and add the following. It will look into those directory and look for any tailwind class and apply the appropriate css.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{html,js}",
		"./components/**/*.{html,js}",
		"./*.html",
		"./src/**/*.html",
		"./*.js",
		"./src/**/*.html",
		"./src/**/*.js",
		"./src/**/*.jsx",
		"./src/**/*.ts",
		"./src/**/*.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
```

Now open the `index.css` which located in the `src` directory and add these inside

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now you are all set. Try to add tailwind classes in some `html` element and make sure its working.

**Step 5 :**

Now in order to use Module Federation we need to configure `vite.config.ts` file. Open the `vite.config.ts` and add this.

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			//add any name you want. Idealy you should give a name that represents you app
			name: "remoteApp",
			filename: "remoteEntry.js",
			exposes: {
				//add any components you want to share
				"./Button": "./src/components/Button",
			},
			//add any packages name that you want to share. I added tailwind because my Button componment depends on tailwind
			shared: ["react", "react-dom", "tailwindcss"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			//you need to set target as "esnext" otherwise it might cause isuue
			target: "esnext",
		},
	},
	build: {
		//these are some buiild tweek in order to make sure tailwind and any other css to be shared
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
```

If you face any error that says `top level await` open your `tsconfig.json` file and paste this

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"useDefineForClassFields": true,
		"lib": ["ES2022", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true
	},
	"include": ["src"],
	"references": [{ "path": "./tsconfig.node.json" }],
	"exclude": ["node_modules"]
}
```

**Step 5 :**

We have to configure the `package.json` file. If you're wondering why, Its because everytime you run the app vite will give you a differnt port. But we need a strict port that we will use in our host app.

```json
{
	"name": "remote-app",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite --port 5001 --strictPort",
		"build": "tsc && vite build",
		"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
		"preview": "vite preview --port 5001 --strictPort",
		"serve": "vite preview --port 5001 --strictPort"
	},
	"dependencies": {
		"react": "^18.2.0",
		"react-dom": "^18.2.0"
	},
	"devDependencies": {
		"@originjs/vite-plugin-federation": "^1.3.4",
		"@types/react": "^18.2.43",
		"@types/react-dom": "^18.2.17",
		"@typescript-eslint/eslint-plugin": "^6.14.0",
		"@typescript-eslint/parser": "^6.14.0",
		"@vitejs/plugin-react-swc": "^3.5.0",
		"autoprefixer": "^10.4.17",
		"eslint": "^8.55.0",
		"eslint-plugin-react-hooks": "^4.6.0",
		"eslint-plugin-react-refresh": "^0.4.5",
		"postcss": "^8.4.33",
		"tailwindcss": "^3.4.1",
		"typescript": "^5.2.2",
		"vite": "^5.0.8"
	}
}
```

As you can see I have modified the scripts. I have added `--port 5001 --strictPort` next to default script. Its tells the vite to run the app on port 5001 and if you can't give me that port, do not give me any.

**Step 6 :**

Now Create any component and use it your project and make sure its working. If its working you can share it to host applications.

For example,
Lets say I have a component callled `Button.tsx` inside my `src/components` folder and its working just as I like.

This is my `Button.tsx` file.

```typescript
import { useState } from "react";

const Button = () => {
	const [count, setCount] = useState(0);

	return (
		<button
			className="bg-red-500 p-3 rounded-full m-3 font-semibold"
			onClick={() => setCount((prev) => prev + 1)}>
			Clicked Me {count} times
		</button>
	);
};

export default Button;
```

I want to share this component to my host applicion. To do that we need to add this `Button.tsx` component to the `vite.config.ts` file.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "remoteApp",
			filename: "remoteEntry.js",
			exposes: {
				//I have added the Button component here to expose for my host applications. Feel free to add other components if you want share other components as well
				"./Button": "./src/components/Button",
			},
			shared: ["react", "react-dom", "tailwindcss"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
```

Its all done for the remote applicaton. Now you can share as many components as you like. Just follow the step 6 and add them on your `vite.config.ts` file inside `expose` section.

**NOTE : Make sure to build and serve/preview. Otherwise it won't work. After making any changes to the remote appliction always make sure to build and serve the appliction in order it to work. Use the follwing command to build and serve**

```bash
pnpm build && pnpm serve
```

**We are all set for the remote app😮‍💨. Now let's see how to configure the host app to work**

**Step 7 :**

Create a new react appliction following **Step 3**

**Step 8 :**

Follow **Step 4**

**Optional Step :**

If you want to use `tailwindcss` follow the previous **Optional Step** where i Showed how to configure `tailwind`.
If you don't want to use `tailwind` you can skip this part.

**Step 9 :**

We need to modify the `vite.config.ts` on the host-app as well. Just open your `vite.config.ts` that located on the root of your applicaton and add the follwing

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "hostApp",
			remotes: {
				//This is where we will add the remote app (the app shareing the components).
				remoteApp: "http://localhost:5001/assets/remoteEntry.js",
			},
			shared: ["react", "react-dom"],
		}),
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
		cssCodeSplit: false,
		minify: "esbuild",
	},
});
```

**Note:**
Take a look at this section.

```typescript
remotes: {
        remoteApp: "http://localhost:5001/assets/remoteEntry.js",
			},
```

In the remote section I have named the key as 'remoteApp'. You can name it anything but it is recomended to give a name that actualy represent your remote app.

Take a look at the url. Remember we made sure that in the remote-app vite always gives us port 5001, Beacuse we need to specify the port where the remote app running.

**Step 10 :**

If you're using `typescript` like me. you need to follow an additional step. Otherwise you will face a typescript error. Let's see what we need to do in order to avoid that.

Add a file in your host app root and name it like this `remoteApp.d.ts`. I have named it remoteApp. As you can see in previous step my remote key was `remoteApp`. If your remote key is 'someThing' name the file as `someThing.d.ts`

Now open the file and add this.

```typescript
declare module "remoteApp/*";
```

Again, my remote key was remoteApp, that's why it says "remoteApp/\*" if your key name was 'someThing' replace the 'remoteApp' with the 'someThing'

**Step 11 :**

All the configuration are done. Now you can consume the components that you shared from the remote-App. Let's see how to consume it.

```typescript
import "./App.css";
import { lazy } from "react";

const Button = lazy(() => import("remoteApp/Button"));

function App() {
	return (
		<>
			<div>
				<Button />
			</div>
		</>
	);
}

export default App;
```

In this example I'm `lazy`. You can use `dynamic` instead. Remember the remote key we used? My key name was `remoteApp` that's I'm importing like this

```typescript
const Button = lazy(() => import("remoteApp/Button"));
```

If your key name is 'someThing' just replace the 'remoteApp' with 'someThing'.

**Step 12 :**

Now all you need to do is build and run the application on preview.

```bash
pnpm build && pnpm preview
```

Now go to the provided url and see the Module federation on action:wink:

**Importent Note :**
Make sure that you build and serve your remote app before you consume it on your host app. After consuming the shared component on the host. you need to build the host application and preview it. Now if you want to make any changes on the remote app all you need to do is build and serve only the remote app you don't have to build and preview the host app. Just refresh the host app and you will see the changes.

### Enjoy the Module Federation

If you find this helpfull you can give me a :star: star.
