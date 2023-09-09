# CarCar

Team:

* Paola Alcala - Sales microservice
* Derek Snediker - Service microservice

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

The service microservice contains three models:
    Technician, Appointment and AutomobileVO.

The technician model contains all the instances of a technician. In the microservice we have two view functions relating
to technicians. The first view related to technicians is the api_list_technicians view. This view will do one of two things depending on the request it recieves. It will either return a list of dictionaries of all the technicians, create a new instance of a technician or return an error message.

The endpoints for technians are as follows:

| Action | Method | URL |
| ------- | --------| ------ |
| List Technicians | GET |



## Sales microservice

Explain your models and integration with the inventory
microservice, here.
