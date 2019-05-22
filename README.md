# Todo List

#### react와 flask로 구현한 Todo List

- 로그인한 사용자는 TODO 목록을 작성, 조회, 수정, 삭제할 수 있다
- 개별 TODO에 마감기한을 넣고, 우선순위를 설정하고, 완료 처리를 할 수 있다

>
> 회원가입
![스크린샷, 2019-05-22 11-24-06](https://user-images.githubusercontent.com/38183218/58143129-abb7fd80-7c84-11e9-8400-aa72820d21e7.png)

> 로그인
![스크린샷, 2019-05-22 11-24-53](https://user-images.githubusercontent.com/38183218/58143130-abb7fd80-7c84-11e9-8088-a488a9a43743.png)
![스크린샷, 2019-05-22 11-25-03](https://user-images.githubusercontent.com/38183218/58143131-abb7fd80-7c84-11e9-81ca-9080ee143b9f.png)

> TODO 목록 조회
![스크린샷, 2019-05-22 11-25-21](https://user-images.githubusercontent.com/38183218/58143133-abb7fd80-7c84-11e9-8d17-6aba3bba9cd7.png)

> TODO 목록 작성
![스크린샷, 2019-05-22 11-26-16](https://user-images.githubusercontent.com/38183218/58143134-ac509400-7c84-11e9-9fbd-9b2a315c732e.png)

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
nohup python app.py runserver &
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







