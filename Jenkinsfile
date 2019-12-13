node {
  checkout scm

  def aliDockerName = 'app-draft'
  def aliDockerRegistry = 'registry.cn-beijing.aliyuncs.com/o-w-o'
  def aliDockerVpcRegistry = 'registry-vpc.cn-beijing.aliyuncs.com/o-w-o'
  def aliDockerInnerRegistry = 'registry-internal.cn-beijing.aliyuncs.com/o-w-o'

  def ioStore = [:]

  def dockerConfig = [:]
  dockerConfig.imageName = "${aliDockerVpcRegistry}/app-starter"
  dockerConfig.imageRunParams = "-u root -v /var/npm/v10/node_modules:/root/.node_modules -v /var/npm/v10/node_global_modules:/root/.node_global_modules"

  withCredentials([usernamePassword(credentialsId: 'aliNpmRegistry', passwordVariable: 'npmPw', usernameVariable: 'npmUser')]) {

    stage('Prepare') {

      docker.withRegistry("https://${aliDockerVpcRegistry}", 'aliDockerRegistry') {
        docker.image(dockerConfig.imageName).inside(dockerConfig.imageRunParams) {
          echo "1 Prepare Stage"

          echo "1.1 检验 npm 版本"
          sh "npm -v"

          echo "1.2 设置 npm 缓存地址"
          sh "npm config set prefix ~/.node_global_modules && npm config set cache ~/.node_modules"

          echo "1.3 安装 npm"
          sh "npm ci --production"

          echo '1.4 获取 项目 package.json 中的应用信息'
          ioStore.dockerArgsPort = sh(returnStdout: true, script: "node ./script/port.js").trim()

          ioStore.dockerArgsDistDir = 'app'

          ioStore.stashMark = 'src-server-build'
          ioStore.stashIncludeRegex = "**/${ioStore.dockerArgsDistDir}/*"

          ioStore.dockerTag = sh(returnStdout: true, script: "node ./script/version.js").trim().toLowerCase()

          ioStore.dockerImageName = "${aliDockerRegistry}/${aliDockerName}"
          ioStore.dockerVpcImageName = "${aliDockerVpcRegistry}/${aliDockerName}"
          ioStore.dockerImageNameWithTag = "${ioStore.dockerImageName}:${ioStore.dockerTag}"

        }
      }
    }

    stage('Prepare:Result') {
      println "【 ioStore.dockerTag 】-> ${ioStore.dockerTag}"
      println "【 ioStore.dockerImageNameWithTag 】-> ${ioStore.dockerImageNameWithTag}"
    }

    stage('Prepare:Debug') {
      if (params.ENABLE_DEBUG) {
        input("构建版本号为【 ${ioStore.dockerTag} 】, 镜像为【 ${ioStore.dockerImageNameWithTag} 】确定吗？")
      }
    }

    stage('Build') {
      docker.image(dockerConfig.imageName).inside(dockerConfig.imageRunParams) {
        echo "2 Build Docker Image Stage"

        echo '2.1 使用 npm 打包'
        sh "npm run release"

        echo "2.2 保存打包后的文件以备后续使用"
        stash(name: "${ioStore.stashMark}", includes: "${ioStore.stashIncludeRegex}")
      }
    }

    stage('Test') {
      echo '3.Test Stage'
    }

    stage('Push') {
      echo "4.Push Docker Image Stage"

      docker.withRegistry("https://${aliDockerVpcRegistry}", 'aliDockerRegistry') {
        echo "4.1 获取 打包文件"
        unstash("${ioStore.stashMark}")

        echo "4.2 预检 Workspace"
        sh "ls -al"

        if (params.ENABLE_DEBUG) {
          input("是否继续进行下一步？")
        }

        echo "4.3 构建 Image"
        ioStore.dockerImage = docker.build(ioStore.dockerImageName, "--build-arg DIST_DIR=${ioStore.dockerArgsDistDir} --build-arg PORT=${ioStore.dockerArgsPort} .")

        echo "4.4 发布 Image"
        ioStore.dockerImage.push("${ioStore.dockerTag}")
      }
    }
    stage('Deploy') {
      echo "5. Deploy Stage"

      withCredentials([sshUserPrivateKey(credentialsId: 'sshKey', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'username')]) {
        def remote = [:]
        remote.name = "o-w-o"
        remote.host = "o-w-o.ink"
        remote.allowAnyHosts = true
        remote.user = username
        remote.identityFile = identity

        try {
          sshCommand remote: remote, command: "docker stop ${aliDockerName}"
          sshCommand remote: remote, command: "docker rm ${aliDockerName}"
        } catch (e) {
          echo "部署预处理异常 -> ${e.message}"
          input("部署预处理出现异常，确认继续执行 【${ioStore.dockerImageNameWithTag}】 部署行为？")
        } finally {
          echo "${ioStore.dockerImageNameWithTag}"
        }

        try {
          sshCommand remote: remote, command: "docker pull ${ioStore.dockerImageNameWithTag}"
          sshCommand remote: remote, command: "docker run -i -d --net=host --name=${aliDockerName}' ${ioStore.dockerImageNameWithTag}"
        } catch (e) {
          echo "部署异常 -> ${e.message}"
        } finally {
          echo "部署检测"
          sshCommand remote: remote, command: "docker ps"
        }
      }
    }
  }

}
