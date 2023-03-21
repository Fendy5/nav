pipeline {
  agent any
  stages {
    stage('Git Pull') {
      steps {
        git(credentialsId: 'e39944bd-4ff3-4755-a758-2b23ac136fc6', branch: 'main', url: "git@github.com:Fendy5/${env.ItemName}.git")
      }
    }

    stage('Build') {
      steps {
        nodejs(nodeJSInstallationName: 'NodeJS 14.19.3') {
          sh 'node -v'
          sh 'yarn install'
          sh 'yarn build'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'rm -rf /www/wwwroot/${ItemName}.fendy5.cn/.next'
        sh 'mv ./.next /www/wwwroot/${ItemName}.fendy5.cn'
        sh 'cd /www/wwwroot/${ItemName}.fendy5.cn/.next'
        sh 'yarn start'
      }
    }

  }
  environment {
    ItemName = 'nav'
  }
  options {
    skipDefaultCheckout(true)
  }
}
