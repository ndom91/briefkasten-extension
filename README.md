# 📌 Briefkasten Extension

![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/aighkhofochfjejmhjfkgjfpkpgmjlnd?style=flat-square)
![GitHub](https://img.shields.io/github/license/ndom91/briefkasten-extension?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/ndom91/briefkasten-extension?style=flat-square)
[![Demo](https://img.shields.io/badge/demo-instance-green?style=flat-square)](https://briefkastenhq.com)

> Forked from [`sissbruecker/linkding-extension`](https://github.com/sissbruecker/linkding-extension)

Companion extension for your self-hosted [Briefkasten](https://github.com/ndom91/briefkasten) instance!

### Features

- Quickly add a bookmark for the current tab (keyboard shortcut: <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>K</kbd>)
- Search bookmarks through the Omnibox / address bar (keyword: <kbd>bk</kbd>)

Works with: **Chrome** (and all Chromium based browsers), **Firefox (101+)**

![Screenshot](/docs/screenshot.png)

## ✨ Installation

[![Chrome Webstore](https://raw.githubusercontent.com/z0ccc/Upvote-Anywhere/master/promo/chrome.png)](https://chrome.google.com/webstore/detail/briefkasten-bookmarks/aighkhofochfjejmhjfkgjfpkpgmjlnd)

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

## 🛼 Setup

After installing the extension for the first time, you will be greeted with the options pop-up asking you to enter the _Base Url_ and an _API Token_.

1. The Base URL will be `https://briefkastenhq.com` if using the demo version of the application. Otherwise, use your own domain.
2. The API Token can be found at the top of the [Settings](https://briefkastenhq.com/settings) page after logging in.

## 📝 License

MIT
