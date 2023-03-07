const openai_api_key = 'API-KEY';
const openai_api_url = 'https://api.openai.com/v1/images/generations';

async function generateImage(prompt) {//funzione asincrona chiamata generateImage che accetta un parametro chiamato prompt, che rappresenta la stringa di testo che utilizzeremo per generare l'immagine.
    const body = {
      model: 'image-alpha-001',//modello
      prompt: prompt,
      num_images: 1,// numero di img generate
      size: '512x512',//dimensione dell img generata in pixel
    };
  
    const response = await fetch(openai_api_url, {
    //Questa riga di codice utilizza la funzione fetch per inviare una richiesta 
    //HTTP POST all'API di OpenAI con i seguenti parametri: openai_api_url
    //ovvero L'URL dell'endpoint API a cui si vuole fare la richiesta.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',//Indica il tipo di contenuto della richiesta, che in questo caso è JSON.
        'Authorization': `Bearer ${openai_api_key}`,
        //specificando la chiave API di OpenAI. Il valore Bearer ${openai_api_key} 
        //indica che l'autorizzazione utilizza il protocollo Bearer Token, con la
        // chiave API di OpenAI passata come token.
      },
      body: JSON.stringify(body),
      //Il corpo della richiesta viene passato come oggetto JavaScript body, 
    //che viene convertito in una stringa JSON utilizzando il metodo JSON.stringify. 
    //Questo oggetto body contiene le opzioni di generazione dell'immagine che abbiamo 
    //definito in precedenza.
    });
  
    const result = await response.json();
    //Questa riga di codice utilizza il metodo json() dell'oggetto Response 
    //restituito dalla funzione fetch() per analizzare il corpo della risposta
    // HTTP come JSON e restituire i dati come un oggetto JavaScript.
    // La parola chiave await viene utilizzata per attendere la risoluzione della promessa 
    // restituita dal metodo json(), che analizza il corpo della risposta HTTP come JSON. 
    //Questo metodo restituisce una promessa che si risolve con un oggetto JavaScript 
    //che rappresenta i dati della risposta
  
    if (result.data && result.data.length > 0 && result.data[0].url) {
      const url = result.data[0].url;//Se tutte le verifiche sono vere, assegna l'URL dell'immagine alla variabile url
      return url;//ritorna l url dell immagine generata
    } else {//altrimenti ritorna un mex di errore
      throw new Error('Impossibile generare l\'immagine. Verifica che il prompt sia corretto e che la tua chiave API sia valida.');
    }
  }
    
  function showImage(url) {// Questa funzione viene chiamata con l'URL dell'immagine come parametro
    var div = document.getElementById('immagine');// Otteniamo il div dell'immagine dall'ID "immagine"
    if (div) {// Verifichiamo che il div esista
      var img = div.querySelector('#imgGen');// Otteniamo l'elemento img all'interno del div usando il selettore CSS "#imgGen"
      div.style.display = 'block';//impostiamo lo stile "display" del div su "block" per renderlo visibile
      img.src = url;// Impostiamo l'URL dell'immagine come valore dell'attributo "src" dell'elemento img
    }
  }
    
  document.getElementById("prompt").addEventListener("submit", async function(event) {
    event.preventDefault();//questa funzione evita che il browser aggiorni la pagina dopo l'invio del form
    try {
      const url = await generateImage(document.getElementById("text-input").value);//assegno l'url generato dalla funzione generaImg a una var
      showImage(url);
    } catch(error) {
      console.error(error);
    }
  });