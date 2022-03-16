from sre_constants import RANGE
import time
import serial
import rdm6300
import mysql.connector
import threading

def rfid(link): #lecture rfid et gestion du parametre "exterieur"
  reader = rdm6300.Reader(link)
  card = reader.read()
  if card:
    return card.valuer

        
def update (value_base, card, cursor, conn): #update est appelé afin de mettre à jour la base de donnée
  try:
    cursor.execute("UPDATE Poule SET Exterieur= '%s' WHERE id_poule= '%s';", (value_base, card.value))
    conn.commit()
  except KeyboardInterrupt:
    print("problème de modification")


def tunnel_RFID(link_entre , link_sorti) :
  entre_RFID = threading.Thread(target=rfid,args=link_entre)
  sorti_RFID = threading.Thread(target=rfid,args=link_sorti)



    # print(f"[{card.value}]")
    
    # conn = mysql.connector.connect(host="localhost", user="juju", password="12345", database="Poulailler")
    # cursor = conn.cursor()
      
    # position = cursor.execute(f"SELECT Exterieur FROM Poule WHERE id_poule = {card.value};")
    # position = cursor.fetchmany(1)[0][0]         
    
    # if position==0:
    #   update(1, card, cursor, conn)
    #   print(f"sortie")
      
    # elif position ==1:
    #   update(0, card, cursor, conn)
    #   print("entree")