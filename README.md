# Todo List

#### react와 flask로 구현한 Todo List

- 로그인한 사용자는 TODO 목록을 작성, 조회, 수정, 삭제할 수 있다
- 개별 TODO에 마감기한을 넣고, 우선순위를 설정하고, 완료 처리를 할 수 있다


## 환경 설정 및 빌드
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

### 설정
```
git clone https://github.com/chankoo/react-flask-todo.git
cd react-flask-todo/backend
virtualenv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

```
nohup python app.py runserver
"ctrl + z"
bg
```

```
cd ~/react-flask-todo/react-todo
sudo npm install production
sudo npm start
```

<!-- sudo npm run build
sudo npm install -g serve
sudo serve -s build -->

### 실행

http://localhost:3000/

## 테스트

http://54.180.88.196:3000







