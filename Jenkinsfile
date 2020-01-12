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

  appImage.dockerArgsPort = "8084"
  appImage.dockerArgsDistDir = 'app'

  appImage.stashMark = "${appImage.imageName}-${appImage.dockerRegistry}"
  appImage.stashIncludeRegex = "**/${appImage.dockerArgsDistDir}/*"


  stage('初始化') {

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

        appImage.dockerImageNameUseNormal = "${aliDockerRegistry}/${appImage.imageName}"
        appImage.dockerImageNameUseVpc = "${aliDockerVpcRegistry}/${appImage.imageName}"
        appImage.dockerImageNameUseInner = "${aliDockerInnerRegistry}/${appImage.imageName}"

        appImage.dockerImageName = "${appImage.dockerImageNameUseVpc}"
        appImage.dockerImageNameWithTag = "${appImage.dockerImageName}:${appImage.dockerTag}"
      }
    }
  }

  stage('Prepare:Debug') {
    if (params.ENABLE_DEBUG) {
      input("构建版本号为【 ${appImage.dockerTag} 】, 镜像为【 ${appImage.dockerImageNameWithTag} 】确定吗？")
    }
  }

  stage('Build') {
    docker.image(appBuilderContainer.imageName).inside(appBuilderContainer.imageRunParams) {
      echo "2 Build Docker Image Stage"

      echo '2.1 使用 npm 打包'
      sh "npm run release"

      echo "2.2 保存打包后的文件以备后续使用"
      stash(name: "${appImage.stashMark}", includes: "${appImage.stashIncludeRegex}")
    }
  }

  stage('Test') {
    echo '3.Test Stage'
  }

  stage('Push') {
    echo "4.Push Docker Image Stage"

    docker.withRegistry("https://${aliDockerVpcRegistry}", 'aliDockerRegistry') {
      echo "4.1 获取 打包文件"
      unstash("${appImage.stashMark}")

      echo "4.2 预检 Workspace"
      sh "ls -al"

      if (params.ENABLE_DEBUG) {
        input("是否继续进行下一步？")
      }

      echo "4.3 构建 Image"
      appImage.dockerImage = docker.build(appImage.dockerImageName, "--build-arg DIST_DIR=${appImage.dockerArgsDistDir} --build-arg PORT=${appImage.dockerArgsPort} .")

      echo "4.4 发布 Image"
      appImage.dockerImage.push()
      appImage.dockerImage.push("${appImage.dockerTag}")
    }
  }
  stage('Deploy') {
    echo "5. Deploy Stage"

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
        echo "部署预处理异常 -> ${e.message}"
        input("部署预处理出现异常，确认继续执行 【${appImage.dockerImageNameWithTag}】 部署行为？")
      } finally {
        echo "${appImage.dockerImageNameWithTag}"
      }

      try {
        sshCommand remote: remote, command: "docker pull ${appImage.dockerImageNameWithTag}"
        sshCommand remote: remote, command: "docker run -i -d --net=host --name=${appImage.imageName} ${appImage.dockerImageNameWithTag}"
      } catch (e) {
        echo "部署异常 -> ${e.message}"
      } finally {
        echo "部署检测"
        sshCommand remote: remote, command: "docker ps"
      }
    }
  }
}


