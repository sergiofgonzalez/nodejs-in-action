# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### Exercise 2: Stream data processing
On [Kaggle](https://www.kaggle.com/), you can find a lot of interesting data sets, such as the [London Crime Data](https://www.kaggle.com/jboysen/london-crime/). You can download the data in CSV format and build a stream processing script that analyzes the data and tries to answer the following questions:
+ Did the number of crimes go up or down over the years?
+ What are the most dangerous areas of London?
+ What is the most common crime per area?
+ What is the least common crime?
Hint: You can use a combination of `Transform` and `PassThrough` streams to parse and observe the data as it is flowing. Then you can build *in-memory* aggregations for the data, which can help answering the preceding questions.
Also, it is not necessary to do everything in one pipeline; you could build very specialized pipelines (e.g. one per question), and then use the fork pattern to distribute the chunks across them.

#### Solution Details

##### Q1. Did the number of crimes go up or down over the years?

To answer this question we need to aggregate the number of crimes per year. A simple `AggregateByYear` transform is created.

##### Q2. What are the most dangerous areas of London?

To answer this question we need to aggregate the number of crimes per borough. A simple `AggregateByBorough` transform is created.
The aggregated sum is kept on map that is then sorted in decreasing mode in the `_flush()` method to show the most dangerous areas first.

##### Q3. What is the most common crime per area?

To answer this question we need to group the relevant data by borough, and then aggregate the number of crimes in that borough. A simple `GroupByBorough` transform stream is created.
The aggregated sum is kept on each of the borough maps that are then sorted in decreasing mode in the `_flush()` method to show the crimes with most number of instances first.

##### Q4. What is the least common crime?

To answer this question we need to aggregate by crime, following the same approach we followed in Q2.

In the first version, I created the different `Transform` streams and tested them individually.

In the second version, I used the *fork pattern* so that all the questions could be written to files in parallel using the individual transformations.
