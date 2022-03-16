import RPi.GPIO as GPIO
import datetime
import time
import infrarouge_code as rouge


#--données--#
pistonpin = 33 # pin motoreducteur
piston2pin = 35 # pin vérin
#-----------#

#--données pour l'utilisation vérin/motoreducteur--#
def setup():
    global pwm
    global pwm2
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(pistonpin, GPIO.OUT)
    GPIO.output(pistonpin, GPIO.LOW)
    pwm = GPIO.PWM(pistonpin, 1000) # choix d'une frequence de 1 KHz
    pwm.start(50) # definition du debut du rapport cyclique
    GPIO.setup(piston2pin, GPIO.OUT)
    GPIO.output(piston2pin, GPIO.LOW)
    pwm2 = GPIO.PWM(piston2pin, 1000) # choix d'une frequence de 1 KHz
    pwm2.start(50) # definition du debut du rapport cyclique
#------------------------------------------------#

#--fonction commande du vérin/motoreducteur--#
def loop(heure):
    if heure == 2:
        print ("fermeture")
        pwm.ChangeDutyCycle(100)
        time.sleep(5)
        pwm2.ChangeDutyCycle(100)
        jour = 0
        
    if heure == 1:
        print("ouverture")
        pwm.ChangeDutyCycle(0)
        pwm2.ChangeDutyCycle(0)
        jour = 1
    print("arret")
    pwm.ChangeDutyCycle(50)
    pwm2.ChangeDutyCycle(50)
    return jour

def destroy():
    pwm.stop()
    GPIO.output(pistonpin, GPIO.LOW)
    pwm2.stop()
    GPIO.output(piston2pin, GPIO.LOW)
    GPIO.cleanup()
#---------------------------------------------#
