# Kelma
A Real Time Chat Application built using Node.js, Express, Mongoose, Socket.io, Passport

<h2>Features</h2>
<p>
   * Uses Express as the application Framework.</br>
   * Authenticates via username and password using Passport.</br>
   * Passwords are hashed using bcrypt-nodejs package.</br>
   * Real-time communication between a client and a server using Socket.io.</br>
   * Uses MongoDB, Mongoose for storing and querying data.</br>
   * Logging Errors and Exceptions using Winston.</br>
</p>
<h2> New Feature I still working on </h2>
    + Implement voice and video call using webRTC.</br>
    + Implement Sending and receaving files.</br>
    + Implement share screen.</br>
    + Implemtnt Loging using social networks.</br>
<h2>Installation</h2>
Running Locally

<h4>Make sure you have Node.js and npm installed.</h4>

 Clone or Download the repository
<pre>
    $ git clone https://github.com/ahmedMgouda/kelma.git
    $ cd server

    Install Dependencies

    $ npm install

    Edit configuration file in server/app/util/config.json with your credentials(see Setup Configurations).

    Start the application

    $ nodemon
    
    $ cd client 
    Install Dependancies 
    $ npm install 
    Run Angular Project
    $ng serve
</pre>
Your server app should now be running on localhost:3000. and client running localhost:4200

