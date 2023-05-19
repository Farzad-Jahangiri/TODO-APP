from django.db import models
from django.utils import timezone

class Member(models.Model):
  title = models.CharField(max_length=100, default=timezone.now)
  caption = models.CharField(max_length=255)
  date = models.CharField(max_length=255)