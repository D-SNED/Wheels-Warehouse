from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import requests
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "id",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


#list of salespeople and create a salesperson
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


#get a salesperson and delete a saleperson
@require_http_methods(["GET", "DELETE"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
            )
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.get(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=400,
            )


#list of customers and create a customer
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


#get a customer and delete a customer
@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
            )
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.get(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400,
            )


#list of sales and create a sale
@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            auto_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=auto_vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist"},
                status=400
            )
        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=400
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


#get a sale and delete a sale
@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=pk)
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exits"},
            )
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            count, _ = Sale.objects.get(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Sale does not exist"},
                status=400,
            )
