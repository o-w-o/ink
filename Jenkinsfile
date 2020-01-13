node {
  checkout scm

  def aliDockerRegistry = 'registry.cn-beijing.aliyuncs.com/o-w-o'
  def aliDockerVpcRegistry = 'registry-vpc.cn-beijing.aliyuncs.com/o-w-o'
  def aliDockerInnerRegistry = 'registry-internal.cn-beijing.aliyuncs.com/o-w-o'

  def appBuilderContainer = [:]
  appBuilderContainer.dockerRegistryCredentialId = "aliDockerRegistry"
  appBuilderContainer.dockerRegistry = "https://${aliDockerVpcRegistry}"

  appBuilderContainer.imageName = "${aliDockerVpcRegistry}/app-starter"
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

  def notify(args) {
    def type = args.type
    def payload =  args.payload
    def errorType =  args.errorType
    def errorMessage =  args.errorMessage

    def statusText = ''
    def mode = 0

    switch(type) {
      case 'pre':
        statusText = '构建开始'
        mode = 1
        break

      case 'post': 
        statusText = '构建结束'
        mode = 1
        break

      case 'error': 
        mode = -1

        switch(errorType) {
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

    mail( 
      mimeType: 'text/html',
      to: 'postmaster@o-w-o.ink',
      subject: "${statusText} [ ${currentBuild.fullDisplayName} ]",
      body: """
      <html>
      <body>
        <p>
          系统邮件请勿回复。
        </p>

        <ul>
          <strong>摘要：</strong>
          <li>构建信息: ${currentBuild.fullDisplayName}</li>
          <li>分支: ${env.BRANCH_NAME}</li>
          <li>载荷: ${args} </li>
        </ul>

        ${mode != null ? "<hr><ul><strong style='color:red'>错误摘要：</strong>${errorMessage}</ul>" : ''}

        ${payload != null ? "<hr><ul><strong>其它摘要：</strong>${payload}</ul>" : ''}

        <a href="${env.RUN_DISPLAY_URL}">前往查看构建详情</a> 。
      </body>
      </html>
      """
    )
  }


  stage('notify:pre') {
    notify(type: 'pre')
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
    if(env.BRANCH_NAME != 'master'){
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
}


