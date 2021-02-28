## Introduction
<p>This is a full stack e-commerce application that I have been building in my spare time. It has many built in features I find myself reimplementing every time I want to prototype an experimental product.</p>
<p>Although my passion is to learn how machine learning and artificial intelligence can improve user experience and engagement, it is crucial to understand how that part fits into a monstrously complicated system. I wanted this project to be a simple template for any such experimentation with ML models. </p>
<p>Attempting to keep my promise of simplicity, I decided that Django would be a good option for the back end due to its incredible versatility and developer experience. The Django admin is the perfect interface to modify and use due to its proximity to the database. But the purpose of admin panel isin't merely to display tables. The admin templates are infinitely customizable,  so one could add custom analytics, graphs models to any page, using the same tools they would in python.<p/>
<p>For the front end, I used React with Next JS. Coming from a create-react-app background, server side rendering with React was new to me. But it had one advantage that really attracted me. Most e-commerce websites share a common flaw. They are slow. This is because the server has to load all the content as well as any additional API calls and 3rd party scripts the page requires every time the user clicks on a new link. This flaw, mainly due to legacy, and old codebases, is avoided in a very slick fashion with the static generation tool built into Next JS. This allows us to edit whatever products we want to in Django admin and re generate the website. The remaining API calls are very minimal. </p>
<p>This method, however, is not ideal for everyone. This approach only works if our products don't constantly change. That is, the website only has to re render once an hour, or day, or so.</p>

## Quick Start
<ol>
<li>
Clone the repository. 
<br/><code>git clone https://github.com/oyavuzjr/Django-Nextjs-Ecommerce-Boilerplate</code><br/><code>cd Django-Nextjs-Ecommerce-Boilerplate</code>
</li>
<li>
Check your python version. My version is 3.8.7.  
<br/><code>python --version</code>
</li>
<li>
Install the python packages using requirements.txt.
<br/><code>pip install -r requirements.txt</code>
</li>
<li>
As usual with Django, we will initialize the database using the two commands.  
<br/><code>python manage.py makemigrations</code>
<br/><code>python manage.py migrate</code>
</li>
<li>
Create super user for admin login
<br/><code>python manage.py createsuperuser</code>
</li>
<li>
Run the server.
<br/><code>python manage.py runserver</code>
<br/>At this point, you can visit localhost:8000, but will see an error. This is okay since we don't have a static site generated yet. If you go to /admin, you will be able to access the admin page.
</li>
<li>
Set up the React project
<br/><code>cd REACT</code>
<br/><code>npm install</code>
</li>
<li>
Inside the REACT folder, create a file called .env and populate it with the following variables. You can adjust to your own use case.
<br/><code>API_ENDPOINT="http://localhost:8000/api/"</code><br/>
<code>IMAGE_ENDPOINT="http://localhost:8000/_next"</code><br/>
<code>GA_TRACKING_ID="..."</code>
</li>
<li>
finally, lets build the static website. <span style="color:'red'">The server has to be running when you are building it! </span>
<br/><code>npm run build</code>
<br/><br/>Done.
</li>
</ol>

