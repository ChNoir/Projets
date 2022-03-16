from math import floor
import date_et_horaire as dh
import lecteur_rfid as lecteur
import Verin_motoreducteur as vm

#--lancement du programme--#
if __name__ == "__main__":
    now = dh.date()
    heure = dh.soleil()
    jour = 1
    
    vm.setup()
    while True:  
      if now.hour == floor(heure[0]) and now.minute == heure[1] : # si il est l'eure d'ouvrire
        try :
          jour = vm.loop(1) # 1 correspond à ouverture de la volière
        except KeyboardInterrupt:
          vm.destroy()
      elif now.hour == floor(heure[2]) and now.minute == heure[3] : # si il est l'heure de fermer
        try :
          jour = vm.loop(2) # 2 correspond à fermeture de la volière
        except KeyboardInterrupt:
          vm.destroy()
        
      if jour == 1: # si il fait jour
        lecteur.rfid()
#-------------------------#