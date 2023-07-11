from django.http import HttpResponse
from django.template import loader
from rest_framework.decorators import api_view
from rest_framework.response import Response
from members.models import Member
from members.serializers import MemberSerializer
import json

@api_view(['GET'])
def getAll(request):
  members = Member.objects.all()
  serializer = MemberSerializer(members, many=True)
  return Response(serializer.data)


@api_view(['POST'])
def Insert(request):
  data=request.data
  member=Member(title = data['title'], caption = data['caption'], date = data['date'])
  member.save()
  return Response(200)

@api_view(['POST'])
def Update(request):#id,caption
  data=request.data
  members = Member.objects.all()
  for i in members:
    if i.id==int(data['id']):
      i.caption=data['caption']
      i.save()
      return Response(200)
  return Response(400)


@api_view(['POST'])
def Delete(request):#id
  data=request.data
  members = Member.objects.all()
  for i in members:
    if i.id==int(data['id']):
      i.delete()
      return Response(200)
  return Response(400)

