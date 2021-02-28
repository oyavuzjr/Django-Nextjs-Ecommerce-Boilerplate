from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('product-list/', views.productList, name="product-list"),
    path('product-detail/<str:pk>', views.productDetail, name="product-detail"),
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('register/', views.registrationView,
         name='register'),  # <-- And here
    path('update-item/', views.updateItem, name="update-item"),
    path('get-cart/', views.getCart, name="get-cart")
]
