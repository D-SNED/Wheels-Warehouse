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
Project CarCar Frontend can be viewed in browser at: http://localhost:3000

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


The service microservice contains three models:
    `Technician`, `Appointment` and `AutomobileVO`.

### Technician ###

The `Technician` model contains all the instances of a technician. The model attributes are `first_name`, `last_name` and `employee_id`. There are two view functions relating to technicians. The first view related to technicians is the `api_list_technicians` view. This view will do one of two things depending on the request it recieves. It will either return a list of dictionaries of all the technicians, create a new instance of a technician or return an error message. The second view is `api_delete_technican` and will delete a specific technician instance that has the same `id` specified in the request url.

The endpoints for technians are as follows:

| Action | Method | URL |
| ------- | --------| ------ |
| List Technicians | GET | http://localhost:8080/api/technicians/ |
| Create Technician | POST | http://localhost:8080/api/technicians/ |
| Delete Technician | DELETE | http://localhost:8080/api/technicians/<int:id>/ |


Example input for creating a technician
```

	{
		"first_name": "Derek",
		"last_name": "Snediker",
		"employee_id": "Dsnediker"
	}
```


Example output for creating a technician
```

	{
		"id": 1,
		"first_name": "Derek",
		"last_name": "Snediker",
		"employee_id": "Dsnediker"
	}
```


Example error message for creating a technician
```
	{"message": "Could not create technician"}
```


Expected output for List Technicians
```
	{
	"technicians": [
		{
			"id": 1,
			"first_name": "Derek",
			"last_name": "Snediker",
			"employee_id": "Dsnediker"
		},
		{
			"id": 2,
			"first_name": "Bob",
			"last_name": "Snediker",
			"employee_id": "Bsnediker"
		}
	  ]
	}
```

To delete a technician, provide a valid id associated with a technician instance. If given an invalid id you will recieve this output:

```
{
	"message": "Does not exist"
}
```

For a valid id you will see this output:

```
{
	"id": null,
	"first_name": "Paula",
	"last_name": "Alcala",
	"employee_id": "Palcala"
}

```


### Appointments ###

The `Appointment` model contains all the instances of an appointment. The model attributes are `date-time`, `reason`, `status`, `vin`, `customer`, `is_vip` and `technician`. The technician attribute is a foreign key to the appointment model. This indicates that a technician can be associated with many appointments. There are two view functions relating to appointments. The first view related to the appointment model is the `api_list_appointments` view. This view will do one of two things depending on the request it recieves. It will either return a list of dictionaries of all the appointments, create a new instance of an appointments or return an error message. The second view is `api_appointment` and will delete a specific appointments instance that has the same `id` specified in the request url or it will update the status of an appointment from `created` to either `finished` or `canceled`


The endpoints for appointments are as follows:

| Action | Method | URL |
| ------- | --------| ------ |
| List Appintments | GET | http://localhost:8080/api/appointments/ |
| Create Appointment | POST | http://localhost:8080/api/appointments/ |
| Delete Appointment | DELETE | http://localhost:8080/api/appointments/<int:id>/ |
| Update Appointment to Canceled | PUT | http://localhost:8080/api/appointments/<int:id>/cancel/ |
| Update Appointment to Finished | PUT | http://localhost:8080/api/appointments/<int:id>/finish/ |


Example input for creating an appointment
```

	{
	"date_time": "2023-09-20T17:00:00+00:00",
	"reason": "Tires",
	"vin": "1GKDT13W6P2533357",
	"customer": "Bob Dylan",
	"technician": "Ataing",
	"is_vip": true
}
```


Example output for creating an appointment
```

	{
	"id": 20,
	"date_time": "2023-09-20T17:00:00+00:00",
	"reason": "Tires",
	"status": "created",
	"vin": "1GKDT13W6P2533357",
	"customer": "Bob Dylan",
	"is_vip": true,
	"technician": {
		"id": 2,
		"first_name": "Amanda",
		"last_name": "Taing",
		"employee_id": "Ataing"
	}
}
```


Example error message for creating an appointment
```
	{"message": "Invalid employee id"}
```


Expected output for List Appointments
```
	{
	"appointments": [
		{
			"id": 1,
			"date_time": "2023-09-07T12:00:00+00:00",
			"reason": "Windshield",
			"status": "canceled",
			"vin": "JH4DB1561MS001102",
			"customer": "John Doe",
			"is_vip": false,
			"technician": {
				"id": 1,
				"first_name": "Derek",
				"last_name": "Snediker",
				"employee_id": "Dsnediker"
			}
		},
		{
			"id": 11,
			"date_time": "2023-09-08T10:30:00+00:00",
			"reason": "Makes load rattling noise",
			"status": "canceled",
			"vin": "JH4DB1671NS000248",
			"customer": "Bob Snediker",
			"is_vip": false,
			"technician": {
				"id": 7,
				"first_name": "Jake",
				"last_name": "Ascher",
				"employee_id": "Jascher"
			}
		}
	  ]
	}
```

To delete an appointment, provide a valid id associated with an appointment instance. If given an invalid id you will recieve this output:

```
{
	"message": "Appointment does not exist"
}
```

For a valid id you will see this output:

```
{
	"id": null,
	"date_time": "2023-09-10T12:00:00+00:00",
	"reason": "Tires",
	"status": "canceled",
	"vin": "5FNRL38918B111818",
	"customer": "Johnny Cash",
	"is_vip": true,
	"technician": {
		"id": 1,
		"first_name": "Derek",
		"last_name": "Snediker",
		"employee_id": "Dsnediker"
	}
}

```

To update an appointment to canceled provide a valid id of an already existing appointment.
An example in put will look like this:
```
{
	"status":"canceled"
}
```

The output will be:
```
{
	"id": 20,
	"date_time": "2023-09-20T17:00:00+00:00",
	"reason": "Tires",
	"status": "canceled",
	"vin": "1GKDT13W6P2533357",
	"customer": "Bob Dylan",
	"is_vip": true,
	"technician": {
		"id": 2,
		"first_name": "Amanda",
		"last_name": "Taing",
		"employee_id": "Ataing"
	}
}

```

If the id of the appointment is invalid, this error message will appear:
```
{"message": "Does not exist"}
```


To update an appointment to finished provide a valid id of an already existing appointment.
An example in put will look like this:
```
{
	"status":"finsihed"
}
```

The output will be:
```
{
	"id": 24,
	"date_time": "2023-09-20T17:00:00+00:00",
	"reason": "Tires",
	"status": "finished",
	"vin": "1GKDT13W6P2533357",
	"customer": "Bob Dylan",
	"is_vip": true,
	"technician": {
		"id": 7,
		"first_name": "Jake",
		"last_name": "Ascher",
		"employee_id": "Jascher"
	}
}

```

If the id of the appointment is invalid, this error message will appear:
```
{"message": "Does not exist"}
```


###Automobile VO###

The `Automobile Vo` model containes all instances of any autombiles that are created. The model attrivutes are `vin` and `sold`. The `Automobile Vo` is constantly updated due to a poller that is "looking" at the automobile information in the `Automoblile` model in the **Inventory Microservice**. When the poller encouters an automobile instance it looks at the `vin` for that auto and either updates the information in the `Automobile VO` or it creates a new value object matching that `vin`.



## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The Sales microservice manages automobile sales, customer information and salespeople information. Sales microservice consists of three main parts; sales, salespeople, amd customers. I created four models named Sale, Salesperson, Customer and an Atomobile VO model. The Automobile VO model retrieves the automobile entity object's data from the Inventory microservice using polling.

### Models

**AutomobileVO**

Retrieves the vin and sold status of an existing Automobile in the inventory

| Name        | Data Type     | Explanation
| ----------- | ----------- | ------------- |
| vin  | CharField | Auto's vin |
| sold | BooleanField | Auto's sold status |

**Sale**

Takes an input for price and uses 3 foreign keys to associate with the AutomobileVO, salesperson, and customer models to retrieve some of their attributes.

| Name        | Data Type     | Explanation
| ----------- | ----------- | ------------- |
| price | CharField | price of Auto |
| automobile | ForeignKey | Auto assigned to sale |
| salesperson | ForeignKey | salesperson assigned to sale |
| customer | ForeignKey | customer assigned to sale |

**Salesperson**

Takes 3 input fields; first name, last name, and an employee id.

| Name        | Data Type     | Explanation
| ----------- | ----------- | ------------- |
| first_name | CharField | salesperson's first name |
| last_name | CharField | salesperson's last name|
| employee_id | CharField | salesperson employee Id |

**Customer**

Takes 4 input fields; first name, last name, address and phone number.

| Name        | Data Type     | Explanation
| ----------- | ----------- | ------------- |
| first_name | CharField | customer's first name |
| last_name | CharField | customer's last name |
| address | CharField | customer's address |
| phone_number | CharField | customer's phone number |

### Endpoints

**Sales**

| Feature     | Method       | URL |
| ----------- | ----------- | ------------|
| List of sales | GET | http://localhost:8090/api/sales/ |
| Create a sale | POST | http://localhost:8090/api/sales/ |
| Delete a sale | DELETE | http://localhost:8090/api/sales/int:id/ |

```
// Example JSON input //
{
	"price": "18000",
	"salesperson": "3",
	"customer": "8",
	"automobile": "1P4GH44R0RX359386"
}

// expected returned output //

{
	"href": "/api/sales/25/",
	"price": "18000",
	"automobile": {
		"vin": "1P4GH44R0RX359386",
		"sold": false,
		"id": 7
	},
	"salesperson": {
		"first_name": "Paola",
		"last_name": "Alcala",
		"employee_id": "1234",
		"id": 3
	},
	"customer": {
		"first_name": "Kris",
		"last_name": "Vigil",
		"address": "5326 Sierra Ave Rilato Ca",
		"phone_number": "9517796352",
		"id": 8
	},
	"id": 25
}

```

```
// expected returned output after a sale is deleted //

{
	"deleted": true
}

```

**Salespeople**

| Feature     | Method       | URL |
| ----------- | ----------- | ------------|
| List of salespeople | GET | http://localhost:8090/api/salespeople/ |
| Create a salesperson | POST | http://localhost:8090/api/salespeople/ |
| Delete a salesperson | DELETE | http://localhost:8090/api/salespeople/int:id/ |

```
// Example JSON input //

{
	"first_name": "Paola",
	"last_name": "Alcala",
	"employee_id": "1234"
}

// expected returned output //

{
	"first_name": "Paola",
	"last_name": "Alcala",
	"employee_id": "1234",
	"id": 3
}

```

```
// expected returned output after a sale is deleted //

{
	"deleted": true
}

```

**Customer**

| Feature     | Method       | URL |
| ----------- | ----------- | ------------|
| List of customers | GET | http://localhost:8090/api/customers/ |
| Create a customer | POST | http://localhost:8090/api/customers/ |
| Delete a customer | DELETE | http://localhost:8090/api/customers/int:id/ |

```
// Example JSON input //

{
	"first_name": "Derek",
	"last_name": "Snediker",
	"address": "3032 Tyler Ave Riverside Ca",
	"phone_number": "9519512563"
}

// expected returned output //

{
	"first_name": "Brenda",
	"last_name": "Ayala",
	"address": "3032 Tyler Ave Riverside Ca",
	"phone_number": "9519512563",
	"id": 3
}

```

```
// expected returned output after a sale is deleted //

{
	"deleted": false
}

```
