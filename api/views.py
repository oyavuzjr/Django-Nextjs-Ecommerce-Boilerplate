from django.shortcuts import render
from django.http import JsonResponse
from store.models import Product, Order, OrderItem
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ProductSerializer, RegisterSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework.authtoken.models import Token
import json


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'ProductList': '/product-list/',
        'ProductDetail': '/product-detail/id',
        'login': '/login/',
        'register': '/register/'
    }
    return Response(api_urls)


#@permission_classes([IsAuthenticated])
@api_view(['GET'])
def productList(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def productDetail(request, pk):
    products = Product.objects.get(id=pk)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def registrationView(request):
    serializer = RegisterSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.get(user=user).key
        data['response'] = "successfully registered new user"
        data['email'] = user.email
        data['username'] = user.username
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateItem(request):
    print(request.data)
    action = request.data["action"]
    user = request.user
    product = Product.objects.get(id=request.data['productId'])
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
    serializer = OrderItemSerializer(order.get_cart,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCart(request):
    user = request.user
    order, created = Order.objects.get_or_create(
        user=user, complete=False)
    cartItems = order.get_cart
    serializer = OrderItemSerializer(cartItems, many=True)
    return Response(serializer.data)
