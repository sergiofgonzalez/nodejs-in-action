# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 7: AWS Lambda
#### 03 &mdash; Lambda function: Website health check packaged as a Docker container
> container for a simple Node.js app that is packaged as a Docker container using a supported Node.js runtime (14.x) using an Amazon base image.

This is the working directory for a container running **Node.js 14.2021.03.22.18** image from *AWS*.

The application can be found in the [website-health-check/](./website-health-check/) directory. The application does not expose any ports or use any kind of volume mapping.

## Build instructions
> This section assumes you have followed the [Post-installation steps for Linux](https://docs.docker.com/engine/install/linux-postinstall/) so that you can run `docker` commands without prefixing them with `sudo`.

First make sure that you're in the container *working dir*, that is, your current directory should be the same directory where the `Dockerfile` is found.

Then type:

```bash
docker build -t="sergiofgonzalez/lambda-health-check:v1" .
```

| NOTE: |
| :---- |
| Please note the period `.` at the end of the `docker build` command. |

## Run instructions
First, make sure your're in the container *working directory* (that is, you should be in the same directory where `Dockerfile` is found).

Then type:

```bash
docker run \
-d \
--name lambda-health-check \
sergiofgonzalez/lambda-health-check:v1
```

To open an interactive session in the container while it is running do(e.g. for inspection purposes):

```bash
docker exec -i -t lambda-health-check /bin/bash
```
| NOTE: |
| :---- |
| The Node.js application can be found in the `/app` directory within the running container. |

If you want to create a new container and inspect it before it runs anything do:
```bash
docker run -i -t --name lambda-health-check sergiofgonzalez/lambda-health-check:v1 /bin/bash
```

## Tagging and Pushing to AWS ECR

Create a repository on *AWS ECR* named `awsia/lambda-health-check`.

Then tag your image:

```bash
docker tag \
sergiofgonzalez/lambda-health-check:v1 \
<your-account-id>.dkr.ecr.us-east-1.amazonaws.com/awsia/lambda-health-check:v1
```


Then you need to authenticate on *ECR*:

```bash
aws --profile awsia \
ecr get-login-password --region us-east-1 \
| docker login \
--username AWS \
--password-stdin \
<your-account-id>.dkr.ecr.us-east-1.amazonaws.com
```

Finally, you just need to push the image:

```bash
docker push \
<your-account-id>.dkr.ecr.us-east-1.amazonaws.com/awsia/lambda-health-check:v1
```
