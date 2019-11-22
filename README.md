# Orbit - Automating AltCampus application process

## About Orbit

Orbit is an application management system for [altcampus](https://altcampus.io) to automate the application process for people who wish to enroll the program. The mentors will be able to review and keep track of the applicant’s progress. On this platform, people can log in and get assessed for enrollment depending on different stages of evaluation.

Users can login to see their application progress in real time. Users can solve questions, submit assignments and if selected, get scheduled an interview.

Admins can grade the submited assignments and questions. Based on the score(both the objectively calculated and the one assigned by the admins) it will be determined whether the user is qualified for the interview or not.

## How to launch the app locally?

- STEP 1-- Fork the project repo and clone it in your local repository.

- STEP 2-- Download and install [Node](https://nodejs.org/en/)

```
verify with the following command:
>>>node -v
```

- Make sure you run all your commands from inside cloned /orbit folder.

- STEP 3-- Install the npm modules from the package.json

```
>>> npm install
this command installs all the node related packages required to run the app locally in
/node_modules folder. You can see this folder inside /orbit folder after running npm install
```

- STEP 4-- Launch the application using below command:

```

Below command will start as full web application(Backend+Frontend)
>>> npm install -g nodemon
>>> npm start
The application will be running at http://localhost:3000
if not then please check if you have set any default PORT in your environment/path variable
i.e http://localhost:<your_env_port_variable>
```

## Wiki

[Wiki](https://github.com/AltCampus/orbit/wiki)
