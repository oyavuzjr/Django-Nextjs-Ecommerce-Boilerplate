from django.shortcuts import render
from django.http import HttpResponse
import os
import logging
from django.conf import settings
index_file_path = os.path.join(settings.REACT_APP_DIR, 'out', 'index.html')
products_file_path = os.path.join(settings.REACT_APP_DIR, 'out', 'products.html')
error_file_path = os.path.join(settings.REACT_APP_DIR, 'out', '404.html')
# Create your views here.
def index(request):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
def products(request):
    try:
        with open(products_file_path) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')

def main_view(request,path):
    file_path_list=path.split('/')
    file_path = os.path.join(settings.REACT_APP_DIR, 'out')
    for p in file_path_list:
        file_path=os.path.join(file_path,p)
    file_path=f"{file_path}.html"
    print(file_path)
    try:
        with open(file_path) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        with open(error_file_path) as f:
            return HttpResponse(f.read())
