from django.db import models
from django.urls import reverse

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("api_delete_technician", kwargs={"pk": self.id})

    def __str__(self):
        return self.employee_id

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=False)
    reason = models.CharField(max_length=500)
    status = models.CharField(max_length=200, default="scheduled")
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    is_vip = models.CharField(max_length=200, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_appointment_details", kwargs={"pk": self.id})

    def __str__(self):
        return self.customer
