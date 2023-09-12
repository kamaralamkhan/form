from django.db import models

# Create your models here.
# models.py in your OCR app
class AnalysisResult(models.Model):
    image_name = models.CharField(max_length=255, null=True)
    field_name = models.CharField(max_length=255,null=True)
    field_content = models.TextField(null=True)

# class AnalysisResult(models.Model):
#     image_name = models.CharField(max_length=255, null=True)
#     field_data = models.JSONField(null=True)

