import Rx from 'rxjs/Rx';

let secondMessage = "Hope you are doing fine";

let mainObservable =  Rx.Observable.create(function subscribe(Observer){
    Observer.next("Hello");
    Observer.next(secondMessage);
    setTimeout(() => {
        Observer.next("Hello after 5 seconds");
        Observer.next(secondMessage);
    }, 5000);
});

let chetanObserver = {
    next: (val) => console.log(`Value recieved for chetanObserver is ${val}`),
    error: (error) => console.log(error),
    complete: () => console.log("ChetanObserver Completed")
};

let rajObserver = {
    next: (val) => console.log(`Value recieved for RajObserver is ${val}`),
    error: (val) => console.log(error),
    complete: () => console.log("RajObserver Complete")
}

mainObservable.subscribe(chetanObserver);
secondMessage = "How ya doin?";

setTimeout(() => {
    secondMessage = "Whats up?";
}, 6000);

setTimeout(() => {
    mainObservable.subscribe(rajObserver);
}, 10000);