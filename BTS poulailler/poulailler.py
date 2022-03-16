import mysql.connector
import signal
import time
import paho.mqtt.client as mqtt

#############################
# Definition du client mqtt #
#############################

mqtt_client =  mqtt.Client () 

########################
# Definition du broker #
########################

broker = '5.196.95.208' # broker publique
port = 1883

######################################
# Definition du domain et des topics #
######################################

domain = "BTSpoulailler2022/"
pubTopic = ["code_alerte","batterie", "pong"]
subTopic =  ["ping","remove_poule","add_poule", "heures","reload"]

################################
# Definition du client mariadb #
################################

conn = mysql.connector.connect( host="localhost",  user="juju", password="12345", database="Poulailler")
mysql_client = conn.cursor()

##########################
# Definisiton des clases #
##########################

class struc_msg () :
    payload = ""
    topic = ""
    QoS = 0

    def __init__(self, payload , topicSansDomain , QoS = 0):
        self.payload = payload
        self.topic = domain + topicSansDomain
        self.QoS = QoS


class struc_queue () :
    _lites = []
    
    def add (self ,element) :
        self._lites.append(element)


    def pop (self) :
        if len(self._lites) > 0 :
            return self._lites.pop(0)
        else :
            return None


########################
# Definition des queue #
########################

sub_msg = struc_queue()
pub_msg = struc_queue()

###########################
# Definition des Function #
###########################

def on_connect (client , userdata , flags , rc) :
    print("Connecté")
    #définition des abonement
    for topic in subTopic :
        client.subscribe(( domain + topic ))
        

def on_message(client, userdata, msg):
    global sub_msg
    sub_msg.add(msg)

    
def on_disconnect(client, userdata,rc):
    print("Disconnected")
    client.loop_stop()


def handler(signum, frame):
    print ("",end="\r")
    res = input("Ctrl-c was pressed. Do you really want to exit? y/n ")
    if res == 'y':
        mqtt_client.disconnect()
        mqtt_client.loop_stop()
        mysql_client.close()
        exit(1)


signal.signal(signal.SIGINT, handler)

########################
# Definition du client #
########################

mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.on_disconnect = on_disconnect
mqtt_client.connect(broker,port)
mqtt_client.loop_start ()

########
# Loop #
########

while True :  
    time.sleep(1)
    ################
    # MQTT get msg #
    ################
    sub = sub_msg.pop()
    if sub != None :
        #Recupere un message de la centrale
        global payload ,topic
        payload = str(sub.payload.decode("utf-8"))
        topic = sub.topic.replace(domain,"")
        print(f"[sub] massage : {payload} , topic : {topic}")
        ####################
        if topic == "ping" :
            pub_msg.add(struc_msg("1","pong"))
        ####################
        if topic == "add_poule" :
            mysql_client.execute("INSERT INTO Poule (id_poule) VALUES (" + payload + ");")
            conn.commit()
            time.sleep(1)
            t = mysql_client.execute("SELECT * FROM Poule ;")
            print ( f"{mysql_client.fetchmany()}")
        ####################
        if topic == "remove_poule" :
            mysql_client.execute("DELETE FROM Poule WHERE id_poule = " + payload + ";")
            conn.commit()
        ####################
        if topic == "heures" : 
            i=1
        ####################
        if topic == "reload" :
            mysql_client.execute("DELETE FROM Poule")
            id_poule = payload.split(":")
            for id in id_poule :
                mysql_client.execute("INSERT INTO Poule (id_poule) VALUES (" + id + ");")
            conn.commit()
        ####################
            

    #################
    # MQTT send msg #
    #################
    pub = pub_msg.pop()
    if  pub != None :
        print(f"[pub] payload : { pub.payload} , topic : { pub.topic}")
        mqtt_client.publish( pub.topic , pub.payload , pub.QoS)
    #autre programme
    
   
