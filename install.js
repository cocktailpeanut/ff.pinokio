module.exports = async (kernel) => {
  let cmd
  let { platform, arch, gpu } = kernel
  if (platform === "darwin") {
    if (arch === "arm64") {
      cmd = "python install.py --onnxruntime coreml-silicon --torch default"
    } else {
      cmd = "python install.py --onnxruntime default --torch default"
    }
  } else {
    if (gpu === "nvidia") {
      cmd = "python install.py --onnxruntime cuda --torch cuda"
    } else if (gpu === "amd") {
      cmd = "python install.py --onnxruntime default --torch cpu"
    } else {
      cmd = "python install.py --onnxruntime default --torch cpu"
    }
  }
  return {
    requires: [
      { type: "conda", name: "ffmpeg", args: "-c conda-forge" },
      { gpu: "nvidia", name: "cuda" }
    ],
    run: [{
      method: "shell.run",
      params: { message: "git clone https://github.com/facefusion/facefusion --branch 1.3.1 --single-branch" }
    }, {
      method: "shell.run",
      params: { message: cmd, path: "facefusion", conda: "../env", }
    }, {
      method: "input",
      params: { title: "Install Complete", description: "Go back to the dashboard and launch the app!" }
    }, {
      method: "browser.open",
      params: { uri: "/?selected=facefusion" }
    }]
  }
}
