# Theory Assignments

You should complete these only after you have completed the practical assignments.

The business goal of the game database is to provide an internal service to get data for all apps from all app stores.  
Many other applications at Voodoo will use consume this API.

#### Question 1:

We are planning to put this project in production. According to you, what are the missing pieces to make this project production ready?
Please elaborate an action plan.

### Answer

- **Implement validators to ensure the data from the frontend is correct**: Never trust the frontend. Always validate the data received from the frontend on the backend to ensure its integrity.

- **Migrate the project to TypeScript**: TypeScript improves development speed and enhances code maintainability, making it easier to catch errors during development.

- **Implement an effective logging and alerting procedure**

- **Set up an architecture strategy**: Establish a solid architectural foundation to support scalability, maintainability, and easy onboarding of new team members.

- **Migrate to a more robust framework (e.g., NestJS)**: A robust framework like NestJS will facilitate development and provide dependency injection, improving code structure and maintainability.

- **Follow SOLID principles**: Adopting SOLID principles will help in writing maintainable, scalable, and testable code, ensuring long-term code quality.

- **Implement tests for every newly implemented feature**: Ensure that new features are thoroughly tested, improving code quality and reducing bugs.

- **Move beyond just API tests and implement unit, e2e, and possibly load testing**: For an application with high traffic, it's important to implement unit tests, end-to-end (e2e) tests, and load testing to ensure robustness under heavy use.

- **Set up Continuous Integration (CI)**: Implement a CI pipeline that builds, tests, pushes the application to a registry, and deploys the server automatically.

- **Consider migrating to a Kubernetes cluster (K8s) if the app receives high traffic**: This will enable auto-scaling and ensure the application can handle large amounts of traffic efficiently.

- **Separate UI logic from business logic on the frontend**: Ensure a clean separation between UI-related code and business logic to improve maintainability and scalability.

- **Implement a caching strategy with Redis or other caching tools**: Set up a caching mechanism to reduce the load on the backend and improve response times.

- **Set up Dependabot to maintain up-to-date NPM libraries**: Automate the process of keeping third-party libraries up-to-date by using Dependabot, ensuring security and compatibility.

- **Implement authentication**: Add a secure authentication mechanism to ensure proper access control and data protection for users.

- **Set up rate limiting and potentially a Web Application Firewall (WAF)**: Implement rate limiting to prevent abuse and protect the API from excessive traffic. Consider adding a WAF to further enhance security.

#### Question 2:

Let's pretend our data team is now delivering new files every day into the S3 bucket, and our service needs to ingest those files
every day through the populate API. Could you describe a suitable solution to automate this? Feel free to propose architectural changes.

### Answer

I suggest implementing a serverless function, such as a Lambda on AWS, and setting up a timer to trigger this function using EventBridge Scheduler. Creating a Lambda function will allow us to separate the responsibilities between the app and the massive data insertion process. The advantage of this approach is that no matter the data volume or the time when the cron task is executed, there will be no impact on the end users using the API (no impact on CPU or RAM in case of large data volumes).

SQL databases are generally less performant for writing when dealing with large data volumes, especially if the data is being sent at regular intervals. In such cases, it might be worthwhile to migrate to a NoSQL solution, such as MongoDB.

I suggest managing concurrency for cron jobs to avoid conflicts and ensure smooth execution. To prevent multiple instances of the same job from running at the same time, you can use lockfiles or track the job status in a database.
