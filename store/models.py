from django.db import models
#from accounts.models import CustomUser as User
from accounts.models import CustomUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from multiselectfield import MultiSelectField
from django.utils.html import mark_safe

class Tag(models.Model):
    name=models.CharField(max_length=50,null=False,blank=False)
    def __str__(self):
        return self.name

class Product(models.Model):

    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    
    s =( 
        ("M", "Male"), 
        ("F", "Female"), 
    ) 
    sex = MultiSelectField(choices=s) 
    tags= models.ManyToManyField(Tag)
    #image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name

    def imageURL(self):
        return ProductImage.objects.all(Product=self.id)

    @property
    def tag_number(self):
        return (self.tags.count)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', default=None,on_delete=models.CASCADE)
    image = models.ImageField( null=True, blank=True)
    def __str__(self):
        return self.product.name

class Order(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total

    @property
    def get_cart(self):
        orderitems = self.orderitem_set.all()
        return orderitems
    
    @property
    def get_cart_products(self):
        orderitems = self.orderitem_set.all()
        products=[  x for x in orderitems]
        return orderitems


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    
    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


