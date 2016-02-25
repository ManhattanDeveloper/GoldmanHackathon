# -*- coding: utf-8 -*-
"""
Created on Tue Feb 23 19:30:15 2016

@author: MohamedAbedelmalik
"""

from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()

print("Program Started")

"""
@sched.scheduled_job('interval', minutes=1)
def timed_job():
    print('This job is run every three minutes.')
"""
@sched.scheduled_job('cron', day_of_week='fri', hour=23, minute=15)
def scheduled_job():
    print('This job is run every weekday at 5pm.')

@sched.scheduled_job('cron', day_of_week='fri', hour=23, minute=14)
def scheduled_job():
    print('This job is run every weekday apm.')
    




sched.start()