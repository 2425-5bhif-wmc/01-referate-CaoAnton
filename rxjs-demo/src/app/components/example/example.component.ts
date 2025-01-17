import { Component } from '@angular/core';
import {
  map,
  filter,
  debounceTime,
  mergeMap,
  switchMap,
  take,
  concatMap,
  first,
  last,
  distinct,
  skip, pairwise, startWith, max, find, delay
} from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.component.html',
  standalone: true,
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  before: string = '';
  after: string = '';
  currentMethod: string = '';
  currentParameters: string = '';

  // tag::angular-map[]
  demonstrateMap() {
    this.currentMethod = 'map';
    this.currentParameters = 'value => value * 2';
    const source = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source.pipe(
      map(value => value * 2)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-map[]

  // tag::angular-filter[]
  demonstrateFilter() {
    this.currentMethod = 'filter';
    this.currentParameters = 'value => value % 2 === 0';
    const source = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source.pipe(
      filter(value => value % 2 === 0)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-filter[]

  // tag::angular-take[]
  demonstrateTake() {
    this.currentMethod = 'take';
    this.currentParameters = '3';
    const source = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source.pipe(
      take(3)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-take[]

  // tag::angular-concat[]
  demonstrateConcatMap() {
    this.currentMethod = 'concatMap';
    this.currentParameters = 'value => of(`${value}1`, `${value}2`)';
    const source = of('A', 'B', 'C');
    const results: string[] = [];
    source.pipe(
      concatMap(value => of(`${value}1`, `${value}2`))
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [A, B, C]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-concat[]

  // tag::angular-first[]
  demonstrateFirst() {
    this.currentMethod = 'first';
    this.currentParameters = 'Kein Parameter';
    const source = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source.pipe(
      first()
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-first[]

  // tag::angular-last[]
  demonstrateLast() {
    this.currentMethod = 'last';
    this.currentParameters = 'Kein Parameter';
    const source = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source.pipe(
      last()
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-last[]

  // tag::angular-skip[]
  demonstrateSkip() {
    this.currentMethod = 'skip';
    this.currentParameters = '3';
    const source = of('a', 'b', 'c', 'd', 'e')
    const results: string[] = [];
    source.pipe(
      skip(3)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [a, b, c, d, e]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-skip[]

  // tag::angular-distinct[]
  demonstrateDistinct() {
    this.currentMethod = 'distinct';
    this.currentParameters = 'Kein Parameter';
    const source = of(1, 1, 2, 2, 3, 3);
    const results: number[] = [];
    source.pipe(
      distinct()
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 1, 2, 2, 3, 3]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-distinct[]

  // tag::angular-startwith[]
  demonstrateStartWith() {
    this.currentMethod = 'startWith';
    this.currentParameters = `'s'`;
    const source = of('a', 'b', 'c');
    const results: string[] = [];
    source.pipe(
      startWith('s')
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [a, b, c]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-startwith[]


  // tag::angular-pairwise[]
  demonstratePairwise() {
    this.currentMethod = 'pairwise';
    this.currentParameters = 'Kein Parameter';
    const source = of('a', 'b', 'c', 'd', 'e');
    const results: string[] = [];
    source.pipe(
      pairwise()
    ).subscribe(([prev, curr]) => results.push(`[${prev}, ${curr}]`));

    this.before = 'Vorher: [a, b, c, d, e]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-pairwise[]

  // tag::angular-max[]
  demonstrateMax() {
    this.currentMethod = 'max';
    this.currentParameters = 'Kein Parameter';
    const source = of(42, -1, 3);
    const results: number[] = [];
    source.pipe(
      max()
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [42, -1, 3]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-max[]

  // tag::angular-find[]
  demonstrateFind() {
    this.currentMethod = 'find';
    this.currentParameters = 'value => value % 5 === 0';
    const source = of(3, 9, 15, 20);
    const results: number[] = [];
    source.pipe(
      find(value => value % 5 === 0)
    ).subscribe(value => results.push(value!));

    this.before = 'Vorher: [3, 9, 15, 20]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  // end::angular-find[]
}
