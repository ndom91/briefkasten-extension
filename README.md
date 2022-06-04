# 📌 Briefkasten Extension

![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/aighkhofochfjejmhjfkgjfpkpgmjlnd?style=flat-square)
![GitHub](https://img.shields.io/github/license/ndom91/briefkasten-extension?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/ndom91/briefkasten-extension?style=flat-square)
[![Demo](https://img.shields.io/badge/demo-instance-green?style=flat-square)](https://briefkasten.vercel.app)

> Forked from [`sissbruecker/linkding-extension`](https://github.com/sissbruecker/linkding-extension)

Companion extension for your self-hosted [Briefkasten](https://github.com/ndom91/briefkasten) instance!

### Features

- ~Quickly add a bookmark for the current tab (keyboard shortcut: <kbd>Alt</kbd><kbd>Shift</kbd><kbd>L</kbd>)~
- Search bookmarks through the Omnibox / address bar (keyword: <kbd>bk</kbd>)

Works with: **Firefox (101+)**, **Chrome**

![Screenshot](/docs/screenshot.png)

## ✨ Installation

- Chrome: [Chrome Web Store](https://chrome.google.com/webstore/detail/briefkasten-bookmarks/aighkhofochfjejmhjfkgjfpkpgmjlnd)
- ~Firefox: [Mozilla Addon Store](https://addons.mozilla.org/de/firefox/addon/briefkasten-extension/)~ (Waiting on Firefox [`manifest v3`](https://blog.mozilla.org/addons/2022/05/18/manifest-v3-in-firefox-recap-next-steps/) support)

## 🧰 Manual Installation

1. Clone repository

```bash
$ git clone https://github.com/ndom91/briefkasten-extension
$ cd briefkasten-extension
```

2. Install all dependencies

```sh
$ npm install
```

3. Build the source code into `/dist` dir

```sh
$ npm run build
```

After the build is complete, the repository directory will contain the unpackaged extension under `dist/`. You can load this "unpacked" extension into your browser via the extension page, if "Developer Mode" is enabled. For more details, please check out the following links.

- [Firefox - WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
- [Chrome - Extensions Getting Started](https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest)

## 📝 License

MIT
