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
                sshpass -p 'password' ssh jcj@127.0.0.1 \
                ls /home/jcj/test
            }
        }
        
        stage("deploy") {
        
            steps {
                echo 'deplying the application...'
            }
        }
    }   
}
