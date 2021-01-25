# 01-hello-args
> the basics of getting arguments passed from the command line

## Description
The example illustrates how to read arguments from the command-line using Node.js native mechanism: `process.argv`.

For example, when running `npm start` we get:
```
[0]: /usr/bin/nodejs
[1]: /home/ubuntu/Development/git-repos/misc-prjs/nodejs-in-action/chapter12-writing-cli-apps/01-hello-args/app/src/index.js
```

when typing: `node app/src/index.js --version -f some-file.txt --show-contents full`
```
[0]: /usr/bin/nodejs
[1]: /home/ubuntu/Development/git-repos/misc-prjs/nodejs-in-action/chapter12-writing-cli-apps/01-hello-args/app/src/index.js
[2]: --version
[3]: -f
[4]: some-file.txt
[5]: --show-contents
[6]: full
```