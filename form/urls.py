"""form URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django import views
from django.contrib import admin
from django.urls import path
from OCR.views import save_analysis_result, bulkmaster_view, display_analysis_results

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', bulkmaster_view, name='bulkmaster_view'),
    path('save-analysis-result/', save_analysis_result, name='save_analysis_result'),
    path('display-analysis-results/', display_analysis_results, name='display_analysis_results'),
]
