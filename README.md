# Livraisons Appro Frites

- `index.html` : appli des livreurs (tournée du jour, guidage Waze, validation des livraisons, position du camion).
- `suivi.html#<jeton>` : page de suivi pour les clients (heure d'arrivée estimée, position du camion).

Les données passent par la fonction Supabase `livraison`. Aucun code ni donnée client n'est stocké ici.

## Appli Android

Le dossier `android-app/` enveloppe l'appli web dans une appli Android (Capacitor) pour que le suivi GPS continue écran éteint.
L'APK est construit automatiquement par GitHub Actions et publié dans les « Releases » :
https://github.com/ringothomas/livraisons/releases/latest/download/Livraisons.apk
