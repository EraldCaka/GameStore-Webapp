# 


FROM python:3.10.6

# 


WORKDIR /api

# 


COPY ./requirements.txt /api/requirements.txt

# 


RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

# 


COPY ./controllers /api/controllers

COPY ./models /api/models

COPY ./config /api/config

COPY ./operations /api/operations

COPY ./schemas /api/schemas

# 


CMD ["uvicorn", "controllers.mainController:app", "--host", "0.0.0.0", "--port", "80"]
#cd task1
#docker build -t api .  #build image
#sudo lsof -i :80 #check if port 80 is free
#docker run -d -p 80:80 api #run image of the api
#sudo kill <PID> #kill process
#docker ps #check running containers 
#docker-compose up --build -d  -> will run database of dbeaver
#docker stop 'name' -> to stop a docker container




#left join
#select max (for the task)



