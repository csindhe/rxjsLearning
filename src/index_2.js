import Rx from 'rxjs/Rx';

//Subject

// let mainSubject = new Rx.Subject();          //considers the values emitted only after subscription
// let mainSubject = new Rx.BehaviorSubject();  //latest value before subscription and the values after subscription
// let mainSubject = new Rx.ReplaySubject(2);   //n values before subscription and the values after subscription
let mainSubject = new Rx.AsyncSubject();        //considers the values emitted only after subscription and encounters Complete

let subscriber1 = {
    currentval: undefined,
    previousval: undefined
}

subscriber1.next = function (value) {
    this.previousval = this.currentval;
    this.currentval = value;

    console.log(`Subscriber 1 recieved : ${value}`);
    console.log(`Previous Value : ${this.previousval}`);
    console.log(`Current Value : ${this.currentval}`);
}.bind(subscriber1);

let subscriber2 = {  
    next: (val) => { console.log(`Subscriber 2 recieved : ${val}`) }
}

mainSubject.next(10);
mainSubject.next(20);
mainSubject.next(30);
mainSubject.next(40);
mainSubject.subscribe(subscriber1);
mainSubject.next(50);
mainSubject.next(60);
mainSubject.next(70);
mainSubject.subscribe(subscriber2);
mainSubject.next(80);

mainSubject.complete();