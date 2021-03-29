FROM amazon/aws-lambda-nodejs:14.2021.03.22.18

LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-03-26.000

# copy and install 3rd party dependencies
COPY package*.json ./
RUN npm ci --production

# copy the source code of our app
COPY app/src/ .

# start the program
CMD ["main.lambdaHandler"]
