# 10 &mdash; *AWS Glue* Concepts
> A few entry-level definitions about *AWS Glue*

## Intro to *AWS Glue*

*AWS Glue* is a fully managed *extract, transform, and load (ETL) service* that makes it easy for you to prepare and load your data for analytics. The tool uses a *low-code/no-code* approach so you can run an ETL job with a few clicks.

*AWS Glue* takes a serverless approach, so you don't need to manage the infrastructure &mdash; data will be stored on Amazon S3 data stores, and you will only play for the computing resources used while you run your jobs.

From the *AWS Glue* section of the *AWS Management console* you will be able to create and run ETL jobs.

## Basic Components of *AWS Glue*

+ Jobs &mdash; the artifacts that will carry out the work to extract, transform, and load data from a data source to a data target.

+ Data Catalog &mdash; the central data dictionary for your set of data sources and data targets. It is a metadata repository that holds references to the different data sources and data targets used in ETL jobs.

+ Crawlers &mdash; component used to populate the AWS Glue Data Catalog with metadata. It populates the (logical) table definitions in the data catalog by pointing the crawler at a data store. Crawlers can also be used to convert
