## Introduction 
This implementation using MVC athcitecture with mongodb database in backend side,Reactjs in frontend side,and using RESTFULL API for create connection between client(frontend) and server(backend).
## Backend

First implementation in authentication controller is sigup function that get information like password,username and role from client in the json format,hash the password and save into database on of the important 
things that i implement in signup controller is access control and only the manager can add user in the system , if another roles try to add user they get error from server(Detail of access controll in other topic)
another one is login proccess that we get data like username and password from server and hash the password and compare with hash of password that we store in the database(with bcrypt package) if password equal we generate 
jwt token with 1hr expiration and send response to client side.(like below picture)

![Annotation 2024-12-13 183535](https://github.com/user-attachments/assets/c70f5a9f-31fe-4e83-9eda-3b68fbac478f)

the important things is jwt token include username and role of user,and when we decode jwt token its very useufull for our controll access.

getDashboard function return user dashboard information and if you look at the code we get user data from request,but how?yes,we get user data we decoding the jwt token and when we get username we can implement
query in our database and get aonther information.

![Annotation 2024-12-13 184219](https://github.com/user-attachments/assets/3d1af3f9-e946-4f37-a053-442e9b621d45)

what is the checkToken function? in this project i implement router protector in frontend side only have valid access tokens can access the routers,if user have invalid jwt token just access to
login route for handle this proccess.

In the equipment controller implement only two function get and create equipment,if you look at get function at first we get user role from request in middlware(i will explain it in middleware topic) and then we 
implement access controll in this function,if role equal to manager or equipment exprtise that can be get all information about equipment,if the user role is agent only it can access to own equipments,another roles
get error from server.

![Annotation 2024-12-13 185133](https://github.com/user-attachments/assets/18e116f3-06ea-4dbe-b725-77150c198f51)
