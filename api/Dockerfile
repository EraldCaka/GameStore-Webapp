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

COPY ./controllers/user /api/controllers/user

COPY ./controllers/validation /api/controllers/validation

COPY ./models/userdir /api/models/userdir

COPY ./operations/userdir /api/operations/userdir

COPY ./schemas/userdir /api/schemas/userdir

COPY ./operations/validationdir /api/operations/validationdir


# 


CMD ["uvicorn", "controllers.mainController:app", "--host", "0.0.0.0", "--port", "80"]
