FROM python:3.6
ENV PYTHONUNBUFFERED 1
WORKDIR /code/

RUN apt-get update -qq && apt-get install -yqq curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -yqq nodejs npm
RUN apt-get clean -y

COPY requirements.txt /code/
RUN pip install -r requirements.txt

WORKDIR /code/frontend/
COPY frontend/package.json /code/frontend/
RUN npm install

WORKDIR /code/
COPY . /code/
RUN mkdir -p logs
RUN make db

WORKDIR /code/frontend/
RUN npm run build

WORKDIR /code/