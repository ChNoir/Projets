import RPi.GPIO as GPIO
import time
 
pistonpin = 33
piston2pin = 35

val = 1
 
def setup():
    global pwm
    global pwm2
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(pistonpin, GPIO.OUT)
    GPIO.output(pistonpin, GPIO.LOW)
    pwm = GPIO.PWM(pistonpin, 1000) # Set Frequency to 1 KHz
    pwm.start(50) # Set the starting Duty Cycle
    GPIO.setup(piston2pin, GPIO.OUT)
    GPIO.output(piston2pin, GPIO.LOW)
    pwm2 = GPIO.PWM(piston2pin, 1000) # Set Frequency to 1 KHz
    pwm2.start(50)
     
def loop():
    while True:
      print ("début")
      pwm.ChangeDutyCycle(100)
      time.sleep(5)
      print("stop")
      pwm.ChangeDutyCycle(50)
      time.sleep(5)
      print("arrière")
      pwm.ChangeDutyCycle(0)
      time.sleep(5)
      print("stop")
      pwm.ChangeDutyCycle(50)
      time.sleep(5) 
      print ("début")
      pwm2.ChangeDutyCycle(100)
      time.sleep(5)
      print("stop")
      pwm2.ChangeDutyCycle(50)
      time.sleep(5)
      print("arrière")
      pwm2.ChangeDutyCycle(0)
      time.sleep(5)
      print("stop")
      pwm2.ChangeDutyCycle(50)
      time.sleep(5)     
      
      
      #print("avance s2")
      #for dc in range(0, 101, 20):
      #  pwm.ChangeDutyCycle(dc)
      #  time.sleep(1)
      #print("stop")
      #time.sleep(10)
      #print("recule s2")
      #for dc in range(100,-1, -20):
      #  pwm.ChangeDutyCycle(dc)
      #  time.sleep(1)
      #print("stop")
      #time.sleep(10)
      # 
      #print("avance s1")
      #for dc2 in range(0, 101, 20):
      #  pwm2.ChangeDutyCycle(dc2)
      #  time.sleep(1)
      #print("stop")
      #time.sleep(10)
      #print("recule  s1")
      #for dc2 in range(100,-1, -20):
      #  pwm2.ChangeDutyCycle(dc2)
      #  time.sleep(1)
      #print("stop")
      #time.sleep(10)          
         
def destroy():
    pwm.stop()
    GPIO.output(pistonpin, GPIO.LOW)
    pwm2.stop()
    GPIO.output(piston2pin, GPIO.LOW)
    GPIO.cleanup()
     
if  __name__ == '__main__':
    setup()
    try:
        loop()
    except KeyboardInterrupt:
        destroy() 
