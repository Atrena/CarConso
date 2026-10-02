<p align="center">
  <img src="store/banner-fr-1024x500.png" alt="CarConso" width="640">
</p>

<p align="center">
  <strong>Suivi de consommation et de coûts pour ta voiture</strong><br>
  Simple, hors ligne, sans compte et sans publicité. En français et en anglais.
</p>

<p align="center">
  <a href="https://atrena.github.io/CarConso/">Version web</a> ·
  <a href="https://github.com/Atrena/CarConso/releases/latest">Télécharger l'APK</a> ·
  <a href="https://atrena.github.io/CarConso/confidentialite.html">Confidentialité</a> ·
  <a href="README.md">English version</a>
</p>

---

## Fonctionnalités

| | |
|---|---|
| ⛽ **Pleins** | Quantité, prix, compteur ou distance, pleins partiels, mélanges de carburants compatibles (ex. SP-95 E10 + E85). |
| 🚗 **Plusieurs véhicules** | Essence ou gazole, capacité du réservoir, carburants proposés, carburant par défaut. |
| 🔧 **Frais** | Entretien, assurance, péages… ponctuels ou récurrents (mensuels, annuels…). |
| 📊 **Statistiques** | Conso moyenne, coût au km, comparaison par carburant, dépenses mensuelles, prévisions, filtre par période. |
| 🧮 **Simulateur** | Quel carburant revient le moins cher aux 100 km selon les prix à la pompe, et prix limite de rentabilité de l'E85. |
| 🌍 **Langue et pays** | Français ou anglais, détecté automatiquement. Le pays fixe le nom et la liste des carburants (SP-95 en France, Regular / Premium aux États-Unis, Super E10 en Allemagne…) et les unités par défaut. |
| 🎨 **Personnalisation** | Thème clair / sombre, couleur, taille du texte, affichage compact, unités (L/100 km, km/L, mpg, km ou miles, litres ou gallons US, devise), écran d'ouverture, onglets affichés. |
| 💾 **Données** | Sauvegarde / restauration par fichier, exports CSV pour Excel. Dans l'app Android : sauvegarde automatique avec la sauvegarde Google du téléphone. |

Pays pris en charge : France, Belgique, Luxembourg, Suisse, Canada, Royaume-Uni, Irlande,
États-Unis, Allemagne, Autriche. Les autres pays utilisent des noms de carburants internationaux.

## Confidentialité

Aucune donnée n'est collectée : pas de compte, pas de serveur, pas de statistiques
d'utilisation. Tout reste sur ton appareil, et l'app Android ne demande aucune
autorisation. Détails : [politique de confidentialité](https://atrena.github.io/CarConso/confidentialite.html).

## Installation

- **Android** : télécharge l'APK depuis la [dernière version](https://github.com/Atrena/CarConso/releases/latest)
  (il faut autoriser l'installation d'applications inconnues). Bientôt sur Google Play.
- **iPhone, ordinateur ou Android sans installation** : ouvre la
  [version web](https://atrena.github.io/CarConso/), puis ajoute-la à l'écran d'accueil
  (Chrome : menu ⋮ › *Installer l'application* ; Safari : Partager › *Sur l'écran d'accueil*).

Les données de la version web et de l'app sont séparées : pour passer de l'une à
l'autre, utilise *Paramètres › Données › Sauvegarde complète* puis *Restaurer depuis un fichier*.

## Comment la consommation est calculée

CarConso utilise la méthode **plein à plein** :

- la distance saisie est celle parcourue **depuis le plein précédent** ;
- les litres d'un plein complet remplacent exactement ce qui a été consommé sur cette
  distance ; les pleins partiels s'additionnent jusqu'au plein complet suivant ;
- le premier plein complet sert de **référence** (sa distance est facultative) : la première
  conso apparaît au suivant ;
- la conso est attribuée au carburant **qui était dans le réservoir** (celui du plein
  précédent), ce qui rend fiable la comparaison entre carburants et mélanges ;
- le coût d'un trajet utilise le prix payé pour ce carburant : le coût au km ne compte
  jamais le carburant encore dans le réservoir.

## Développement

Voir le [README en anglais](README.md#development) (structure du code, version web,
application Android, traductions).

## Licence

CarConso est un logiciel libre distribué sous licence [GNU GPL v3](LICENSE) (ou toute version
ultérieure) : tu peux l'utiliser, l'étudier, le modifier et le redistribuer, à condition que
les versions modifiées restent sous la même licence.

## Crédits

Conçue par [Atrena](https://github.com/Atrena), développée avec l'aide de
[Claude](https://claude.ai) (Anthropic). Graphiques : [Chart.js](https://www.chartjs.org/) (licence MIT).
