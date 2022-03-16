import datetime
from math import sin, asin, cos, acos, floor, ceil
from cmath import pi

#--recuperation de date--#
def date():
    now = datetime.datetime.now()
    print(now.year, now.month, now.day, now.hour, now.minute, now.second)

    return now
#------------------------#

#--calcul lever/coucher du soleil--#
def soleil():
    now = date()
    #--calcul rang du jour dans l'année--#
    N1 = floor((now.month * 275) / 9)
    N2 = floor((now.month + 9) / 12)
    K = 1 + floor((now.year - 4 * floor(now.year / 4) + 2) / 3)
    N = N1 - N2 * K + now.day - 30
    #-----------------------------------#

    # --Données--#
    Latitude = 49.154 / 180 * pi  # [radian]
    Longitude = 5.875  # [degré]
    rang = N  # rang du jour dans l'année (1er janvier = 1)
    annee = now.year

    if annee % 4 == 0 and annee % 100 != 0 or annee % 400 == 0:
        Heure_ete = 87
        Heure_hiver = 297
    else:
        Heure_ete = 86
        Heure_hiver = 296
    #

    # --Calcul de la déclinaison--#
    M = (356.6843 + 0.9856 * rang) % 360  # l'anomalie moyenne [degré]
    C = 1.914 * sin(M * pi / 180) + 0.02 * sin(2 * M * pi / 180)  # Equation du centre (Influence du l'éllipticité de orbite terrestre) [radian]
    L = (280 + C + 0.9856 * rang) % 360  # La longitude vrai du soleil [degré]
    R = -2.465 * sin(2 * L * pi / 180) + 0.05303 * sin(
        4 * L * pi / 180)  # reduction à l'equateur (influence de l'inclinaison de l'axe terrestre) [radian]
    Declinaison = asin(0.397731 * sin(L * pi / 180))  # Declinaison du soleil [radian]
    #

    # --L'equation du temps--#
    equation_temp = (C + R) * 4  # La variation annuelle de l'écart entre le midi solaire et le midi moyen [Minutes]
    #

    # --L'angle horaire--#
    Ho = acos((-0.01454 - sin(Declinaison) * sin(Latitude)) / (cos(Declinaison) * cos(
        Latitude))) / pi * 180  # L'angle horaire Ho du Soleil au moment où son bord supérieur est sur l'horizon [radian]
    #

    # --Calcul du lever et coucher du soleil--#
    Lever1 = 12 - Ho / 15 + equation_temp / 60 + Longitude / 15 + 10 / 60
    Lever2 = ceil((Lever1 % 1) * 60)
    coucher1 = 12 + Ho / 15 + equation_temp / 60 + Longitude / 15 + 10 / 60
    coucher2 = ceil((coucher1 % 1) * 60)

    if Heure_ete <= rang <= Heure_hiver:
        Lever1 = Lever1 + 1
        coucher1 = coucher1 + 1
    #

    # --Affichage--#
    print(f"heure de lever: {floor(Lever1)}:{Lever2}")
    print(f"heure de coucher: {floor(coucher1)}:{coucher2}")

    heure = [Lever1, Lever2, coucher1, coucher2,]
    return heure
    #
#------------------------------------#