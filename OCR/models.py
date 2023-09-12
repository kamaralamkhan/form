from django.db import models

# Create your models here.
# models.py in your OCR app
class AnalysisResult(models.Model):
    image_name = models.CharField(max_length=255, null=True)
    analysis_data = models.JSONField(null=True)  # Store JSON data here


# class AnalysisResult(models.Model):
#     image_name = models.CharField(max_length=255, null=True)
#     field_data = models.JSONField(null=True)

