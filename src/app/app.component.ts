import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Base 64 to Json Formatter';

  constructor() {
    window.console.log = () => { }
    window.console.error = () => { }
  }

  inputText: string = 'W3siaW5mb3JtYXRpb24iOgpbeyJuYW1lIjoiS2hpc3RyaWEgSmF5ZXNoIn0seyJkZXBhcnRtZW50IjoiTW9iaWxlIEFwcGxpY2F0aW9uIERldmVsb3BlciIsImRlc2NyaXB0aW9uIjoiQW55IHN1Z2dlc3Rpb24gd2lsbCBiZSBhY2NlcHRhYmxlIn1dCn0seyJkYXRhIjoibnVsbCJ9XQ==';
  outputText:any;
  isJson:boolean = false;

  async ngOnInit() {
    this.encodeDecode(this.inputText);
  }

  inputValue(event: any) {
    if (event.target.value != null) {
      this.inputText = event.target.value;
      this.encodeDecode(event.target.value);
    }
  }

  encodeDecode(data?: any) {
    this.isJson = false;
    if (data && (data != null || data != "" || data != undefined)) {
      let validBase64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      let isBase64 = validBase64.test(data);
      if(isBase64){
        let tempData:any = atob(data);

        if((tempData.charAt(0) == '[' || tempData.charAt(0) == '{') && (tempData.charAt(tempData.length - 1) == ']' || tempData.charAt(tempData.length - 1) == '}')){
          tempData = JSON.parse(tempData);
          this.isJson = true;
          this.outputText = tempData;
        }
        else if((tempData.charAt(0) != '[' && tempData.charAt(0) != '{') && (tempData.charAt(tempData.length - 1) != ']' && tempData.charAt(tempData.length - 1) != '}')){
          this.outputText = tempData;
        }else{
          this.outputText = "Invalid Encoded String Entered";
        }
      }
      else{
        this.outputText = "Invalid Encoded String Entered";
      }
    }
    else{
      this.outputText = "No Data Available";
    }
  }
}
