# Chapter 19 &mdash; Interacting with Amazon Web Services
## Section 1: Intro to AWS
> basic concepts about AWS and the cloud

### Summary
+ Overview of AWS
+ Cloud: types and service categorization
+ Benefits of AWS

### Intro
*Amazon Web Services (AWS)* is a platform of web services that offers solutions for computing, storing, and networking at different levels of abstraction. These web services are available through the public internet using standard protocols such as HTTP.

In more general terms, AWS is known as a public cloud computing platform:
> Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (such as networks, vms, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction.

Clouds can be classified as:
+ *public* &mdash; a cloud managed by an organization and open to use by the general public
+ *private* &mdash; a cloud that virtualizes and distributes the IT infrastructure for a single organization
+ *hybrid* &mdash; a mixture of a public and private cloud

The cloud computing services can be classified according to the level of abstraction they provide:
+ *IaaS* &mdash; provides fundamental resources like computing, storage, and networking capabilities.
+ *PaaS* &mdash; provides platforms on which you can deploy custom applications to the cloud.
+ *SaaS* &mdash; combines infrastructure and software running in the cloud.

### Benefits of AWS

+ Innovative and fast-growing platform
+ Wide range of services that solve common problems
+ Automation baked into the platform
+ Scalability and reliability
+ Reduced time to market
+ Economies of scale
+ Huge global infrastructure
+ Pay-per-use

### Ways to interact with AWS

The following diagram depicts the different ways you can use to interact with AWS:

![Ways to interact with AWS](images/ways_to_access_aws.png)


### AWS global infrastructure: *Regions* and *Availability Zones*

AWS Cloud infrastructure is built around *AWS Regions* and *Availability Zones*.

> An *AWS Region* is a physical location in the world where AWS have multiple *Availability Zones*. Each *AWS Region* is designed to be completely isolated from other *AWS Regions*.

> An *Availability Zone* consists of one or more concrete discrete data centers, each with redundant power, networking, and connectivity, housed in separate facilities. Each *Availability Zone* is designed as an independent failure zone: each *Availability Zone* is isolated, but the *Availability Zones* within a *AWS Region* are connected through low-latency links.

There are over 60 *Availability Zones* in more than 20 *AWS Regions* around the world.


### You know you've mastered this section when...

+ You are comfortable describing AWS as a public cloud
+ You understand the different types of clouds and their service categorization according to the abstraction level they provide
+ You understand the benefits of using AWS (or any cloud provider for that matter)
+ You are aware of the different options available to access and interact with AWS
+ You can define the terms *AWS Region* and *Availability Zone*.

### Glossary

| Term         | Description |
| :----------- | :---------- |
| *Amazon Web Services* | *Amazon Web Services (AWS)* is a platform of web services that offers solutions for computing, storing, and networking at different levels of abstraction.<br>These web services are available through the public internet using standard protocols such as HTTP. |
| *AKI* | *Amazon Kernel Image* (*AKI*) the artifact from where the kernel is loaded when launching an *EC2* instance. |
| *AMI* | *Amazon Machine Image* (*AMI*) is the basis an *EC2* instance starts from on *AWS*.<br><small>An *AMI* is a special type of *virtual appliance* for use with the *EC2* service.<br>Technically, it consists of a read-only filesystem including the OS, additional software, and configuration.</small> |
| *Availability Zone* | A one or more discrete data centers, each with redundant power, networking, and connectivity, house in separate facilities.<br>Each *Availability Zone* is designed as an independent failure zone: each *Availability Zone* is isolated, but the *Availability Zones* within an *AWS Region* are connected through low-latency links. |
| *AWS Region* | A physical location in the world where AWS have multiple *Availability Zones*.<br> Each *AWS Region* is designed to be completely isolated from other *AWS Regions*. |
| Cloud Computing | Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (such as networks, VMs, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction. |
| *Elastic IP* | A static IPv4 address that can be attached to a machine so that it public address is preserved when stopping and starting an *EC2* instance. |
| Hypervisor | The software component responsible for isolating the guests running on a host machine from each other, and for scheduling requests to the hardware, by providing a virtual platform to the guest software. |
| Stack | The realization of a *CloudFormation* template. |
| Template | (*CloudFormation*) A file written in JSON/YAML format that describes the state of a particular infrastructure solution. |
| Virtual appliance | an image of a virtual machine containing an OS and preconfigured software. |

### AWS Services

| AWS Service | Category | Description |
| :---------- | :------- | :---------- |
| AWS CloudFormation | Management and Governance | Gives developers and system admins an easy way to create and manage a collection of related AWS resources.<br>The service supports provisioning, updating, and deletion in an orderly and predictable fashion.<br>*AWS CloudFormation* is the *IaC* solution for AWS. |
| Amazon EC2 | Compute | Web service that provides secure, resizable compute capacity in the cloud.<br><small>It is designed to make web-scale computing easier for developers.<br>Amazon EC2 changes the economonics of computing by allowing you to pay only for capacity that you actually use.<br>Amazon EC2 provides devs and sysadmins the tools to build failure resilient applications and isolate themselves from common failure scenarios.</small> |
| AWS IAM | Security, Identity, and Compliance | *AWS Identity and Access Management (IAM)* enables you to securely control access to AWS services and resources for your users.<br>Using *AWS IAM* you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. |
