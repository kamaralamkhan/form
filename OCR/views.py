import json
from django.shortcuts import render
from django.http import JsonResponse
from .models import AnalysisResult
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def bulkmaster_view(request):
    return render(request, 'Bulkmaster1.html')

@csrf_exempt
def save_analysis_result(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            image_name = data.get('image_name')
            analysis_data = json.dumps(data.get('analysisData'))  # Convert to JSON string
            AnalysisResult.objects.create(image_name=image_name, analysis_data=analysis_data)
            return JsonResponse({'message': 'Analysis result saved successfully'})
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            return JsonResponse({'error': 'Invalid JSON data'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def display_analysis_results(request):
    # Retrieve analysis results from the database
    analysis_results = AnalysisResult.objects.all()  # You can adjust this query as needed

    # Prepare the data for sending to the frontend
    results_data = []
    for analysis_result in analysis_results:
        results_data.append({
            'image_name': analysis_result.image_name,
            'analysis_data': json.loads(analysis_result.analysis_data),  # Parse the stored JSON data
        })

    # Pass the data to the template
    context = {'analysis_results': results_data}

    # Render the template with the data
    return render(request, 'your_template.html', context)
