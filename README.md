# Todo List

#### react와 flask로 구현한 Todo List

- 로그인한 사용자는 TODO 목록을 작성, 조회, 수정, 삭제할 수 있다
- 개별 TODO에 마감기한을 넣고, 우선순위를 설정하고, 완료 처리를 할 수 있다

---------------------
## Architecture

![arch](https://user-images.githubusercontent.com/38183218/58406685-1c0bb800-80a5-11e9-9462-fb39cdf7d9ea.png)

-----------
## UI

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


-------------------------------------
## 환경 설정 및 빌드
### npm 설치
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

### 빌드
```sh
git clone https://github.com/chankoo/react-flask-todo.git

cd ./react-flask-todo/react-todo
sudo npm install production
sudo npm run build
sudo npm install -g serve
sudo serve -s build
```

### 실행

http://localhost:5000/

### 백엔드 빌드 참고
[docker-compose를 이용한 nginx_flask 어플리케이션](https://github.com/chankoo/TIL/blob/master/general/dockerizing_nginx_uwsgi_flask.md)
