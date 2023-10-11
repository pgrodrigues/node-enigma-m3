import { Enigma } from "../src/enigma";

describe("Cypher", () => {
  describe("Basic", () => {
    test("Should throw an error when cyphering an invalid character", () => {
      const enigma = new Enigma();
      const character = "Ç";
      const settings = {
        plugboard: [],
        reflector: "B",
        rotors: [
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "A", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(() => enigma.cypher(character)).toThrowError(
        new Error(`Invalid character "${character}" found in position "0"`)
      );
    });

    test("Should preserve white spaces", () => {
      const enigma = new Enigma();
      const word = "A B";
      const settings = {
        plugboard: [],
        reflector: "B",
        rotors: [
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "A", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(enigma.cypher(word).indexOf(" ")).toEqual(word.indexOf(" "));
    });

    test("Should correctly cypher a message with a configuration that involves double stepping (ZPV, ZQW, ARX)", () => {
      const enigma = new Enigma();
      const input = "AAAA AAAA AAAA AAAA";
      const output = "XMFI DRGB UYZK XVIM";
      const settings = {
        plugboard: [],
        reflector: "B",
        rotors: [
          { offset: "A", position: "Z", type: "V" },
          { offset: "A", position: "P", type: "I" },
          { offset: "A", position: "K", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(enigma.cypher(input)).toBe(output);
    });
  });

  describe("Original messages", () => {
    test("Should correctly decypher message from 'Enigma Instruction Manual, 1930'", () => {
      const enigma = new Enigma();
      const input =
        "GCDSE AHUGW TQGRK VLFGX UCALX VYMIG MMNMF DXTGN VHVRM MEVOU YFZSL RHDRR XFJWC FHUHM UNZEF RDISI KBGPM YVXUZ";
      const output =
        "FEIND LIQEI NFANT ERIEK OLONN EBEOB AQTET XANFA NGSUE DAUSG ANGBA ERWAL DEXEN DEDRE IKMOS TWAER TSNEU STADT";
      const settings = {
        plugboard: ["AM", "FI", "NV", "PS", "TU", "WZ"],
        reflector: "A",
        rotors: [
          { offset: "X", position: "A", type: "II" },
          { offset: "M", position: "B", type: "I" },
          { offset: "V", position: "L", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(enigma.cypher(input)).toBe(output);
    });

    test("Should correctly decypher message from 'Operation Barbarossa, 1941 (part 1)'", () => {
      const enigma = new Enigma();
      const input =
        "EDPUD NRGYS ZRCXN UYTPO MRMBO FKTBZ REZKM LXLVE FGUEY SIOZV EQMIK UBPMM YLKLT TDEIS MDICA GYKUA CTCDO MOHWX MUUIA UBSTS LRNBZ SZWNR FXWFY SSXJZ VIJHI DISHP RKLKA YUPAD TXQSP INQMA TLPIF SVKDA SCTAC DPBOP VHJK";
      const output =
        "AUFKL XABTE ILUNG XVONX KURTI NOWAX KURTI NOWAX NORDW ESTLX SEBEZ XSEBE ZXUAF FLIEG ERSTR ASZER IQTUN GXDUB ROWKI XDUBR OWKIX OPOTS CHKAX OPOTS CHKAX UMXEI NSAQT DREIN ULLXU HRANG ETRET ENXAN GRIFF XINFX RGTX";
      const settings = {
        plugboard: ["AV", "BS", "CG", "DL", "FU", "HZ", "IN", "KM", "OW", "RX"],
        reflector: "B",
        rotors: [
          { offset: "B", position: "B", type: "II" },
          { offset: "U", position: "L", type: "IV" },
          { offset: "L", position: "A", type: "V" }
        ]
      };

      enigma.configure(settings);

      expect(enigma.cypher(input)).toBe(output);
    });

    test("Should correctly decypher message from 'Operation Barbarossa, 1941 (part 2)'", () => {
      const enigma = new Enigma();
      const input =
        "SFBWD NJUSE GQOBH KRTAR EEZMW KPPRB XOHDR OEQGB BGTQV PGVKB VVGBI MHUSZ YDAJQ IROAX SSSNR EHYGG RPISE ZBOVM QIEMM ZCYSG QDGRE RVBIL EKXYQ IRGIR QNRDN VRXCY YTNJR";
      const output =
        "DREIG EHTLA NGSAM ABERS IQERV ORWAE RTSXE INSSI EBENN ULLSE QSXUH RXROE MXEIN SXINF RGTXD REIXA UFFLI EGERS TRASZ EMITA NFANG XEINS SEQSX KMXKM XOSTW XKAME NECXK";
      const settings = {
        plugboard: ["AV", "BS", "CG", "DL", "FU", "HZ", "IN", "KM", "OW", "RX"],
        reflector: "B",
        rotors: [
          { offset: "B", position: "L", type: "II" },
          { offset: "U", position: "S", type: "IV" },
          { offset: "L", position: "D", type: "V" }
        ]
      };

      enigma.configure(settings);

      expect(enigma.cypher(input)).toBe(output);
    });

    test("Should correctly decypher message from 'Scharnhorst (Konteradmiral Erich Bey), 1943'", () => {
      const enigma = new Enigma();
      const input =
        "YKAE NZAP MSCH ZBFO CUVM RMDP YCOF HADZ IZME FXTH FLOL PZLF GGBO TGOX GRET DWTJ IQHL MXVJ WKZU ASTR";
      const output =
        "STEU EREJ TANA FJOR DJAN STAN DORT QUAA ACCC VIER NEUN NEUN ZWOF AHRT ZWON ULSM XXSC HARN HORS THCO";
      const settings = {
        plugboard: ["AN", "EZ", "HK", "IJ", "LR", "MQ", "OT", "PV", "SW", "UX"],
        reflector: "B",
        rotors: [
          { offset: "A", position: "U", type: "III" },
          { offset: "H", position: "Z", type: "VI" },
          { offset: "M", position: "V", type: "VIII" }
        ]
      };

      enigma.configure(settings);

      expect(enigma.cypher(input)).toBe(output);
    });
  });
});
