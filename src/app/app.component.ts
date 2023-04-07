import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'WhackAMole';
  randomNumber: number;
  counter: number = 0;
  time: number = 10;
  timerId: any;

  ngOnInit(): void {
    this.timer();
    const divs$$ = document.querySelectorAll('[data-function="square"]');
    let randomElement = null;

    const eventHandler = (event) => {
      if (this.time !== 0) this.counter++;
      let h2$$ = document.querySelector('[data-function="score"]');
      h2$$.textContent = this.counter.toString();
    };

    this.timerId = setInterval(() => {
      if (this.time === 0) {
        clearInterval(this.timerId);
        Swal.fire('Se ha acabado el tiempo!!!', `Tu puntuación es ${this.counter}`, 'success');
        return; 
      }

      divs$$.forEach((div) => {
        div.classList.remove('b-mole');
        div.removeEventListener('click', eventHandler);
      });
      this.randomNumber = Math.floor(Math.random() * divs$$.length);
      randomElement = divs$$[this.randomNumber];
      randomElement.addEventListener('click', eventHandler);
      randomElement.classList.add('b-mole');
    }, 750);
  }

  public timer(): void {
    setInterval(() => {
      if (this.time !== 0) this.time--;
      let timeCounter = document.querySelector('[data-function="time-left"');
      timeCounter.textContent = this.time.toString();
    }, 1000)
  }

}
