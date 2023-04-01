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
