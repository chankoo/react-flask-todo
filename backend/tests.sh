# api test
curl -X POST -H "Content-Type: application/json" -d '{"id": 0, "title": "Hello", "content":"Hi"}' "0.0.0.0:5000/"
curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "title": "Bye", "content":"!!"}' "0.0.0.0:5000/"
curl "0.0.0.0:5000/"

curl -X PUT -H "Content-Type: application/json" -d '{"id": 1, "title": "Bye~~", "content": "???"}' "0.0.0.0:5000/"
curl "0.0.0.0:5000/"

curl -X DELETE -H "Content-Type: application/json" -d '{"id": 1}' "0.0.0.0:5000/"
curl "0.0.0.0:5000/"
