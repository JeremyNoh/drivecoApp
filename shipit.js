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
    // await slackBot.client.files.uploadV2({
    //   channel_id: "C04FQQLN7EV",
    //   initial_comment: "Une Nouvelle version est dispo !!! :smile:",
    //   request_file_info: true,
    //   file_uploads: [
    //     {
    //       file: createReadStream(file),
    //       filename,
    //     },
    //   ],
    // })
    const result = await slackBot.client.files.upload({
      channels: "#drivecotest",
      file: createReadStream(file),
      filename,
      initial_comment: "Une Nouvelle version est dispo !!! :smile:",
    })
  } catch (error) {
    console.error("oops: ", error)
  }
}

sendApk()
