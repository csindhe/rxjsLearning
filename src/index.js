import { Observable, Subject } from 'rxjs/Rx';

//Of Operator
// --> Creation Operator
// --> this is like a bulk next 
// --> this first emits (immediate) & then executes the complete
// --> uses null scheduler by default i.e. next notifications are sent synchronously

(function() {
    let numberObs = Observable.of(1,2,3,4,5,6,7);
    let letterObs = Observable.of('a', 'b', 'c');
    let intervalObs = Observable.interval(1000);

    let resultObs = numberObs.concat(letterObs).concat(intervalObs);


    let numObserver = {
        next: (val) => console.log(val),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    }

    numberObs.concat(letterObs).subscribe(numObserver);
    // resultObs.subscribe(numObserver); //this does not execute complete
});

//from Operator
// --> Creation Operator
// --> Creates observable from anything
// --> executes complete after the emits are complete

(function(){
    let prodList = [
        {name: {shortname: "tie", desc: "a tie"}, price: 121},
        {name: {shortname: "shoe", desc: "a shoe"}, price: 122},
        {name: {shortname: "shirt", desc: "a shirt"}, price: 221},
        {name: {shortname: "pant", desc: "a pant"}, price: 222},
    ];
   
    let prodObs = Observable.from(prodList);

    prodObs.subscribe({
        next: (val) => console.log(val),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    });

});

//pluck Operator
// --> picks one of the nested properties of every emitted object
// --> transformation operator

(function(){
    let prodList = [
        {name: {shortname: "tie", desc: "a tie"}, price: 121},
        {name: {shortname: "shoe", desc: "a shoe"}, price: 122},
        {name: {shortname: "shirt", desc: "a shirt"}, price: 221},
        {name: {shortname: "pant", desc: "a pant"}, price: 222},
    ];

    // let prodObs = Observable.from(prodList).pluck("name", "desc"); //nested form to pluck
    let prodObs = Observable.from(prodList).pluck("price");

    prodObs.subscribe({
        next: (val) => console.log(val),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    });

});

//filter Operator
// --> Filtering Operator
// --> Only emits the value if filter condition satisfies
// --> predicate function is used to filter

(function(){
    let prodList = [
        {name: {shortname: "tie", desc: "a tie"}, price: 121},
        {name: {shortname: "shoe", desc: "a shoe"}, price: 122},
        {name: {shortname: "shirt", desc: "a shirt"}, price: 221},
        {name: {shortname: "pant", desc: "a pant"}, price: 222},
    ];

    let prodObs = Observable.from(prodList).pluck("price");

    prodObs.filter((val) => {
        return val>200 ? true : false;
    }).subscribe({
        next: (val) => console.log(val),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    });

});

//fromEvent Operator
// --> Creation Operator
// --> creates observable from DOM events/ Node.js events etc..
// --> first argument is event target, second argument is a string which indicates type of event we are listening to

(function(){
    let clickObs = Observable.fromEvent(document, "click");
    clickObs.subscribe({
        next: (x) => console.log(`you click on the co-ordinates ${x.clientX} , ${x.clientY}`),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    });
});

//zip Operator
// --> combines multiple Observables into one Observable
// --> Combination Operator

(function (){
    let nameObs = Observable.of('Batman', 'Iron Man', 'Thanos');
    let ageObs = Observable.of('40', '35' , 'Unknown');
    let isPowerful = Observable.of(true, true, true);

    let profileObs = Observable
                        .zip(nameObs, 
                            ageObs, 
                            isPowerful, 
                            (Name, Age, isPowerful) => ({ Name, Age, isPowerful }))
                        .subscribe(x => console.log(x));  
                        
    let clickObs = Observable.fromEvent(document, "click");
    let xCor = clickObs.pluck('clientX');
    let yCor = clickObs.pluck('clientY');

    xCor.zip(yCor, function(x,y){
        return {xCordinate: x, yCordinate: y};
    }).subscribe({
        next: (val) => console.log(`You clicked on the co-ordinates ${val.xCordinate} , ${val.yCordinate}`),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    });

});

//map Operator
// --> Transformation Operator
// --> passes each source values through a transformation function to get corresponding output values i.e. Observable

(function() {
    let clickObs = Observable.fromEvent(document, "click");
    let xCor = clickObs.pluck('clientX');
    let yCor = clickObs.pluck('clientY');

    xCor.zip(yCor, function(x,y){
        return {xCordinate: x, yCordinate: y};
    }).map((val) => {
        //return ({ xCor: val.xCordinate, yCor: val.yCordinate });
        return `You clicked on the co-ordinates ${val.xCordinate} , ${val.yCordinate}`;   
    }).subscribe(x => console.log(x));

    let positionObs = clickObs.map(x => x.clientX);

    positionObs.subscribe(x => console.log(`PositionX : ${x}`));

});

//merge Operator
// --> Combination Operator
// --> converts multiple observable into a single observable
// --> concurrent delivery of all the values emitted on all the observables
// --> Output observable will only complete once all the observables are completed
// --> any error in the input observable will be emitted to output observable
// --> concurrent argument defines the Maximum number of input Observables being subscribed to concurrently

(function (){
    let even = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false });
    let even10 = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false }).map((val) => { return val * 10 });
    let even100 = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false }).map((val) => { return val * 100 });

    even.merge(even10, even100).subscribe(x => console.log(x));

});

//take Operator
// --> Filtering Operator
// --> emits only the first 'n' values emitted by the source observable & then completes
// --> if the emit count is < n then all of its values are emitted
// --> Output observable completes regardless the source completes.

(function (){
    let even = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false });
    let even10 = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false }).map((val) => { return val * 10 });
    let even100 = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false }).map((val) => { return val * 100 });

    // even.take(4).merge(even10.take(4), even100.take(4)).subscribe(x => console.log(x));
    even.take(4).merge(even10.take(4), even100.take(4)).subscribe(x => console.log(x));

});

//window Operator
// --> Transformation Operator
// --> branches the source observable values as a nested observable whenver windowboundries emits
// --> Output observable emits connected & non-overlapping windows
// --> Output is an higher order observable

(function () {
    let even = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false });
    let interval = Observable.interval(1000);

    let outputObs = even.window(interval).map((innerObs) => {
        return innerObs.take(2);
    }).mergeAll().subscribe({
        next: (val) => console.log(val),
        error: (error) => console.log(error),
        complete: () => console.log("Completed")
    });

    let clicks = Observable.fromEvent(document, 'click');
    let sinterval = Observable.interval(1000);
    let result = clicks.window(sinterval)
    .map(win => win.take(2)) // each window has at most 2 emissions
    .mergeAll(); // flatten the Observable-of-Observables
    result.subscribe({
        next: (val) => console.log(val.clientX)
    });

});

//mergeAll Operator
// --> Combination Operator
// --> converts higher order observable into a first order observable
// --> concurrent delivery of all the values emitted on inner observables
// --> Output observable will only complete once all inner observables are completed
// --> any error in the inner observable will be emitted to output observable
// --> concurrent argument defines the number of inner observables being subscribed to concurrently

(function (){
    // let even = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false });
    let clickObs = Observable.fromEvent(document, "click");
    let higherOrderObs = clickObs.map((x) => Observable.interval(2000));

    let firstOrderObs = higherOrderObs.mergeAll(2).subscribe(x => console.log(x));
});

//mergeMap Operator
// --> Transformation Operator
// --> projects each value to an Observable and flattens it using mergeAll
// --> project function returns an Observable
// --> concurrency defines number of input observables

(function () {
    let even = Observable.interval(1000).filter((val) => { return val%2 === 0 ? true : false });
    let even10 = Observable.interval(4000).filter((val) => { return val%2 === 0 ? true : false }).map((val) => { return val * 10 });
    let even100 = Observable.interval(8000).filter((val) => { return val%2 === 0 ? true : false }).map((val) => { return val * 100 });

    let outputObs = even.take(4).mergeMap(x => even10.take(4).map((i) => {
        return `${x} - ${i}`;
    })).subscribe({
        next: (val) => console.log(val)
    })
});

//switch Operator
// --> Combination Operator
// --> Higher-Order observable to First Order observable
// --> subscribes only to most recently emitted of inner observable
// --> previous inner observable is dropped once the new one observable emits

(function () {
    let evenObs = Observable.interval(500).filter((val) => { return val % 2 === 0 ? true : false });
    let clickObs = Observable.fromEvent(document, "click");
    let highOrderObs = clickObs.map((x) => {
        return evenObs;
    }).switch().subscribe({
        next: (val) => console.log(val)
    })

});

//scan Operator
// --> Transformation Operator
// --> uses accumulator function over the source observable and returns intermediate result

(function () {
    let evenObs = Observable.interval(1000).filter((val) => { return val % 2 === 0 ? true : false });
    evenObs.take(10).scan((acc, val) => {
        return val + acc;
    }, 1).map((x, val) => {
        return `${val+val}-${x}`;
    }).subscribe({
        next: (val) => console.log(val)
    })
});

//mergescan Operator
// --> applies accumulator function over the source observable
// --> accumulator function returns an observable
// --> intermediate observable is merged into output observable

(function (){
    let evenObs = Observable.interval(1000).filter((val) => { return val % 2 === 0 ? true : false });
    let oneObs = evenObs.take(10).mapTo(1);
    let seed = 0;

    let countObs = oneObs.mergeScan((acc, val) => Observable.of(acc + val), seed).subscribe(x => console.log(x));
    // let countObs = evenObs.take(10).mergeScan((acc, val) => Observable.of(acc + val), seed).subscribe(x => console.log(x));
});

//switchMap operator
// --> transformation Operator
// --> maps each value to an observable & then flattens
// --> emitting values only from the most recently projected Observable

(function () {
    let clickObs = Observable.fromEvent(document, "click");
    let evenObs = Observable.interval(1000).filter((val) => { return val % 2 === 0 ? true : false });
    // evenObs.take(10).switchMap((x) => Observable.interval(1000)).subscribe(x => console.log(x));
    clickObs.take(10).switchMap((x) => evenObs.take(10)).subscribe(x => console.log(x));
});