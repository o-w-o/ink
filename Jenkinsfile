def notify(args) {
  def type = args.type
  def payload = args.payload
  def errorType = args.errorType
  def errorMessage = args.errorMessage

  def statusText = ''
  def summaryItems = []
  def mode = 0

  def gTpl = { slot ->
    return """
      <html>
        <body>
          <style> .Box { background-color: #fff; border: 1px solid #d1d5da; border-radius: 3px } .Box-header { padding: 16px; margin: -1px -1px 0 -1px; background-color: #f6f8fa; border-color: #d1d5da; border-style: solid; border-width: 1px; border-top-left-radius: 3px; border-top-right-radius: 3px } .Box-title { font-size: 14px; font-weight: 600 } .Box-body { padding: 16px; border-bottom: 1px solid #e1e4e8 } .Box-body:last-of-type { margin-bottom: -1px; border-bottom-right-radius: 2px; border-bottom-left-radius: 2px } .Box-row { padding: 16px; margin-top: -1px; list-style-type: none; border-top: 1px solid #e1e4e8 } .Box-row:first-of-type { border-top-color: transparent; border-top-left-radius: 2px; border-top-right-radius: 2px } .Box-row:last-of-type { border-bottom-right-radius: 2px; border-bottom-left-radius: 2px } .Box-row.Box-row--unread,    .Box-row.unread { box-shadow: 2px 0 0 #0366d6 inset } .Box-footer { padding: 16px; margin-top: -1px; border-top: 1px solid #e1e4e8 } .Box--scrollable { max-height: 324px; overflow: scroll } .Box--danger { border-color: #d73a49 } .Box--danger .Box-row:first-of-type { border-color: #d73a49 } .Box--danger .Box-body:last-of-type { border-color: #d73a49 } .Box-row--blue { background-color: #dbedff; color: #032f62 } .Box-row--red { background-color: #ffdce0; color: #86181d } .Box-row--orange { background-color: #735c0f; color: #fffbdd } .Box-row--green { background-color: #165c26; color: #dcffe4 } .Box-row--gray { background-color: #f6f8fa }</style>
          <p>
            系统邮件请勿回复。
          </p>

          ${slot}
        </body>
        </html>
      """
  }

  def gSlot = { rows ->
    def rowText = ''
    def rowMode = 1

    for (row in rows) {
      switch (row.type) {
        case "error":
          rowMode = -1
          rowText += "<div class='Box-row Box-row--red'> ${row.content} </div>"
          break
        case "info":
          rowText += "<div class='Box-row Box-row--blue'> ${row.content} </div>"
          break
        case "success":
          rowText += "<div class='Box-row Box-row--green'> ${row.content} </div>"
          break
        case "warn":
          rowText += "<div class='Box-row Box-row--orange'> ${row.content} </div>"
          break
        default:
          rowText += "<div class='Box-row'> ${row.content} </div>"
      }
    }

    return """
            <div class="Box ${rowMode == -1 ? 'Box--danger' : ''}">
              <div class="Box-header">
                <h3 class="Box-title">
                  摘要
                </h3>
              </div>
              <div class="Box-body">
                构建信息：${currentBuild.fullDisplayName}
              </div>
              ${rowText}
              <div class="Box-footer">
                <a href="${env.RUN_DISPLAY_URL}">前往查看构建详情</a>
              </div>
            </div>
          """
  }

  summaryItems.push([content: "分支: ${env.BRANCH_NAME}"])

  switch (type) {
    case 'pre':
      statusText = '构建开始'
      mode = 1
      break

    case 'post':
      statusText = '构建结束'
      mode = 1
      break

    case 'error':
      summaryItems.push([type: 'error', content: "异常信息：${errorMessage}"])

      switch (errorType) {
        case 'deploy:pre':
          statusText = '部署预处理异常'
          break

        case 'deploy':
          statusText = '部署异常'
          break

        default:
          statusText = "未知错误异常[${errorType}]"
      }


      break

    default:
      statusText = "未知状态[${type}]"
  }

  if (payload != null) {
    summaryItems.push([type: 'info', content: "摘要：${payload}"])
  }

  mail(
      mimeType: 'text/html',
      to: 'postmaster@o-w-o.ink',
      subject: "${statusText} [ ${currentBuild.fullDisplayName} ]",
      body: "${gTpl.call(gSlot.call(summaryItems))}"
  )
}

def notifyJira(args) {
  def type = args.type
  def envType = args.envType
  def jiraSite = 'o-w-o.atlassian.net'
  def gitBranch = "${env.BRANCH_NAME}"

  switch (type) {
    case 'build':
      jiraSendBuildInfo(
          branch: gitBranch,
          site: jiraSite
      )
      break;
    case 'deploy':
      switch (envType) {
        case 'development':
        case 'testing':
        case 'stagging':
        case 'production':
          jiraSendDeploymentInfo(
              environmentId: "${envType}-${gitBranch}-${env.BUILD_NUMBER}",
              environmentName: '开发环境',
              environmentType: envType,
              site: jiraSite
          )
          break
      }
      break;
  }
}

properties([
    [$class: 'GithubProjectProperty', displayName: 'INK', projectUrlStr: 'https://github.com/o-w-o/ink-draft/'],
    buildDiscarder(logRotator(daysToKeepStr: '3', numToKeepStr: '3')),
    pipelineTriggers([
        githubBranches(cancelQueued: true, events: [branchCreated(), commit([])], preStatus: true, skipFirstRun: true, spec: 'H/5 * * * *', triggerMode: 'HEAVY_HOOKS'),
        githubPullRequests(abortRunning: true, branchRestriction: [targetBranch: '''draft master'''], cancelQueued: true, events: [Open()], preStatus: true, skipFirstRun: true, spec: 'H/3 * * * *', triggerMode: 'HEAVY_HOOKS'),
        githubPush()
    ])
])

node {
  checkout scm

  def aliDockerRegistry = 'registry.cn-beijing.aliyuncs.com/o-w-o'
  def aliDockerVpcRegistry = 'registry-vpc.cn-beijing.aliyuncs.com/o-w-o'
  def aliDockerInnerRegistry = 'registry-internal.cn-beijing.aliyuncs.com/o-w-o'

  def appBuilderContainer = [:]
  appBuilderContainer.dockerRegistryCredentialId = "aliDockerRegistry"
  appBuilderContainer.dockerRegistry = "https://${aliDockerVpcRegistry}"

  appBuilderContainer.imageName = "${aliDockerVpcRegistry}/app-builder"
  appBuilderContainer.imageRunParams = """-u root \
    -v /var/npm/v10/node_global_modules:/root/.node_global_modules \
    -v /var/npm/v10/node_modules:/root/.node_modules
  """

  def appImage = [:]
  appImage.imageName = 'app-draft'

  appImage.dockerRegistry = "${aliDockerVpcRegistry}"

  appImage.dockerImageNameUseNormal = "${aliDockerRegistry}/${appImage.imageName}"
  appImage.dockerImageNameUseVpc = "${aliDockerVpcRegistry}/${appImage.imageName}"
  appImage.dockerImageNameUseInner = "${aliDockerInnerRegistry}/${appImage.imageName}"
  appImage.dockerImageName = "${appImage.dockerImageNameUseVpc}"

  appImage.dockerArgsPort = "8084"
  appImage.dockerArgsDistDir = 'dist'

  appImage.stashMark = "${appImage.imageName}--stash-mark"
  appImage.stashIncludeRegex = "**/${appImage.dockerArgsDistDir}/*"


  stage('notify:pre') {
    notify(type: 'pre')
    notifyJira(type: 'build')
  }

  stage('setup:global') {
    docker.withRegistry(appBuilderContainer.dockerRegistry, appBuilderContainer.dockerRegistryCredentialId) {
      docker.image(appBuilderContainer.imageName).inside(appBuilderContainer.imageRunParams) {
        echo "1 初始化全局配置"
        sh "printenv"

        echo "1.1 检验 npm 版本"
        sh "npm -v"

        echo "1.2 设置 npm 国内安装源"
        sh "npm config set registry https://registry.npm.taobao.org"

        echo "1.3 设置 npm 缓存地址"
        sh "npm config set prefix ~/.node_global_modules && npm config set cache ~/.node_modules"

        echo "1.4 安装 npm"
        sh "npm ci --production"

        echo '1.5 获取 项目 package.json 中的应用信息'
        appImage.dockerArgsPort = sh(returnStdout: true, script: "node ./script/port.js").trim()
        appImage.dockerTag = sh(returnStdout: true, script: "node ./script/version.js").trim().toLowerCase()

        appImage.dockerImageNameWithTag = "${appImage.dockerImageName}:${appImage.dockerTag}"
      }
    }
  }

  stage('setup:debug') {
    if (env.BRANCH_NAME != 'master') {
      echo """debug:
              构建版本号为 [${appImage.dockerTag}], 
              镜像为[${appImage.dockerImageNameWithTag}]
           """
    }
  }

  stage('test') {
    echo 'Hi !'
  }

  stage('build:dist') {
    docker.image(appBuilderContainer.imageName).inside(appBuilderContainer.imageRunParams) {
      echo "2 Build Docker Image Stage"

      echo '2.1 使用 npm 打包'
      sh "npm run release"

      echo "2.2 保存打包后的文件以备后续使用"
      stash(name: "${appImage.stashMark}", includes: "${appImage.stashIncludeRegex}")
    }
  }

  stage('build:docker') {
    docker.withRegistry(appBuilderContainer.dockerRegistry, appBuilderContainer.dockerRegistryCredentialId) {
      echo "1.1 获取 打包文件"
      unstash("${appImage.stashMark}")

      echo "1.2 预检 Workspace"
      sh "ls -al"

      echo "1.3 构建 Image"
      appImage.dockerImage = docker.build(appImage.dockerImageName, "--build-arg DIST_DIR=${appImage.dockerArgsDistDir} --build-arg PORT=${appImage.dockerArgsPort} .")

      echo "1.4 发布 Image"
      appImage.dockerImage.push()
      appImage.dockerImage.push("${appImage.dockerTag}")
    }
  }

  stage('deploy') {
    withCredentials([sshUserPrivateKey(credentialsId: 'aliInkEcs', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'username')]) {
      def remote = [:]
      remote.name = "o-w-o"
      remote.host = "draft.o-w-o.ink"
      remote.allowAnyHosts = true
      remote.user = username
      remote.identityFile = identity

      try {
        sshCommand remote: remote, command: "docker stop ${appImage.imageName}"
        sshCommand remote: remote, command: "docker rm ${appImage.imageName}"
      } catch (e) {
        notify(type: 'error', errorType: 'deploy:pre', errorMessage: "${e.message}")

        input("部署预处理出现异常，确认继续执行 【${appImage.dockerImageNameWithTag}】 部署行为？")
      } finally {
        echo "${appImage.dockerImageNameWithTag}"
      }

      try {
        sshCommand remote: remote, command: "docker pull ${appImage.dockerImageNameWithTag}"
        sshCommand remote: remote, command: "docker run -i -d --net=host --name=${appImage.imageName} ${appImage.dockerImageNameWithTag}"
      } catch (e) {
        notify(type: 'error', errorType: 'deploy', errorMessage: "${e.message}")
      } finally {
        echo "部署检测"
        sshCommand remote: remote, command: "docker ps"
      }
    }
  }

  stage('notify:post') {
    notify(
        type: 'post',
        payload: """
        <li>docker：${appImage.dockerImageNameWithTag}<li>
      """
    )

    notifyJira(type: 'deploy', envType: 'development')
  }
}


