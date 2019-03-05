action "publish" {
  uses = "primer/publish@master"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_AUTH_TOKEN",
  ]
}
