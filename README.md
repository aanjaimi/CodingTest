<h2>Objective</h2>
This project is about implementing a location-based Q&A app that allows users to post questions, receive answers from nearby users, and interact with the content.
<h2>Technologies:</h2>
<h4>Backend:</h4> <ul><li>NestJs with Prisma and socket.io for real-time communication.</li></ul>
<h4>Frontend:</h4> <ul><li>ReactJs / NextJs.</li></ul>
<h2>Features:</h2>
<ol>
<li>
User Authentication:
<ul>
<li>As a user, I can sign up using my email and password.</li>
<li>As a user, I can sign in using my email and password.</li>
<li>As a user, I can reset my password in case I forget it.</li>
</ul>
</li>

<li>
Posting Questions:
<ul>
<li>As a user, I can post a question with attributes such as title, content, and location.</li>
<li>As a user, I can post an answer to a question.</li>
</ul>
</li>
  
<li>
Location-based Sorting:
<ul>
<li>As a user, I can display the list of questions sorted by distance from my location.</li>
</ul>
</li>

<li>
Interaction with Questions:
<ul>
<li>As a user, I can like a question, adding it to my favorites</li>
<li>As a user, I can display the list of liked questions</li>
<li>As a user, I can remove a question from my favorites list</li>
</ul>
</li>

<li>
Real-time Notifications:
<ul>
<li>As a user, I receive real-time notifications through socket.io in the following scenarios:
<ul>
<li>Answers to My Questions: Immediate notifications when someone nearby answers my posted questions</li>
<li>Likes on My Questions: Instant alerts when other users express appreciation by liking my questions</li>
<li>New Nearby Questions: Timely notifications when new questions are posted by users in my vicinity</li>
</ul>
</li>
</ul>
</li>

<li>
Daily Summary:
<ul>
<li>As a user, by 6 pm, I receive a list of users who answered my questions and their responses.</li>
</ul>
</li>

<li>
Mapping Questions:
<ul>
<li>As a user, I can list questions on a map (Google Maps).</li>
</ul>
</li>

<li>
Dockerization:
<ul>
<li>Dockerize the app for easy deployment.</li>
</ul>
</li>
</ol>
