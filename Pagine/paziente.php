<html>
  <head>
    <title>HAP</title>
    <link rel="icon" href="HapHD.png" type="image/png" />
    <link rel="stylesheet" href="../css/stile_paziente.css" />
  </head>
  <body>
    <div id="title">HAP</div>
    <a href="">
      <div id="profilo">
        <img src="../Immagini/avatar.png" />
        <div id="info">
          Nome
          <br />
          Cognome
        </div>
      </div>
    </a>
    <input type="submit" id="bottone_scrivi" value="Scrivi" />
    <div id="menu">
      <ul id="riga">
        <li>
          <img src="../Icone/2x/round_menu_black_18dp.png" />
          <ul id="submenu">
            <br /><br />
            <li><button id="bottone">News</button></li>
            <br /><br />
            <li><button id="bottone">Chat</button></li>
            <br /><br />
            <li><button id="bottone">Prenotazione</button></li>
            <?php
             <div id="login">
            
        
      </div>
            ?>
            <br /><br />
            <li><button id="bottone">Calendario prenotazioni</button></li>
          </ul>
        </li>
      </ul>
    </div>
    <input type="text" placeholder="   Cerca news" />
    <div class="area_notifiche">
      <div id="bacheca"></div>
    </div>
    <p>Impostazioni</p>
    <script src="vediNews.js"></script>
    <script src="Chat.js"></script>
    <script src="Prenota.js"></script>
    <script src="Calendario.js"></script>
  </body>
</html>
