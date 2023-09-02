import { fromEvent, interval } from 'rxjs';
import { mergeScan, take, takeUntil, map, scan } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergescan
// Example 1: Accumulate total duration mouse held down over time

// reference
const durationElem = document.getElementById('duration');

// streams
const mouseDown$ = fromEvent(document, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');

// accumulate time mouse held down over time
mouseDown$
  .pipe(
    mergeScan((acc, curr) => {
      return interval(1000).pipe(
        scan((a, _) => ++a, 0),
        map((val: any) => val + acc),
        takeUntil(mouseUp$)
      );
    }, 0)
    // output: 1s...2s...3s...4s...
  )
  .subscribe((val) => (durationElem.innerHTML = `${val}s`));
