## Introduction 
This implementation using MVC athcitecture with mongodb database in backend side,Reactjs in frontend side,and using RESTFULL API for create connection between client(frontend) and server(backend).
## Backend

  First implmentation in authentication controller is sigup function that get information like password,username and role from client in the json format,hash the password and save into database on of the important 
things that i implement in signup controller is access control and only the manager can add user in the system , if another roles try to add user they get error from server(Detail of access controll in other topic)
another one is login proccess that we get data like username and password from server and hash the password and compare with hash of password that we store in the database(with bcrypt package) if password equal we generate 
jwt token with 1hr expiration and send response to client side,the important things is jwt token include username and role of user,and when we decode jwt token its very useufull for our controll access.

![Annotation 2024-12-13 183535](https://github.com/user-attachments/assets/c70f5a9f-31fe-4e83-9eda-3b68fbac478f)



  getDashboard function return user dashboard information and if you look at the code we get user data from request,but how?yes,we get user data we decoding the jwt token and when we get username we can implement
query in our database and get aonther information.

![Annotation 2024-12-13 184219](https://github.com/user-attachments/assets/3d1af3f9-e946-4f37-a053-442e9b621d45)

what is the checkToken function? in this project i implement router protector in frontend side only have valid access tokens can access the routers,if user have invalid jwt token just access to
login route for handle this proccess.

  In the equipment controller implement only two function get and create equipment,if you look at get function at first we get user role from request in middlware(i will explain it in middleware topic) and then we 
implement access controll in this function,if role equal to manager or equipment exprtise that can be get all information about equipment,if the user role is agent only it can access to own equipments,another roles
get error from server.

![Annotation 2024-12-13 185133](https://github.com/user-attachments/assets/18e116f3-06ea-4dbe-b725-77150c198f51)

  In the create equipment function only manger and equipment experise can create equipment.
Mission controller is very similar to equipment it has get and create mission function but only diffrent is in get function manager and analyser can get all mission but agent only get its own missions,in the create function only manager can create mission to users.(we check the issued username to mission and equipment if it doenst exist in database server throw the error)

## Middlware
Middlware is very important part of our project,this part handle the access controll of systems,But what is the middlware?middlware is layer between client and server side,in this implmenation request at first passes middleware logic then arrives to server,but what is the benefit?one of the benefits is implement user access control!


lets talking about verifyToken middleware logic,at first step we get access token from header of request and split it for get only token part.

![Annotation 2024-12-13 191032](https://github.com/user-attachments/assets/f2ed4579-0d5a-46cc-b429-8e0098e166ba)

in second step function decode the token to check validation of token and if the tokens is not valid thow the error to client side.

![Annotation 2024-12-13 191045](https://github.com/user-attachments/assets/9c6d452e-a77e-4b77-86ad-26ef5af0b004)

At the end we set information like role,username,userid and say welcome to request for getting access to our server.

![Annotation 2024-12-13 191111](https://github.com/user-attachments/assets/6e4a80dc-3017-4ef6-859e-03a38f45b2cc)

## Routers
In summary routers are bridge between server side and client side and i prefer look at the router folder to get more detail of router implmentation.

## ERD
In this diagram i explain relation between entities in database,for more details connection between user and mission is every user can have multiple mission but every mission 
can attached to only one user(one to many),and relation between user and equipment entiites is similar to mission entity,and username is forgein key in both mission and equipment
entity.

![Annotation 2024-12-13 192238](https://github.com/user-attachments/assets/262e2a17-14bb-4ced-89aa-0d262f71532b)


## Frontend
In the frontend side i implement pages folders for create page for each part of project,i prefer look at the codes to get more informtion but i want talk about very important part here,RouterProtecter.
What RouterProtector acctually do? RouterProtector protect our routes(/register,/missions,/dashboard,...except /login route) to invalid access but,how?(look at the blow picture)

![Annotation 2024-12-13 193518](https://github.com/user-attachments/assets/035a9ad9-cec6-479c-ab1d-d3160b9bed06)

At the first step we send post request to server side to check validation of token(checkToken function) if token is valid it return true value and if values is true user can access to route if value was false navigate to
login page.

Notice: For see error messages in fontend side i don implement router protector for each user role.
