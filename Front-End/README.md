# Démarrage :

- Une fois le projet téléchargé et ouvert, faites un "npm i" dans le terminal de Vs Code pour installer toutes les dépendances
- C'est long et lourd la première fois mais node_modules est dans le .gitignore donc aucun soucis pour push sur github
- Lancer le projet "npm start"

# Organisation du code :

- Extensions comme vous voulez, JSX ou TSX
- Les routes des pages sont à rajouter dans App.tsx pour chaque nouvelle page (Navbar et Footer sont sur toutes les pages)
- Les pages dans le répertoire Pages (j'ai déjà inclu des pages de base sans rien dedans)
- Les components dans le répertoire Components (idem)

- CSS peut être écrit en CSS pur ou en Sass/SCSS (qui est la même chose mais permet une écriture plus lisible)
- CSS dans ./style/component ou ./style/pages pour le style correspondant au Component ou à la Page en question
- Le fichier CSS ./\_settings.scss inclu les styles généraux partagés par toute l'application
- Le fichier CSS ./index.scss : chaque nouveau fichier css/sass est à rajouter à l'export comme ceux déjà présents (plus organisé, ça évite de devoir importer le css pour chaque page)
- Le nom du fichier est écrit avec un underscore devant pour un import auto (comme '\_settings.scss')

Happy Hacking
