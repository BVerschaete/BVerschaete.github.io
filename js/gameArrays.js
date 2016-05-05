/**
 * Created by basti on 24/03/2016.
 */

/**
 * Globale variabelen; Dit zijn constructors zodat we aan de hand van een indexnummer gemakkelijk nieuwe
 * attackers of torens kunnen maken, deze staan in een aparte javascript file omdat er anders problemen
 * zijn met afhankelijkheden als andere javascript files nog niet geladen zijn
 */
var attackerTypes=[Attacker, TankAttacker, SpeedAttacker, BossAttacker];
var towerTypes = [Tower, Tower2, Tower3, LaserTower, FreezeTower];