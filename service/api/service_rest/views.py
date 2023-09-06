from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import TechnicianEncoder
from .models import Technician

# Create your views here.

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        print(technicians)

        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
        technician.delete()
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})
