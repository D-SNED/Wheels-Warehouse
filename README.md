# CarCar

Team:

* Paola Alcala - Sales microservice
* Derek Snediker - Service microservice

## How to get started
This applicattion runs by building Docker containers and Docker images. Docker Desktop needs to be downloaded to access this application.

1. Fork repository  https://gitlab.com/paolavalcala1/project-beta
2. Follow the following git commands

```

git clone <<forked repo url>>
cd project-beta/
docker volumne create beta-data
docker-compose build
docker-compose up

```

## Design
The project CarCar manages Inventory for a car dealership managing its Service Center and its Sales. The design of this project creates RESTful API calls to those 3 different microservices. Inventory, Service, and Sales.

The front-end of the application uses React, the back-end uses Django, and the database PostgreSQL.

![Diagram](ghi/app/src/diagram.png)

## Frontend Navigation
Project Beta Frontend can be viewed in browser: http://localhost:3000

### Feature page links

**Manufacturers**

| Feature           | URL              |
| ----------------- | ------------------ |
| Manufacturers List  | http://localhost:3000/manufacturers |
| Create a Manufacturer | http://localhost:3000/manufacturers/create |

**Models**

| Feature           | URL              |
| ----------------- | ------------------ |
| Models List | http://localhost:3000/models/ |
| Create a Model | http://localhost:3000/models/create/ |

**Automobiles**

| Feature           | URL              |
| ----------------- | ------------------ |
| Automobiles List  | http://localhost:3000/automobiles/ |
| Create an Automobile | http://localhost:3000/automobiles/create/ |

**Technicans**

| Feature           | URL              |
| ----------------- | ------------------ |
| Technicians List  | http://localhost:3000/technicians |
| Add a Technician | http://localhost:3000/technicians/create |

**Appointments**

| Feature           | URL              |
| ----------------- | ------------------ |
| Appointments List | http://localhost:3000/appointments |
| Create an Appointment | http://localhost:3000/appointments/create/ |
| Appointment history | http://localhost:3000/appointments/history |

**Salespeople**

| Feature           | URL              |
| ----------------- | ------------------ |
| Salespeople List | http://localhost:3000/salespeople |
| Add a Salesperson  | http://localhost:3000/salespeople/create/ |

**Customers**

| Feature           | URL              |
| ----------------- | ------------------ |
| Customers List  | http://localhost:3000/customers |
| Add a customer  | http://localhost:3000/customers/create/ |

**Sales**

| Feature           | URL              |
| ----------------- | ------------------ |
| Sales List  | http://localhost:3000/sales/ |
| Add a Sale | http://localhost:3000/sales/create/ |
| Sale History | http://localhost:3000/sales/history/ |


## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
