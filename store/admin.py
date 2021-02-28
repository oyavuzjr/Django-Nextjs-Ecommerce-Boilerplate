from django.contrib import admin
from .models import *
from django import forms
import json
from django.shortcuts import get_object_or_404




class ProductImageAdmin(admin.StackedInline):
    model=ProductImage



class ProductAdmin(admin.ModelAdmin):
    inlines=[ProductImageAdmin]

    list_display = ('name','price','sex',)
    readonly_fields=('tag_number',)
    # Un comment if you want to be able to see the products in change page
    # Make sure you have at least one product created
    #--------------
    # def render_change_form(self, request, context, *args, **kwargs):
    #     self.change_form_template = 'admin/product_change_form.html'
    #     product=get_object_or_404(Product, id=context["object_id"])
    #     product_images=[F"http://localhost:8000{p.image.url}" for p in (ProductImage.objects.filter(product=product))]
    #     extra = {"image_urls":product_images}
    #     context.update(extra)
    #     return super(ProductAdmin, self).render_change_form(request,
    #         context, *args, **kwargs)

class ProductChangeForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ('name',)

admin.site.register(Product,ProductAdmin)
admin.site.register(Order)
admin.site.register(Tag)

