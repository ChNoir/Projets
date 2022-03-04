
import random
import time
import serial
import rdm6300



reader = rdm6300.Reader('/dev/ttyAMA0')
print("Please insert an RFID card")

while 1: 
  card = reader.read()
  if card:
    print(f"[{card.value}]")
    return card.value
        
#test_string = "Je teste le port série 1 2 3 4 5".encode('utf-8')
#port_list = ["/dev/ttyAMA0","/dev/ttyAMA0","/dev/ttyS0","/dev/ttyS"]
#for port in port_list:
#  try:
 #   serialPort = serial.Serial(port, 9600, timeout = 2)
#    print ("Port Série", port, " ouvert pour le test:")
 #   bytes_sent = serialPort.write(test_string)
 ##   print ("Envoyé", bytes_sent, "octets")
#    loopback = serialPort.read(bytes_sent)
 #   if loopback == test_string:
 #     print ("Reçu ",len(loopback), "octets identiques. Le port", port,"fonctionne bien ! \n")
#    else:
#      print ("Reçu des données incorrectes:", loopback, "sur le port série", port, "bouclé \n")
#    serialPort.close()
#  except IOError:
#    print ("Erreur sur", port,"\n")


#print(random.randint(1, 20))
#GPIO.setmode(GPIO.BOARD)
#GPIO.setup(10, GPIO.IN)

#password=input("What's your password?")
#while password!="1234":
#  print("Error")
#  time.sleep(2)
#  password=input("What's your password?")
#
#print("Password correct")
#
#while 1:
#
#  GPIO.input(10)