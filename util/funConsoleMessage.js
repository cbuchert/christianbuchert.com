import { explodeGlyph } from "./animation/glyphAnimation";

export default function () {
  console.log(`Looking for the good stuff? Check out window.ChrisBuchert`);
}

if (typeof window !== "undefined") {
  window.ChrisBuchert = {
    getStarted: () => {
      console.log(`
Hey hey, you found me. As you can see, I'm still fleshing this out. While you're
waiting and I'm devving, here's some art for your troubles. :)
            `);
      explodeGlyph(200, 333);
    },
  };
}

const asciiArt = `                                                                                
                                                    ..::::+::.. ..              
                                                    ..:+++++++++K+.             
                                                       ..:+K00OOOK:             
                                       .::++.             +0OOOOOK:             
                                   .:+K00OO0:             +OOOOOOK:             
                        ...        .:+00OOO0:             +OOOOOO0+:.           
                        .........     .::+KK:             +OOOOOO0+++::..       
           ..::..           ..:::::...    ...             +0OOOOO0++++++::..    
        ..::++++::...          ..::+++::::...             +0OOOOO0++++++++++::..
       .::++++++++++::..           ..::+++++::...         +0OOOOO0+++++++++++++K
         ..:::+++++++++::..           ...::+++++::.       +0OOOOO0+++++++++K00OO
            ...::++++++++++::..            ..::++++.      +0OOOOO0+++++KK00OOOOO
                ..::++++++++++::..            ..:::.      +0OOOOO0K+K00OOOOOOOOO
                   .:++++++++++++++:..           ..       +0OOOOOO00OOOOOOOOOO0K
                ..::+++++++++++K00O0+::...                +0OOOOOOOOOOOOOOO0K:..
            ...::++++++++++KK00OOOO0++++++::..            +0OOOOOOOOOOOO0K+.    
         ..::+++++++++++K00OOOOOOOO0+++++++++::..         +0OOOOOOOO00K+++::..  
     ..:::++++++++++KK00OOOOOOOOOOO0+:+++++++++++:::..    +0OOOOO0KK++++++++++::
  ..::+++++++++++KK0OOOOOOOOOOOOOOOK:..:::+++++KK0OO0K+:..+0O00KK+++++++++++KK00
.::++++++++++KK00OOOOOOOOOO00OOOOOOK.    ..:K00OOOOOOOOOK++KK++++++++++++K00OOOO
..::++++++KK0OOOOOOOOOOO0K+:+OOOOOOK.      .KOOOOOOOOOO0KK+++++++++++KK00OOOOOOO
    ..:K00OOOOOOOOOOO0+:.  .+OOOOOOK.      .KOOOOOO00K++++++++++++K00OOOOOOOOOOO
      :0OOOOOOOOOOOO0+.    .+OOOOOOK.      :KOO00KK+++++++++++KK00OOOOOOOOOOOOOO
      :0OOOOOOOOOOOO0+     .+OOOOOOK.      .KKK++++++++++++K00OOOOOOOOOOOOOOOOOO
      :0OO0K++0OOOOO0:     .+OOOOOOK.  ...::+++++++++++KK00OOOOOOOOOO0K++0OOOOOO
      :K+:.. :0OOOOO0:     .+OOOOOOK:.:::+++++++++++K00OOOOOOOOOOO0K:.. .KOOOOOO
      ..     :0OOO00+:     .+OOOOOOK:.::++++++++++++K00OOOOOOO00KK+:.   .KOOOOOO
             :K0KK++:.     .+OOOOOOK.  ...::+++++++++++KK0000KK++++++::.:KOOOOOO
              .:::++:.     .+OOOOOOK.      ..::+++++++++++++++++++++++KK0OOOOOOO
                 ..::.     .+OOOOOOK.          ..::++++++++++++++++KK0OOOOOOOOOO
                           .+OOOOOOK.             ...::++++++++++++K0OOOOOOOO0K+
                           .+OOOOOOK.                 ..::+++++++++++K00OO0K+:. 
                           .+OOOOOOK.      .::..         ..:::+++++++++KK+..    
                           .+OOOOOOK.      .KO0K+:.          ..::+++K00O0:      
                           .+OOOO0K:.      .KOOOO00+:.          .:KOOOOO0:.     
                           .+00K+:.        .KOOOOOOOO0K+:.       :0OOOOO0:      
                            .:..           .KOOOOOOOOOOO0+.      :0OOOO0+.      
                                           .KOOOOOOOO0K+:.       :00K+:..       
                                           .KOOOO00K:..          .::.           
                                           .KO0K+:.                             
                                           .+K:.                                `;
