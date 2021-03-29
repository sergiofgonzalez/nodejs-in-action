FROM amazon/aws-lambda-nodejs:14.2021.03.22.18

ARG APP_PATH=lambda-health-check
LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-03-29.000

# copy and install 3rd party dependencies
COPY ${APP_PATH}/package*.json ./
RUN npm ci --production

# copy the source code of our app
COPY ${APP_PATH}/app/src/ .

# start the program
CMD ["main.lambdaHandler"]
