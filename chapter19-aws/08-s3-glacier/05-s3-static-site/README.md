# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 8: Amazon S3 and Glacier
#### 05 &mdash; S3: Hosting an static website in S3
> Illustrates how to host an static website in S3 using AWS CLI commands

##### About the example

You will find two shell scripts:
+ `deploy_website_to_s3.sh` &mdash; script that requires two parameters (bucket name and optionally the profile) and sets up the contents of the `static-web-site/` directory as a static website hosted on *Amazon S3*.

+ `delete_s3_website.sh` &mdash; disables the static website via deletion of the bucket on which the static website is hosted.