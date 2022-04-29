#build image with tag sample-nodejs

docker build -t sample-nodejs .

#run docker-compose

docker-compose up -d

#test docker app

curl localhost
