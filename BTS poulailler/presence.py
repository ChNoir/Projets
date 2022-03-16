import RPi.GPIO as GPIO
import time


pin = 6 
led = 5 

def setup():
  GPIO.setwarnings(False)
  GPIO.setmode(GPIO.BCM)                          
  GPIO.setup(pin, GPIO.IN,pull_up_down=GPIO.PUD_UP)
  GPIO.setup(led, GPIO.OUT)

def presence():
  try:
    if GPIO.input(pin) == 1:           
      GPIO.output(led, GPIO.LOW)
    elif GPIO.input(pin) == 0:          
      GPIO.output(led, GPIO.HIGH) 
    time.sleep(1)
except KeyboardInterrupt:
    print("quitter")
    GPIO.cleanup()