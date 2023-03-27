pipeline {
  agent any
  stages {
    stage('Git Pull') {
      steps {
        git(credentialsId: 'e39944bd-4ff3-4755-a758-2b23ac136fc6', branch: 'main', url: "git@github.com:Fendy5/${env.ItemName}.git")
      }
    }

//    stage('Pre Build') {
//      steps {
//        sh 'rm -rf /www/wwwroot/${ItemName}.fendy5.cn/*'
//        sh 'mv ./* /www/wwwroot/${ItemName}.fendy5.cn/'
//      }
//    }

    stage('Build') {
      steps {
//        nodejs(nodeJSInstallationName: 'NodeJS 14.19.3') {
//          sh 'node -v'
//          sh 'yarn install'
//          sh 'yarn build'
//        }
            sh 'node -v'
            sh 'yarn install'
            sh 'yarn build'
      }
    }

    stage('Deploy') {
      steps {
//        nodejs(nodeJSInstallationName: 'NodeJS 14.19.3') {
//          sh 'node -v'
//          sh 'pm2 start yarn --name nav -- start'
//          sh 'pm2 save'
//          sh 'pm2 start yarn --name nav -- start'
          sh 'pm2 restart nav'
          sh 'pm2 save'
//        }
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
