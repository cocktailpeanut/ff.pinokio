module.exports = async (kernel) => {
  return {
    daemon: true,
    cmd: {
      Normal: "python run.py",
      Enhancer: "python run.py --frame-processor face_enhancer face_swapper frame_enhancer",
      Webcam: "python run.py --ui-layouts webcam"
    },
    run: [{
      method: "local.set",
      params: { mode: "{{input.mode}}" }
    }, {
      method: "shell.run",
      params: {
        message: "{{self.cmd[local.mode]}}",
        path: "facefusion",
        conda: "../env",
        on: [{ event: "/(http:\/\/[0-9.:]+)/", done: true }]
      }
    }, {
      method: "self.set",
      params: {
        "session.json": {
          "mode": "{{local.mode}}",
          "url": "{{input.stdout.match(/(http:\\S+)/gi)[0]}}"
        }
      }
    }, {
      method: "browser.open",
      params: {
        uri: "{{self.session.url}}",
        target: "_blank"
      }
    }]
  }
}
