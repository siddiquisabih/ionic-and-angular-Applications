import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Injectable()
export class PrintProvider {
  imgString: string;
  constructor(private btSerial: BluetoothSerial, private alertCtrl: AlertController) {
    this.convert();
  }

  searchBt() {
    return this.btSerial.list();

  }

  connectBT(address) {
    return this.btSerial.connect(address);

  }


  convert() {
    const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }))


    toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0')
      .then(dataUrl => {
        console.log('RESULT:', dataUrl)
        // this.imgString = dataUrl
      })
  }


  testPrint(address) {
    var codes = {}


    // var receipt = '~||B2||||CA||RECEIPT~||BO||------------------------------------------------~||BO||RECEIPT #: R-18-0000053        Date: 28 Aug 2018~||BO||------------------------------------------------~||NO||KAMRAN KHALID AHMER                             ~||NO||R 35, 15-A 1, Buffer Zone, Khi                 ~||NO||Cell  :  +92-333-3333333~||NO||Email :  kamran@gmail.com~||NO||CR #  :  000001~||BO||------------------------------------------------~||BO|||   JO/SALE INVOICE #   |    Reveived Amount   |~||BO||------------------------------------------------~||BO||------------------------------------------------~||NO||PAYMENT RECEIPT DETAIL                          ~||BO||------------------------------------------------~||NO||Received with thanks, a sum of Amount (Rs):     ~||NO||5,000 (Five thousand, Rupees only)  from M/s.   ~||NO||Kamran Khalid Ahmer                             ~||BO||................................................~||NO||  Receipt Mode   : Cash                         ~||NO||  Amount         : 5,000                        ~||NO||  Received On    : 28 Aug 2018                  ~~||BO||------------------------------------------------~||NO||PAYMENT SUMMARY                                 ~||BO||------------------------------------------------~||NO||        ----------------------------------------~||BO||        |NET AMOUNT            |        762,814|~||BO||        |NET RECEIVED          |        762,814|~||BO||        |NET BALANCE           |              0|~||NO||        ----------------------------------------~||BO||------------------------------------------------~||NO||PRINT DATE & TIME:           01/09/2018 11:29:53~||BC||                 R-18-0000053                 ~||NO||   Copyright - All Rights Reserved by Issuer  ~||BO||------------------------------------------------~||BO|||          THANK YOU FOR YOUR BUSINESS         |~||BO||------------------------------------------------~'



    var receipt = '~||B2||||CA||RECEIPT~||BO||------------------------------------------------~||BO||RECEIPT #: R-18-0000053        Date: 28 Aug 2018~||BO||------------------------------------------------~||NO||KAMRAN KHALID AHMER                             ~||NO||R 35, 15-A 1, Buffer Zone, Khi                 ~||NO||Cell  :  +92-333-3333333~||NO||Email :  kamran@gmail.com~||NO||CR #  :  000001~||BO||------------------------------------------------~||BO|||   JO/SALE INVOICE #   |    Reveived Amount   |~||BO||------------------------------------------------~||BO||------------------------------------------------~||NO||PAYMENT RECEIPT DETAIL                          ~||BO||------------------------------------------------~||NO||Received with thanks, a sum of Amount (Rs):     ~||NO||5,000 (Five thousand, Rupees only)  from M/s.   ~||NO||Kamran Khalid Ahmer                             ~||BO||................................................~||NO||  Receipt Mode   : Cash                         ~||NO||  Amount         : 5,000                        ~||NO||  Received On    : 28 Aug 2018                  ~~||BO||------------------------------------------------~||NO||PAYMENT SUMMARY                                 ~||BO||------------------------------------------------~||NO||        ----------------------------------------~||BO||        |NET AMOUNT            |        762,814|~||BO||        |NET RECEIVED          |        762,814|~||BO||        |NET BALANCE           |              0|~||NO||        ----------------------------------------~||BO||------------------------------------------------~||NO||PRINT DATE & TIME:           01/09/2018 11:29:53~||BC||                 R-18-0000053                 ~||NO||   Copyright - All Rights Reserved by Issuer  ~||BO||------------------------------------------------~||BO|||          THANK YOU FOR YOUR BUSINESS         |~||BO||------------------------------------------------~'

    var properLineBreak = receipt.replace(/~/g, `\n`)


    var replaceBold = properLineBreak.split('||B2||').join('\x1b\x45\x02')

    var replaceBold1 = replaceBold.split('||BO||').join('\x1b\x45\x01')

    var replaceBold2 = replaceBold1.split('||BC||').join('')

    // var replaceBold3 = replaceBold2.split('||CA||').join('\x1b\x61\x50')
    var replaceBold3 = replaceBold2.split('||CA||').join('\x1b\x61\x01')

    var replaceBold4 = replaceBold3.split('||NO||').join('\x1b\x61\x00\x1b\x45\x00')


    // var abc = 'test'
    // let printData = 'RECEIPT\n------------------------------------------------\nRECEIPT #: R-18-0000006'

    console.log(replaceBold4)
    let xyz = this.connectBT(address).subscribe(data => {
      this.btSerial.clear().then(() => {



        // for (let i = 0; i < 5; i++) {
        // this.btSerial.write('\x1b\x2d\x01' + 'sabih' + '\x1b\x2d\x00' + 'siddiqui' + '\x1b\x2d\x01' + 'this.is some.text' + '\x1b\x2d\x00').then(datazs => {
        this.btSerial.write(replaceBold4).then(datazs => {
          console.log("WRITE SUCCESS", datazs);

          // this.btSerial.write(text).then(dataz => {
          //   console.log(" ssdasd", dataz);
          let mno = this.alertCtrl.create({
            title: "success " + datazs,
            buttons: ['Dismiss']
          });
          mno.present();

          xyz.unsubscribe();
          // });


        }, errx => {
          console.log("WRITE FAILED", errx);
          let mno = this.alertCtrl.create({
            title: "ERROR " + errx,
            buttons: ['Dismiss']
          });
          mno.present();
        });

        // }




      })

    }, err => {
      console.log("CONNECTION ERROR", err);
      let mno = this.alertCtrl.create({
        title: "ERROR " + err,
        buttons: ['Dismiss']
      });
      mno.present();
    });

  }

}
