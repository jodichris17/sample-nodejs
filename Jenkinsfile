pipeline {

    agent any
    
    stages {
    
        stage("upload") {
        
            steps {
                sh """ \
                    sshpass -p 'password' scp *.* jcj@127.0.0.1:/home/jcj/test
                """
            }
        }
        
        stage("list") {
        
            steps {
                sh """ \
                    sshpass -p 'password' ssh jcj@127.0.0.1 \
                    ls /home/jcj/test
                """
            }
        }
        
    }   
}
