module.exports = {
  title: "FaceFusion",
  description: "Next generation face swapper and enhancer",
  icon: "icon.png",
  menu: async (kernel) => {
    let btns
    let env_installed = await kernel.exists(__dirname, "env")
    let repo_installed = await kernel.exists(__dirname, "facefusion")
    if (env_installed && repo_installed) {
      if (kernel.running(__dirname, "start.js")) {
        let session = await kernel.require(__dirname, "session.json")
        btns = [
          { icon: "fa-solid fa-spin fa-circle-notch", text: `Running ${session.mode} Mode` },
          { icon: "fa-solid fa-desktop", text: "Server", href: "start.js", params: { fullscreen: true } }
        ]
        if (session && session.url) {
          btns.push({ icon: "fa-solid fa-rocket", text: "Open Web UI", href: session.url, target: "_blank" })
        }
        return btns
      } else {
        btns = [
          { label: "Normal", icon: "fa-photo-film" },
          { label: "Enhancer", icon: "fa-solid fa-wand-magic-sparkles" },
          { label: "Webcam", icon: "fa-video" }
        ].map(({ icon, label }) => {
          return { icon: `fa-solid ${icon}`, text: `Launch ${label} Mode`, href: "start.js", params: { run: true, fullscreen: true, mode: label } }
        })
      }
    } else {
      if (kernel.platform === "darwin") {
        btns = [{ icon: "fa-solid fa-plug", text: "Install", href: "install.js", params: { run: true, fullscreen: true } }]
      } else {
        btns = [{ icon: "fa-solid fa-plug", text: "Install", href: "install.js", params: { run: true, fullscreen: true } }]
      }
    }
    return btns
  }
}
