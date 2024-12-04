
# Product Management
Simple product management nextjs + express


## Project testing on local



&nbsp;1. Copy the env example, and change as you desire 

```bash
  cp .env.example .env
```
then your .env will look like this
```
JWT_SECRET=myjwtsecret
REDIS_PASSWORD=myredispassword
API_URL=http://localhost:8080

```
normally if you run on the local machine you don't need to change `API_URL` value, unless you change the port of the backend and setting it manually on docker

&nbsp;2. Build Docker Compose

```
docker compose up --build -d
```
&nbsp;3. All services ready  you can directly to the `http://localhost:3001`

    
## BE Spesification
 BE were build using express + typescript and redis as data store, which has following endpoints:

```
POST:/auth/register 
POST:/auth/login
POST:/auth/logout
POST:/products
GET:/products/:id
PUT:/products/:id
DELETE:/products/:id
GET:/products
GET:/products/chart/:type

```

the data are stored in redis with 2 keys `users` and `products`
## FE Spesification
 FE were build using nextjs + typescript + antd + tailwind, which has following pages:

```
/auth/register 
/auth/login
/dashboard
/dashboard/products
/dashboard/products/add
/dashboard/products/detail/:id

```

`husky` also provided for checking the eslint and running `jest` test during the precommit stage

the `husky` setting are placed in the root folder, to make `husky` running, you need to do `yarn install` from the root folder 

```
yarn install 
```
below is the example when it running successfully

![img](https://i.imgur.com/iFFsWx9.png)


Below are several screens on the frontend:

![](https://i.imgur.com/3YOEBSe.png)

![](https://i.imgur.com/VduqgXo.png)

![](https://i.imgur.com/oFNMwOX.png)

![](https://i.imgur.com/1dMOtVF.png)

![](https://i.imgur.com/9VpPxU4.png)

![](https://i.imgur.com/r9YVI0S.png)