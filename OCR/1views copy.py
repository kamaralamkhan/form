import json
from django.shortcuts import render

from django.http import JsonResponse

# Create your views here.
from django.shortcuts import render, redirect
# from django.test import TransactionTestCase
from .models import AnalysisResult


def bulkmaster_view(request):
    return render(request, 'Bulkmaster1.html')
# In your Django view (views.py in your OCR app)

def save_analysis_result(request):
    if request.method == 'POST':
        image_name = request.POST.get('image_name')
        field_name = request.POST.get('field_name')
        field_content = request.POST.get('field_content')

        if image_name and field_name and field_content:
            # Create and save an AnalysisResult object
            analysis_result = AnalysisResult(
                image_name=image_name,
                field_name=field_name,
                field_content=field_content,
            )
            analysis_result.save()
            return JsonResponse({'message': 'Data saved successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def display_analysis_results(request):
    # Retrieve analysis results from the database
    analysis_data = AnalysisResult.objects.all()  # You can adjust this query as needed

    # Pass the data to the template
    context = {'analysis_data': analysis_data}

    # Render the template with the data
    return render(request, 'Bulkmaster1.html', context)