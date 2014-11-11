What's Open
===

Simple Django site displaying which dining locations are currently open on 
George Mason University's campus.

For more up-to-date information, view the [What's Open 
wiki page](http://wiki.srct.gmu.edu/index.php/Whatsopen).

Development is no longer happening on this repo. The project moved to 
[https://git.srct.gmu.edu/](https://git.srct.gmu.edu/), SRCT's GitLab server.

Contributing
---

What's Open needs all the help it can get. Even if you don't feel 
like you can be helpful with the heavily technical aspects, 
we definitely need designers and technical writers.
 
There are many things that can be done with this project (see the "To Do" 
section), but sometimes it's the small things that count, so don't be afraid of 
contributing just for a spelling mistake.

If you need help at all please contact any SRCT member. We want people to
contribute, so if you are struggling, or just want to learn, then we are willing
to help.

Set Up
---

To get started, you'll need the following installed:

* [Python 2.7](http://www.python.org/download/)
* [Django 1.5 or later](https://www.djangoproject.com/download/)
* [Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
* [virtualenv](http://www.virtualenv.org/en/latest/index.html#installation) 
  (to install you will need either 
  [pip](http://www.pip-installer.org/en/latest/installing.html) or
  [easy_install](http://pythonhosted.org/distribute/easy_install.html))

Then type the following commands in your terminal (if you're on Windows, 
[Cygwin](http://www.cygwin.com/) is recommended).

```bash
git clone http://git.gmu.edu/srct/whats-open.git
cd whats-open/
virtualenv venv --distribute
source venv/bin/activate
pip install -r requirements.txt
python manage.py syncdb
python manage.py migrate website
```

More detailed info on installation can be found on the [SRCT 
wiki](http://wiki.srct.gmu.edu/wiki/index.php/Whatsopen#Installation)
Running the Site Locally
---

Now that everything is set-up you can run the server on your computer.

```bash
python manage.py runserver
```

Go to http://127.0.0.1:8000/ in your browser and you should see the website. 
Though, there won't be any restaurants showing. You will need to add them to 
the database. Go to http://127.0.0.1:8000/admin/ to add new Restaurant and Schedule 
objects to your database (the login would be the same username and password you 
entered when creating a superuser during the `python manage.py syncdb` command).

Modifying and Deploying Code
---

With the means of testing the website, you can really start contributing.

If you're new to Django and don't know where to start, I highly recommend
giving the [tutorial](https://docs.djangoproject.com/en/dev/intro/tutorial01/)
a try. However, it leaves out a lot of important things, so remember, Google is
your friend. If you can't figure it out there, ask me.

For the JavaScript, I will be using jQuery whenever possible because I prefer
it to straight up JavaScript. jQuery has [great
documentation](http://docs.jquery.com/) and I've found [Mozilla's documentation
on JavaScript](https://developer.mozilla.org/en-US/docs/JavaScript) to be
useful as well. But if your Google-fu is sharp, that should suffice.

Once you actually make your changes and have fully tested them you can push the 
code to the git repository. The best way to do this is to fork the project, make
the changes in your local repository, push to gitlab, and submit a pull request.

There are many ways to use git, and this is one example:

```
git commit -a
git push origin master
```

Some more helpful links on how to use Git:

* [Git Reference](http://gitref.org/)
* [OpenHatch's Training Mission](https://openhatch.org/missions/git)
* [Visual Git
  Reference](http://marklodato.github.com/visual-git-guide/index-en.html)
* [Git For Ages 4 And
  Up](http://blip.tv/open-source-developers-conference/git-for-ages-4-and-up-4460524)


To Do
---

* Get all restaurants displaying correct open times on the page. AKA. make
  extensive tests.
* Sort by location view
* Add times until opening/closing for restaurants that are close, and exact
  times for those that aren't.
* Make page refresh, or more preferably have the data refresh. For
  example, with AJAX calls.
* Create more useful API calls. Document them.
* Allow switching between campuses. In the database, mark which campus each
  restauraunt is on, include this information in the JSON object returned at
  `ajax/schedule` and store the campus choice in the user's cookies
  so that when they come back the page will already be set to their campus.
  Default would be Fairfax of course.
  [jquery-cookie](https://github.com/carhartl/jquery-cookie) would be useful
  for this.
* What's open for everything on campus, not just campuses-- for the card office, library, gyms, tutoring centers, places off campus that accept Mason Money
* I'm seeing an "IndexError: list index out of range" that doesn't apparently affect anything being tossed in the managepy output
