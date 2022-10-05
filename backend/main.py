import requests


def is_ok(status: int) -> bool:
    return status >= 200 and status < 300


class TaskRequest:
    def create_task():
        url = "http://localhost:8080/tasks"

        payload = {
            "title": "My first task",
            "description": "This is a description of my first task",
            "completed": False,
        }

        res = requests.post(url, json=payload)

        print(res.status_code)

        if is_ok(res.status_code):
            print(res.json())

    def get_tasks():
        url = "http://localhost:8080/tasks"

        res = requests.get(url)

        print(res.status_code)

        if is_ok(res.status_code):
            print(res.json())

    def get_task():
        url = "http://localhost:8080/tasks/1"

        res = requests.get(url)

        print(res.status_code)

        if is_ok(res.status_code):
            print(res.json())


TaskRequest.get_task()
TaskRequest.get_tasks()
# create_task()
