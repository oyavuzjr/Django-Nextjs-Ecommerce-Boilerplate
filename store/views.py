from django.shortcuts import render
from .models import *
from django.http import JsonResponse
import json


def store(request):

    if(request.user.is_authenticated):
        user = request.user
        order, created = Order.objects.get_or_create(
            user=user, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        items = []
        order = {"get_cart_total": 0, "get_cart_items": 0}
        cartItems = order["get_cart_items"]
    products = Product.objects.all()
    context = {'products': products, "cartItems": cartItems, "items": items}
    return render(request, 'store/store.html', context)
# Create your views here.


def cart(request):
    # First check if user is authenticated
    if(request.user.is_authenticated):
        user = request.user
        order, created = Order.objects.get_or_create(
            user=user, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        items = []
        order = {"get_cart_total": 0, "get_cart_items": 0}
        cartItems = order["get_cart_items"]
    context = {'items': items, "order": order, "cartItems": cartItems}
    return render(request, 'store/cart.html', context)


def checkout(request):
    if(request.user.is_authenticated):
        user = request.user
        order, created = Order.objects.get_or_create(
            user=user, complete=False)
        items = order.orderitem_set.all()
        cartItems = order.get_cart_items
    else:
        items = []
        order = {"get_cart_total": 0, "get_cart_items": 0}
        cartItems = order["get_cart_items"]

    context = {'items': items, "order": order, "cartItems": cartItems}
    return render(request, 'store/checkout.html', context)


def updateItem(request):
    data = json.loads(request.body)
    productId = data['productId']
    action = data['action']
    print('Action:', action)
    print('Product:', productId)

    user = request.user
    product = Product.objects.get(id=productId)
    order, created = Order.objects.get_or_create(
        user=user, complete=False)
    orderItem, created = OrderItem.objects.get_or_create(
        order=order, product=product)
    if(action == "add"):
        orderItem.quantity = (orderItem.quantity+1)
    elif(action == "remove"):
        orderItem.quantity = (orderItem.quantity - 1)
    orderItem.save()
    if(orderItem.quantity <= 0):
        orderItem.delete()
    
    return JsonResponse('Item was added', safe=False)
