# Todo List
---------------------------------------------

## 환경 설정 및 빌드
```
sudo apt-get update

sudo apt-get upgrade
```

### python

```
sudo apt-get install python3-pip

pip3 install virtualenv

```


### npm
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -

sudo apt-get install -y nodejs

sudo npm cache clean -f 
sudo npm install -g n 
sudo n stable
```

<!-- sudo curl -L https://npmjs.org/install.sh | sh
sudo npm update -g npm -->

### 설정
```
git clone https://github.com/chankoo/react-flask-todo.git

cd react-flask-todo/backend

virtualenv venv

source venv/bin/activate

pip3 install -r requirements.txt

nohup python app.py

ctrl+z

bg

ps -aux|grep app.py

cd ~/react-flask-todo/react-todo

sudo npm install production

sudo npm run build

npm install -g serve

sudo serve -s build

```

### 테스트

http://54.180.88.196:3000







