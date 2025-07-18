import pyautogui as pg
import keyboard

### ==== FUNCOES ==== ###

def check_battle():
    try:
        # Tenta localizar a imagem na tela dentro da região especificada
        coordenada = pg.locateOnScreen('imagensBOT/battleLIST.PNG')
        return coordenada
    except pg.ImageNotFoundException:
        return None

while True:
    keyboard.wait('h') 
    coordenada = check_battle()
    print(coordenada)
    if coordenada is None:
        pg.press('space')
        print('Apertei')


# def kill_monster():
#     while True:
#         keyboard.wait('h') 
#         coordenada = check_battle()
#         #print("rodei a func1")
#         if coordenada is None:
#             pg.press('space')

#             try: 
#                 ataque = pg.locateOnScreen('imagensBOT/bordaATK.PNG',confidence=0.8, region=REGION_BATTLE) != None:
#             c
#             while pg.locateOnScreen('imagensBOT/bordaATK.PNG',confidence=0.8, region=REGION_BATTLE) != None:
#                 print("esperando mob morrer")


kill_monster()
