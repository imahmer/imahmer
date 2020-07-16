import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private text = "I am Developer";
  private display = "";

  @ViewChild("myDiv", {static: false}) divView: ElementRef;
  
  private words: any;
  private wait: number;

  
  title = 'imahmer';

  ngAfterViewInit(){
    console.log(this.divView);
    this.words = this.divView.nativeElement.getAttribute("data-words");
    this.wait = this.divView.nativeElement.getAttribute("data-wait");
    new TypeWriter(this.divView, JSON.parse(this.words), this.wait)
  }

  ngOnInit(): void {
    this.typewritter(this);
  }

  typewritter(that) {
    let text_length = that.text.length;
    let display_length = that.display.length;
    if (display_length < text_length) {
      that.display += that.text[that.display.length]
      setTimeout(that.typewritter, 100, that);
    }
    else {
      for (let i = that.text.length; i >= 0; --i) {
        that.display = that.replaceAt(that.text, i,that.text.length - i);
      }
    }
  }

  replaceAt(text: string, index: number, charcount: number): string {
    return text.substr(0, index) + text.substr(index + charcount);
  }
}

// https://codepen.io/tickle-tickle/pen/GwKRbM
class TypeWriter {
  private txtElement: any;
  private words: any;
  private txt: string;
  private wordIndex: number;
  private wait: number;
  private typeSpeed: number;
  private isDeleting: boolean;


  constructor(txtElement, words, wait = 2000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = "";
		this.wordIndex = 0; //which word to start with
		this.wait = wait; // wait time before deleting
		this.typeSpeed = 150; //delay for next char
		this.isDeleting = false;
		this.type();
  }
  
  type() {
		const currentIndex = this.wordIndex % this.words.length;
		const fullTxt = this.words[currentIndex];
		let typeSpeedCopy = this.isDeleting ? this.typeSpeed / 2 : this.typeSpeed;
		const numCharMod = this.isDeleting ? -1 : +1;
		// add or delete text
		this.txt = fullTxt.substring(0, this.txt.length + numCharMod);

		// Insert the text into the dom ele
		this.txtElement.nativeElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		if (!this.isDeleting && this.txt === fullTxt) {
			// at the end of the word, time to delete
			typeSpeedCopy = this.wait;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			// at the begining of a word
			this.wordIndex++;
			this.isDeleting = false;
		}
		setTimeout(() => this.type(), typeSpeedCopy);
	}
}
