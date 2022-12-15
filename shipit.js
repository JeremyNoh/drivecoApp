// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt")
// For Node.JS, you need to import the fs (file system) module
const { createReadStream } = require("fs")
const path = require("path")

const token = process.env.SLACK_TOKEN
const slackBot = new App({
  token,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})

async function sendApk() {
  const fileName = path.resolve(
    __dirname,
    "..",
    "android",
    "app",
    "build",
    "outputs",
    "apk",
    "release",
    "app-release.apk",
  )

  try {
    // Call the files.upload method using the built-in WebClient
    const result = await slackBot.client.files.upload({
      // The token you used to initialize your app is stored in the `context` object
      token,
      channels: "#drivecotest",
      initial_comment: "Here's new updated build :smile:",
      // Include your filename in a ReadStream here
      file: createReadStream(fileName),
    })
    console.log("Sucessfully sent")
  } catch (error) {
    console.error("oops: ", error)
  }
}

sendApk()
