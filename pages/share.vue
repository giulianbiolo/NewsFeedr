//pagina creata solo per simulare i bottoni per la condivisione social

<template>
    <div>
      <a href="#" @click.prevent="shareFacebook">
        <button class="facebook">
          <i class="fab fa-facebook"></i> Condividi su Facebook
        </button>
      </a>
      <a href="#" @click.prevent="shareTwitter">
        <button class="twitter">
          <i class="fab fa-twitter"></i> Condividi su Twitter
        </button>
      </a>
      <a href="#" @click.prevent="shareInstagram">
        <button class="instagram">
          <i class="fab fa-instagram"></i> Condividi su Instagram
        </button>
      </a>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      shareFacebook() {
        const url = "https://www.corriere.it/";
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'facebook-share-dialog', 'width=626,height=436');
      },
      shareTwitter() {
        const url = "https://www.corriere.it/";
        const text = encodeURIComponent('Inserisci qui il testo della condivisione');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, 'twitter-share-dialog', 'width=626,height=436');
      },
      shareInstagram() {
        const url = "https://www.corriere.it/";
        window.open(`https://www.instagram.com/?url=${url}`, 'instagram-share-dialog', 'width=626,height=436');
      }
    }
  }
  </script>
  
  <style>
  .facebook {
    background-color: #3b5998;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .twitter {
    background-color: #1da1f2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .instagram {
    background-color: #c13584;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }
  </style>