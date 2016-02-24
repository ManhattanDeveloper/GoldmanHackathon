# -*- coding: utf-8 -*-
"""
Created on Tue Feb 23 17:30:05 2016

@author: MohamedAbedelmalik
"""
from twilio.rest import TwilioRestClient


def send(number, message):
    account_sid = "AC3a0f1edd1cea484b5dde987eef124dc3"
    auth_token = "7c60118184d4b86ac960edbe87227ab6"
    
    client = TwilioRestClient(account_sid, auth_token)
    
    message = client.messages.create(body=message,
        to=number, from_="+13473219669") 
        
    print (message.sid)