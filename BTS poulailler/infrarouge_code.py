import RPi.GPIO as GPIO
import time

#--données--#
pin = 6 
#-----------#

def setup():
  GPIO.setwarnings(False)
  GPIO.setmode(GPIO.BCM)                           
  GPIO.setup(pin, GPIO.IN,pull_up_down=GPIO.PUD_UP)


def infrarouge():
  try:
    if GPIO.input(pin) == 1:
      print(f"aucun objet détecté")
    elif GPIO.input(pin) == 0:
      print(f"objet détécté")
    time.sleep(1)
  
  except KeyboardInterrupt:
    print("quitter")
    GPIO.cleanup()