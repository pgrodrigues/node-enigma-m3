# Enigma M3 simulator

A TypeScript implementation of the Enigma M3 encryption machine used during World War II.

Key features:

- Core components of the Enigma: plugboard, rotors and reflector.
- Rotor stepping and turnover, including the infamous double stepping anomaly.
- Configurable Enigma settings in JSON format.
- Optional logging of every letter permutation.

## About Enigma

The Enigma M3 was a remarkable electro-mechanical cypher machine used by the German Navy (Kriegsmarine). This device, part of a series designed by the German engineer Arthur Scherbius in the early 20th century, had a pivotal role in the encryption and decryption of military communications, safeguarding the secrecy of critical information during World War II.

The Enigma M3 posed a formidable challenge to Allied codebreakers. A significant breakthrough occurred in Poland through the reverse engineering of this machine, followed by tireless decryption efforts, most notably at Bletchley Park in the United Kingdom. These endeavors played a vital role in Allied intelligence during the war by providing invaluable insights into German military strategies and communications.

While the successful deciphering of the Enigma code marked a momentous achievement, the Enigma M3, with its intricate design and advanced encryption capabilities, continues to stand as an enduring symbol of wartime cryptography. It epitomizes the enduring battle of wits between those who create codes and those who seek to break them, illustrating the enduring legacy of this extraordinary era in the history of encryption. [1]

## How it works

Enigma operates as a rotor machine to achieve polyalphabetic substitution. This means the letter substitution scheme is not fixed but changes with the propagation of Enigma's rotating ciphering wheels and thus, with the letter's position in a text. The wheels advance stepwise with every keystroke, thereby triggering, in some positions, the adjacent wheel to the left to perform a step as well, pretty much as in a mechanical counter. Inside a wheel each letter position is biuniquely rendered to another position through a fixed set of wires. By combining and rotating the wheels, however, a very complex substitution code is obtained. Furthermore, the inner wiring as a whole can be rotated against the outer position indicator ring and, more importantly, against the trigger notches (this is known as "ring setting"). In some models, pairs of letters can be additionally swapped by interconnecting plugs ("stecker") on a plugboard via cables. [2]

Enigmas are equipped with a typewriter-like keyboard for input, while output is shown on a lampboard that in its layout resembles the keyboard. With every keystroke, the signal is routed first through the plugboard (if present), then through the fixed entry wheel and the rotor set, arriving at the reflector wheel. From there it is sent back on a different path – but with all rotor positions still the same – through the rotors, the entry wheel and again the plugboard until it reaches the lampboard where it lights the bulb corresponding to the substitute letter. A letter was therefore never encoded to itself, which would prove to be Enigma's most serious weakness. The symmetrized signal path and the resulting symmetric encryption however make it possible to decipher a message using the same machine setting it was encrypted with. [2]

<p align="center">
  <img src="https://www.ciphermachinesandcryptology.com/img/enigma/hires-wehr3.jpg" alt="Enigma M3" width="216" height="300">
  <img src="https://www.ciphermachinesandcryptology.com/img/enigma/hires-wehr3rotors.jpg" alt="Enigma M3 rotors" width="321" height="300">
   <img src="https://www.ciphermachinesandcryptology.com/img/enigma/hires-wehrmachtkey-stab.jpg" alt="Enigma M3 key sheet" width="410" height="300">
  <p align="center">
    On the left an original Enigma M3, in the center 3 of the rotors used and on the right a key sheet [3]
  </p>
</p>

An Enigma machine's setting (its cryptographic key in modern terms) specified each operator-adjustable aspect of the machine:

- Wheel order (Walzenlage) – the choice of rotors and the order in which they are fitted.
- Ring settings (Ringstellung) – the position of each alphabet ring relative to its rotor wiring.
- Plug connections (Steckerverbindungen) – the pairs of letters in the plugboard that are connected together.
- In very late versions, the wiring of the reconfigurable reflector.
- Starting position of the rotors (Grundstellung) – chosen by the operator, should be different for each message.

For a message to be correctly encrypted and decrypted, both sender and receiver had to configure their Enigma in the same way; rotor selection and order, ring positions, plugboard connections and starting rotor positions must be identical. Except for the starting positions, these settings were established beforehand, distributed in key lists and changed daily. [4]

## Install

```bash
npm install
```

## Testing

Besides unit tests, original cyphered messages from that period [3] were also included. In order to run the tests:

```bash
npm test
```

### Enigma Instruction Manual, 1930

This message is taken from a German army instruction manual for the Enigma I (interoperable with the later navy machine, Enigma M3).

Encrypted message:

`GCDSE AHUGW TQGRK VLFGX UCALX VYMIG MMNMF DXTGN VHVRM MEVOU YFZSL RHDRR XFJWC FHUHM UNZEF RDISI KBGPM YVXUZ`

Decrypted message:

`FEIND LIQEI NFANT ERIEK OLONN EBEOB AQTET XANFA NGSUE DAUSG ANGBA ERWAL DEXEN DEDRE IKMOS TWAER TSNEU STADT`

Readable format:

_(German)_ `Feindliche Infanterie Kolonne beobachtet. Anfang Südausgang Bärwalde. Ende 3km ostwärts Neustadt.`

_(English)_ `Enemy infantry column was observed. Beginning [at] southern exit [of] Baerwalde. Ending 3km east of Neustadt.`

Settings:

```json
{
  "plugboard": ["AM", "FI", "NV", "PS", "TU", "WZ"],
  "reflector": "A",
  "ringOffset": "XMV",
  "rotors": [
    { "position": "A", "type": "II" },
    { "position": "B", "type": "I" },
    { "position": "L", "type": "III" }
  ]
}
```

### Operation Barbarossa, 1941 (part 1)

Sent from the Russian front on 7th July 1941.

Encrypted message:

`EDPUD NRGYS ZRCXN UYTPO MRMBO FKTBZ REZKM LXLVE FGUEY SIOZV EQMIK UBPMM YLKLT TDEIS MDICA GYKUA CTCDO MOHWX MUUIA UBSTS LRNBZ SZWNR FXWFY SSXJZ VIJHI DISHP RKLKA YUPAD TXQSP INQMA TLPIF SVKDA SCTAC DPBOP VHJK`

Decrypted message:

`AUFKL XABTE ILUNG XVONX KURTI NOWAX KURTI NOWAX NORDW ESTLX SEBEZ XSEBE ZXUAF FLIEG ERSTR ASZER IQTUN GXDUB ROWKI XDUBR OWKIX OPOTS CHKAX OPOTS CHKAX UMXEI NSAQT DREIN ULLXU HRANG ETRET ENXAN GRIFF XINFX RGTX`

Readable format:

_(German)_ `Aufklärung abteilung von Kurtinowa nordwestlich Sebez [auf] Fliegerstraße in Richtung Dubrowki, Opotschka. Um 18:30 Uhr angetreten angriff. Infanterie Regiment...` (continues in part 2)

_(German)_ `Reconnaissance division from Kurtinowa north-west of Sebezh on the flight corridor towards Dubrowki, Opochka. Attack begun at 18:30 hours. Infantry Regiment...` (continues in part 2)

Settings:

```json
{
  "plugboard": ["AV", "BS", "CG", "DL", "FU", "HZ", "IN", "KM", "OW", "RX"],
  "reflector": "B",
  "ringOffset": "BUL",
  "rotors": [
    { "position": "B", "type": "II" },
    { "position": "L", "type": "IV" },
    { "position": "A", "type": "V" }
  ]
}
```

### Operation Barbarossa, 1941 (part 2)

Sent from the Russian front on 7th July 1941.

Encrypted message:

`SFBWD NJUSE GQOBH KRTAR EEZMW KPPRB XOHDR OEQGB BGTQV PGVKB VVGBI MHUSZ YDAJQ IROAX SSSNR EHYGG RPISE ZBOVM QIEMM ZCYSG QDGRE RVBIL EKXYQ IRGIR QNRDN VRXCY YTNJR`

Decrypted message:

`DREIG EHTLA NGSAM ABERS IQERV ORWAE RTSXE INSSI EBENN ULLSE QSXUH RXROE MXEIN SXINF RGTXD REIXA UFFLI EGERS TRASZ EMITA NFANG XEINS SEQSX KMXKM XOSTW XKAME NECXK`

Readable format:

_(German)_ `... 3 geht langsam aber sicher vorwärts. 17:06 Uhr röm eins InfanterieRegiment 3 auf Fliegerstraße mit Anfang 16km ostwärts Kamenec.`

_(English)_ `... 3 goes slowly but surely forwards. 17:06 hours [Roman numeral I?] Infantry Regiment 3 on the flight corridor starting 16 km east of Kamenec.`

Settings:

```json
{
  "plugboard": ["AV", "BS", "CG", "DL", "FU", "HZ", "IN", "KM", "OW", "RX"],
  "reflector": "B",
  "ringOffset": "BUL",
  "rotors": [
    { "position": "L", "type": "II" },
    { "position": "S", "type": "IV" },
    { "position": "D", "type": "V" }
  ]
}
```

### Scharnhorst (Konteradmiral Erich Bey), 1943

This message was sent from the battleship Scharnhorst on 26th December 1943, the day on which it was sunk by torpedoes from British destroyers.

Encrypted message:

`YKAE NZAP MSCH ZBFO CUVM RMDP YCOF HADZ IZME FXTH FLOL PZLF GGBO TGOX GRET DWTJ IQHL MXVJ WKZU ASTR`

Decrypted message:

`STEU EREJ TANA FJOR DJAN STAN DORT QUAA ACCC VIER NEUN NEUN ZWOF AHRT ZWON ULSM XXSC HARN HORS THCO`

Readable format:

_(German)_ `Steuere Tanafjord an. Standort Quadrat AC4992, fahrt 20sm. Scharnhorst. [hco - padding?]`

_(English)_ `Heading for Tanafjord. Position is square AC4992, speed 20 knots. Scharnhorst.`

Settings:

```json
{
  "plugboard": ["AN", "EZ", "HK", "IJ", "LR", "MQ", "OT", "PV", "SW", "UX"],
  "reflector": "B",
  "ringOffset": "AHM",
  "rotors": [
    { "position": "U", "type": "III" },
    { "position": "Z", "type": "VI" },
    { "position": "V", "type": "VIII" }
  ]
}
```

## References

- [1] https://www.ciphermachinesandcryptology.com/en/enigma.htm
- [2] https://people.physik.hu-berlin.de/~palloks/js/enigma/index_en.html
- [3] http://wiki.franklinheath.co.uk/index.php/Enigma/Sample_Messages
- [4] https://en.wikipedia.org/wiki/Enigma_machine

Useful resources:

- https://www.cryptomuseum.com/crypto/enigma/m3/index.htm
- https://www.cryptomuseum.com/people/hamer/files/double_stepping.pdf
