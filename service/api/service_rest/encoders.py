from common.json import ModelEncoder
from .models import Technician, Appointment

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "is_vip",
        "technician",
    ]
    encoders = {"technician": TechnicianEncoder()}
