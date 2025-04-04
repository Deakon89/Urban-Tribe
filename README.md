[Urban-Tribe](https://urban-tribe.netlify.app/)


# Urban Tribe

## 📌Descrizione
Urban Tribe è un progetto nato per promuovere uno stile di vita urbano sostenibile, collaborativo e inclusivo. Miriamo a valorizzare l'ambiente urbano come luogo di incontro e crescita comunitaria, credendo fermamente nel potere della condivisione e nella cura degli spazi cittadini.

---

## 📌Funzionalità
- **Gestione Utenti:** permette di visualizzare i dettagli degli utenti e permette di aggiungerne nuovi.
- **Visualizzazione Post:** gli utenti possono vedere i post, i dettagli correlati e i commenti.
- **Aggiunta Commenti:** gli utenti possono aggiungere commenti ai post.
- **Dashboard Dinamica:** visualizzazione e gestione delle informazioni utente attraverso una dashboard interattiva.

---

## 📌Utilizzo App
UT è una web app molto semplice da usare, nella home si dovrà cliccare il button login che farà apparire la barra di inserimento del token.
Nel caso il token non fosse disponibile in basso al "div" che contiene il login c'è un link "get the token".

Dopo aver effettuato l'accesso si passa al profilo Admin che ha un button Dashboard e uno Logout, quest'ultimo reindirizza alla home, mentre il primo porta alla dashboard per la gestione utenti  che permette di visualizzare la lista completa delle persone attive e non attive presenti nel sistema(è possibile aggiungere nuovi utenti) e di visualizzarne i dettagli e i post personali.

Dalla dashboar possiamo o effettuare un logout, che ci riporta alla home, o passare a visualizzare tutti i post caricati nel sistema con i loro commenti.
Questa sezione permette di aggiungere post(selezionando l'id di un utente) e aggiungere commenti ai post gia presenti. 

---

## 📌Tecnologie Utilizzate
- Angular 19
- Angular Material
- RxJS
- Ngx cookie service
- @angular/animations
- karma & jasmine per il testing

## 📌Installazione
Per eseguire questo progetto localmente, segui questi passi nel tuo ambiente di sviluppo:

```bash
git clone https://github.com/tuo-username/urban-tribe.git
---
cd urban-tribe
---
npm install(dipendenze necessarie Angular-CLI, AngularMaterial, ngx cookie service, angular/animations)
---
ng serve