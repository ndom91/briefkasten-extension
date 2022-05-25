# briefkasten extension

> Forked from [`sissbruecker/linkding-extension`](https://github.com/sissbruecker/linkding-extension)

Companion extension for the self-hosted [briefkasten](https://github.com/ndom91/briefkasten) bookmark service.

**Features**

- Quickly add a bookmark for the current tab (keyboard shortcut: <kbd>Alt</kbd><kbd>Shift</kbd><kbd>L</kbd>)
- Search bookmarks through the Omnibox / address bar (keyword: <kbd>ld</kbd>)

Works with: Firefox, Chrome

**Screenshot**

![Screenshot](/docs/screenshot_extension.png?raw=true 'Screenshot')

## Installation

- ~Firefox: [Mozilla Addon Store](https://addons.mozilla.org/de/firefox/addon/briefkasten-extension/)~ (Coming Soon)
- ~Chrome: [Chrome Web Store](https://chrome.google.com/webstore/detail/briefkasten-extension/beakmhbijpdhipnjhnclmhgjlddhidpe)~ (Coming Soon)

## Manual Installation

### Firefox

Run the build as described below and then follow the instructions [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing) to load it into Firefox.

### Chrome

Run the build as described below and then follow the instructions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest) to load it into Chrome.

## Build

**Requirements**

- node (16+)
- npm (6+)

Install all dependencies

```
$ npm install
```

Then run the following npm script to generate a build

```
$ npm run build
```

After the build is complete, the root directory will contain the unpackaged extension under `dist/`.

## License

MIT
