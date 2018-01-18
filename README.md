# Mock now

Run your remote mock api just with one command:
```sh
mock-now
```

## Installation

But before your run you need to do few steps of installation:

1) Install [now](https://www.npmjs.com/package/now):

```sh
npm install now -g
```

2) Login to `now`:

```sh
now login
```

3) Install module itself:

```
npm install https://github.com/all-bear/nodejs.mock-now -g
```

## How it works

First of all you need to create api configuration file (you can put it anywhere), this file will contain all information about routes. You can create static configuration:

`mock-now.json`

```javascript
{
	"routes": {
		"/user/get-html:get": "<div style=\"color: red;\">HTML:GET Test</div>",
		"/user/get-json:get": {
			"data": "JSON:GET Test"
		},
		"/user/default-html": "<div style=\"color: red;\">HTML:DEFAULT Test</div>",
		"/user/post-html:post": "<div style=\"color: red;\">HTML:POST Test</div>"
	}
}
```
, keys from `routes` it's route paths with format `{path}:{method}`, if `method` is not defined it will be `GET` by default

Or you can create dynamic routes:

`mock-now.js`

```javascript
module.exports = {
	"routes": {
		"/user/get-html:get": function (req) {
			return `<div style=\"color: red;\">HTML:GET Test, Date: ${Date.now()}, Query: ${JSON.stringify(req.query)}</div>`;
		},
		"/user/get-json:get": {
			"data": "JSON:GET Test"
		},
		"/user/default-html": "<div style=\"color: red;\">HTML:DEFAULT Test</div>",
		"/user/post-html:post": "<div style=\"color: red;\">HTML:POST Test</div>"
	}
}
```
, `express` server is used for server, so you can check what is `req` from `express` docs

After configuration file is created you need to navigate to the folder with configuration in your shell and run:

```sh
mock-now
```

This command will upload your mock api to the server.
