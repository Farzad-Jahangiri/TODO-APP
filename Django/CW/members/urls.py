from django.urls import path
from . import views

urlpatterns = [
    path('members/all', views.getAll, name='member_all'),
    path('members/insert', views.Insert, name='member_insert'),
    path('members/update', views.Update, name='member_update'),
    path('members/delete', views.Delete, name='member_delete'),
    # path('members/sortByCount', views.sortByCount, name='member_sortByCount'),
]