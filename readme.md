# Virtual Workspace

Cette application web permet de gérer l’affectation d’employés à différentes zones d’un bâtiment.  
Elle inclut une interface interactive avec un plan d’étage, un système de rôles, un module d’ajout d’employés et des restrictions intelligentes.

---

## Fonctionnalités

### 1. Gestion des employés
- Ajouter un employé via une modale dédiée.
- Champs : Nom, Email, Téléphone, Rôle, Photo (URL), Expériences professionnelles.
- Validation avancée avec REGEX :
  - Nom sans chiffres.
  - Email uniquement en **@gmail.com**.
  - Téléphone commençant par **05, 06, 07** (format marocain).
- Prévisualisation automatique de la photo.
- Possibilité d'ajouter plusieurs expériences (date début/fin).

---

## 2. Plan interactif du bâtiment
Le plan contient **6 zones** :
- Salle de conférence  
- Réception  
- Salle des serveurs  
- Salle de sécurité  
- Salle du personnel  
- Archives  

Chaque zone possède :
- Un bouton **+** pour assigner un employé.
- Un system de validation selon les rôles.
- Un affichage des employés assignés.
- Une couleur rouge pâle si la zone est vide et obligatoire.

---

## 3. Règles d'affectation (Restrictions Logiques)

| Zone                | Rôles autorisés |
|--------------------|------------------|
| Réception          | Réceptionnistes |
| Salle des serveurs | Techniciens IT |
| Sécurité           | Agents de sécurité |
| Manager            | Toutes les zones |
| Ménage             | Toutes les zones sauf *Archives* |
| Autres             | Zones non restreintes |

---

## 4. Gestion avancée des employés
- Possibilité de **désassigner** un employé (bouton X).
- Affichage d’un **profil détaillé** :
  - Nom
  - Rôle
  - Email
  - Téléphone
  - Expériences
  - Localisation actuelle  
- Toutes les modales sont animées (slide / fade / zoom).

---

## 5. Responsive Design
- Interface adaptée Desktop / Mobile  
- Grille du plan réajustée  
- Avertissement en mode portrait  
- Animations fluides CSS

---

## 6. Capacité des zones (statique)
Une section affiche le **nombre maximum d’employés** par zone (ex : conférence 5, sécurité 4…).

---

## Technologies utilisées
- **HTML5**
- **CSS3 / TailwindCSS**
- **JavaScript**
- **Grid / Flexbox**
- **Modales animées (CSS animations)**

---

## Structure du projet
```
/project
│── js/
│ └── script.js
│── css/
│ └── style.css
│── image/
│ └── plan.jpg
│── README.md
│── index.html
---

## Validation
- Code HTML validé via **W3C Validator**
- Code CSS validé via **W3C CSS Validator**
- Les entrées du formulaire sont vérifiées via REGEX
