# 09 &mdash; *Amazon SageMaker* Concepts
> a few concepts on *Amazon SageMaker*

This is a summary of the relevant info of https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html.

## Intro to *Amazon SageMaker*

*Amazon SageMaker* is a fully managed ML service. With SageMaker, data scientists and developers can quickly and easily build and train ML models, and then directly deploy them into a production-ready hosted environment.

The service comes with an integrated Jupyter authoring noteboook instance for easy access to your data source for exploration and analysis, so you don't have to manage any servers.

It also provides a runtime that is optimized to run efficiently against large datasets in a distributed environments, and supports custom algorithms and frameworks to adapt to specific workflows.

Finally, it offers a way to deploy a model securely and in a scalable way from *SageMaker Studio* or the *SageMaker console*.

The pricins is billed by minutes of usage, with no minimum fees and no upfront costs.

## *Amazon SageMaker* features and components

| Feature | Description |
| :------ | :---------- |
| SageMaker Studio | An integrated ML environment where you can build, train, deploy, and analyze your models all in the same application. |
| SageMaker Model Registry | Model management features for versioning, artifact and lineage tracking, approval workflows, and cross-account support for deployment of models. |
| SageMaker Projects | end-to-end ML solutions with CI/CD. |
| SageMaker Model Building Pipelines | Creation and Management of ML pipelines with SageMaker jobs. |
| SageMaker ML Lineage Tracking | Tracking of ML workflows lineage. |
| SageMaker Data Wrangler | Import, analyze, prepare, and featurize data in *SageMaker Studio*. It is uses to simplify and streamline data pre-processing and feature engineering using little to no coding. It also supports using your own Python scripts and transformations. |
| *SageMaker Feature Store* | A centralized store for features and associated metadata so that they can be easily discovered and reused. |
| *SageMaker JumpStart* | 1-click solutions to learn about *SageMaker* features and capabilities. |
| *SageMaker Clarify* | Used to detect potential bias and explain the predictions that models make. |
| *SageMaker Edge Manager* | Optimize custom models for edge devices. |
| *SageMaker Ground Truth* | Provides high-quiality training datasets by using workers along with ML to create labeled datasets. |
| *Amazon Augmented AI* | Build workflows required for human review of ML predictions. |
| *SageMaker Studio Notebooks* | Next-gen *SageMaker* notebooks with AWS SSO integration, faster start-up times, and single-click sharing. |
| *SageMaker Experiments* | Experiment management and tracking. |
| *SageMaker Debugger* | Helps you by inspecting training parameters and data and alerting you of common errors. |
| *SageMaker Autopilot* | To enable users without ML knowledge to quickly build classification and regression models. |
| *SageMaker Model Monitor* | Monitor and analyze models in prod (endpoints) to detect data drift and deviations in model quality. |
| *SageMaker Neo* | Tool to train ML models in one place and then run them anywhere in the cloud or at the edge. |
| *SageMaker Elastic Inference* | Optimization of real-time inferences. |
| *Reinforcement Learning* | Maximizes long-term reward an agent receives as a result of its actions. |
| *Preprocessing* | Analyzes and preprocesses data, tackle feature engineering, and evaluate models. |
| *Batch Transform* | Preprocess datasets, run inference when you don't need a persistent endpoint, and associate input records with inferences to assist interpretation of results. |

## Basics of *Amazon SageMaker*

This section gives an overview of the basics of *Amazon SageMaker*.

### ML with *Amazon SageMaker*

When doing ML, you *teach* a computer to make predictions, or inferences.

You first use al algorithm and example data to train a model. Then you integrate the model into your application to generate inferences in real time and at a scale. In a production environment, a model typically learns from millions of example data items and produces inferences in milliseconds.

The typical workflow for ML process does not change in *Amazon SageMaker*
![Typical ML workflow](https://docs.aws.amazon.com/sagemaker/latest/dg/images/ml-concepts-10.png)

However, you need to know what are the *SageMaker* features that would help you in each of the steps:

1. Generate example data &mdash; When using *SageMaker*, you preprocess example data in a Jupyter notebook on your notebook instance.

2. Train a model &mdash; *SageMaker* provides a list of built-in algorithms you might consider for training, as they will help you get a quick, out-of-the-box solution. You also will need to provision compute resources for training. You can use general-purpose instances or a distributed cluster of GPU instances. For model evaluation (once the model has been trained), you will use either the *AWS SDK for Python (`boto3`)*, or the high-level Python library that *SageMaker* provides to send requests to the model for inferences. In any case, Jupyter notebooks in your *SageMaker notebook instance* will be used for training and evaluation.

3. Deploy the model &mdash; You traditionally re-engineer a model before you integrate it with your application and deploy it. You will use *SageMaker hosting services* to deploy your model independently, decoupling it from your application code.


#### Model Deployment Concepts in *Amazon SageMaker*

After a model has been trained, you can deploy it using *Amazon SageMaker* to get predictions in different ways:
+ Set up a persistent endpoint to get one prediction at a time, using *SageMaker hosting services*.
+ Get predictions for an entire dataset using *SageMaker batch transform*.

When using the *SageMaker hosting services*, *SageMaker* will provide an HTTPS endpoint where your ML model will be available to provide inferences.

Deploying a model using *SageMaker hosting services* is a 3-step process:

1. Create a model in *SageMaker* &mdash; By creating a model, you tell *SageMaker* where it can find the model components. This includes the *S3 path* where the model artifacts are stored and the *Docker registry path* for the image that contains the inference code. In subsequent deployment steps you will just use the model name.

2. Create an endpoint configuration for an HTTPS endpoint &mdash; you specify the name of one or more models in production variants and the ML compute instances that you want *SageMaker* to launch to host each production variant. You will be able to configure the endpoint to scale.

3. Create an HTTPS endpoint &mdash; the service will launch the ML compute instances and deploy the model as configured. To get inferences from the model, client applications send requests to the *SageMaker runtime HTTP endpoint*.

| NOTE: |
| :---- |
| *SageMaker Endpoints* are scoped to an individual AWS accounts, and are not public. In order to call from a client application tht is not within the scope of your account, you will need to use something like an *API Gateway* and *AWS Lambda*. |

## Setting up *Amazon SageMaker*

First you need to follow the *Amazon SageMaker Studio* onboarding.

That might include creating a *SageMaker user* and/or *IAM role*. Once created, you will be able to open the SageMaker studio under your name.

### Additional detailed information

For more information on the specific steps see:

+ [Explore, Analyze, and Process Data](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-notebooks-instances.html)

+ [Train a Model with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-training.html)

+ [Deploy a Model in Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-deployment.html)

+ [Use ML frameworks, Python, and R with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/frameworks.html)

+ [Get Started with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/gs.html)