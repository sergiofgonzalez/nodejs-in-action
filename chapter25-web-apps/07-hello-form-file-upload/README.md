# 07 &mdash; Hello, form file upload!
> A simple Vanilla JavaScript project with an Express backend that illustrates how to upload files to a server using `<form>`

In the example, an HTML page with an `<input type="file"...>` is configured in a form. That form is configured with a submit button that uploads a file to the server, which places in the `public/images/` directory.

The server also features an endpoint that is used to retrieve the the list of files that have been already uploaded. That information is used in the frontend to dynamically build a table.