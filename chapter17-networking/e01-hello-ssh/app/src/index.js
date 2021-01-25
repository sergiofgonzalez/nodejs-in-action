"use strict";

const Client = require("ssh2").Client;
const path = require("path");

runCommandViaSsh();
runCommandInShellViaSsh();


function runCommandViaSsh() {
  console.log(`Running command on remote server using SSH`);
  const conn = new Client();
  conn.on("ready", () => {
    console.log("Client::ready");
    conn.exec(`kubectl --kubeconfig ./kubernetes/admin.conf get pods -o wide`, (err, stream) => {
      if (err) {
        throw err;
      }
      stream
        .on("close", (code, signal) => {
          console.log(`Stream::close::code: ${ code }, signal: ${ signal }`);
          conn.end();
        })
        .on("data", data => {
          console.log(`stdout: ${ data }`);
        })
        .stderr.on("data", data => {
          console.log(`stderr: ${ data }`);
        });
    });
  }).connect({
    host: "172.48.102.108",
    port: 22,
    username: "centos",
    privateKey: require("fs").readFileSync(path.join(__dirname, "k8s-test.pem"))
  });
}



function runCommandInShellViaSsh() {
  const conn = new Client();
  console.log(`Running command on remote server  within a shell using SSH`);
  conn.on("ready", () => {
    console.log("Client::ready");
    conn.shell(`ls -la`, (err, stream) => {
      if (err) {
        throw err;
      }
      stream
        .on("close", (code, signal) => {
          console.log(`Stream::close::code: ${ code }, signal: ${ signal }`);
          conn.end();
        })
        .on("data", data => {
          console.log(`stdout: ${ data }`);
        })
        .stderr.on("data", data => {
          console.log(`stderr: ${ data }`);
        });
      stream.end("ls -la\nexit\n");
    });
  }).connect({
    host: "172.48.102.108",
    port: 22,
    username: "centos",
    privateKey: require("fs").readFileSync(path.join(__dirname, "k8s-test.pem"))
  });
}

