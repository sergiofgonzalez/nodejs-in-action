# 07: Express &mdash; Hello, *Express* session management and redirects in TypeScript!!
> A simple *Express server* in which session management and redirection capabilities are illustrated.

When you open the homepage by pointing your browser to http://localhost:5000 it will display the welcome page inviting you to log in. This happens because there is no username in the session yet.

![Initial: no login](../images/initial_no_login.png)

If you click on the link, you will be redirected to the login page, where the login form will be presented:

![Login form](../images/login_form.png)

If you click right away on the *Login* button, an error message will be displayed to the user:

![Login form: error](../images/login_form_error.png)

If you populate the username and click on submit, you will be redirected to the home page, where your name will be displayed instead of the login link:

![Login form: logging in](../images/login_form_logging_in.png)

![Index: logged in](../images/initial_logged_in.png)

Now, if you open another browser tab, you will see that the username will still be there:

![Index: logged in](../images/initial_logged_in.png)

However, if you open a private browser session and log in again with another username, you'll see that the session is not shared:

![Index: logged in (another user)](../images/initial_logged_in_another_user.png)