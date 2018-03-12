import {
    Observable
} from 'rxjs/Rx';

let numberObs = Observable.create(function subscribe(Observer) {
    Observer.next(1);
    Observer.next(2);
    Observer.next(3);
    Observer.next(4);
    Observer.next('a');
});

function multiplyByN(n) {
    let parentObs = this;
    let outputObs = Observable.create(function (outputObserver) {
        let localObs = {
            next: (val) => {
                outputObserver.next(val * n);
            },
            error: (error) => console.log(`Error ${error}`),
            complete: () => console.log("Completed")
        }
        parentObs.subscribe(localObs);
    });
    return outputObs;
}

function powerOfN(n) {
    let sparentObs = this;
    let soutputObs = Observable.create(function (soutputObserver) {
        let slocalObs = {
            next: (val) => {
                soutputObserver.next(Math.pow(val, n));
            },
            error: (error) => console.log(`Error ${error}`),
            complete: () => console.log("Completed")
        }
        sparentObs.subscribe(slocalObs);
    });
    return soutputObs;
}

function natureOfNum() {
    let nparentObs = this;
    let numNature = function(val){
        return (
            isNaN(val) ? 
            `${val} & is Not a Number` : ((val % 2 === 0) ? `${val} & is an Even Number` : `${val} & is an Odd Number`)
        );
    };
    let noutputObs = Observable.create(function (noutputObserver) {
        let nlocalObs = {
            next: (val) => noutputObserver.next(numNature(val)),
            error: (error) => console.log(`Error ${error}`),
            complete: () => console.log("Completed")
        }
        nparentObs.subscribe(nlocalObs);
    });
    return noutputObs;
}

Observable.prototype.multiply = multiplyByN;
Observable.prototype.powerOf = powerOfN;
Observable.prototype.natureNum = natureOfNum;

let Observer1 = {
    next: (val) => {
        console.log(`Observer 1 value is ${val}`);
    }
}

numberObs.multiply(6).subscribe(Observer1);
numberObs.powerOf(3).subscribe(Observer1);
numberObs.natureNum().subscribe(Observer1);