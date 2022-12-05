pipeline {

    agent any
    
    stages {
    
        stage("build") {
        
            steps {
                sh """ \
                    sshpass -p 'password' scp *.* jcj@127.0.0.1:/home/jcj/test
                """
            }
        }
        
        stage("test") {
        
            steps {
                echo 'testing the application...'
            }
        }
        
        stage("deploy") {
        
            steps {
                echo 'deplying the application...'
            }
        }
    }   
}
