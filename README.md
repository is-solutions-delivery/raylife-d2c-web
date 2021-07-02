# Direct To Customer - Web Component

This repository contains a react project created with [Create React App](https://github.com/facebook/create-react-app), adapted to work with [Liferay's Remote Web Components](https://github.com/rotty3000/remote-web-component-poc). More examples [here](https://github.com/rotty3000/remote-component-test).

## How to setup

First of all, its necessary to install `package.json` dependencies. Inside the project root folder run:

```bash
npm install
# or
yarn install
```

### Development

Start the react application with:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

#### Testing locally with Mock Server

During development you can start a local server to mock the api calls. To do this run:

```bash
./mock/start.sh
```

The mock server will be available at `http://localhost:3333`

#### Testing locally with liferay

To deploy changes execute, every time you want to check a new change inside liferay portal:

```bash
npm run build:liferay
# or
yarn build:liferay
```

If you want to develop inside the Liferay's Remote Web Components. Start an local web component server with:

```bash
npm run serve:liferay
# or
yarn serve:liferay
```

This will start a local server at `http://localhost:5000` contain the files that should be imported inside the `System Setting -> Widget Tools`. The paths that should be added are:

```
http://localhost:5000/liferay/js/2.chunk.min.js
http://localhost:5000/liferay/js/main.min.js
http://localhost:5000/liferay/js/runtime-main.min.js
```

### Production

Edit the `.env` file with your liferay server information's. To build the application to use it with the Liferay's Remote Web Components, run:

```bash
npm run build:liferay
# or
yarn build:liferay
```

Inside the `build/liferay` folder will contain the files that should be imported inside the `System Setting -> Widget Tools`. The paths that should be added are:

```
<URL>/liferay/js/2.chunk.min.js
<URL>/liferay/js/main.min.js
<URL>/liferay/js/runtime-main.min.js
```
