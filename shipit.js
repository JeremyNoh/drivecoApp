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
  const filename = "app-release.apk"
  const file = path.resolve(
    __dirname,
    "android",
    "app",
    "build",
    "outputs",
    "apk",
    "release",
    filename,
  )

  try {
    // Call the files.upload method using the built-in WebClient
    const result = await slackBot.client.files.uploadV2({
      // The token you used to initialize your app is stored in the `context` object
      token,
      channel_id: "C04FQQLN7EV",
      initial_comment: "Une Nouvelle version est dispo !!! :smile:",
      // Include your filename in a ReadStream here
      filename,
      file: createReadStream(file),
    })
    console.log("Sucessfully sent")
  } catch (error) {
    console.error("oops: ", error)
  }
}

sendApk()
