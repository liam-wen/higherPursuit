pipeline {
    agent any
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh ''
            }
        }
        stage('Deliver') { 
            steps {
                sh '''
                    rm -rf /home/nginx/www/hobbies-cms/*
                    mv ./dist/* /home/nginx/www/hobbies-cms
                '''  
            }
        }
    }
}