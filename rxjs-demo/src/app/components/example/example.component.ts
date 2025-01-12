import { Component } from '@angular/core';
import {map, filter, debounceTime, mergeMap, switchMap, take, concatMap, first, last} from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  before: string = '';
  after: string = '';
  currentMethod: string = '';
  currentParameters: string = '';

  demonstrateMap() {
    this.currentMethod = 'map';
    this.currentParameters = 'value => value * 2';
    const source$ = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source$.pipe(
      map(value => value * 2)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }

  demonstrateFilter() {
    this.currentMethod = 'filter';
    this.currentParameters = 'value => value % 2 === 0';
    const source$ = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source$.pipe(
      filter(value => value % 2 === 0)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  demonstrateTake() {
    this.currentMethod = 'take';
    this.currentParameters = '3';
    const source$ = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source$.pipe(
      take(3)
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  demonstrateConcatMap() {
    this.currentMethod = 'concatMap';
    this.currentParameters = 'value => of(`${value}1`, `${value}2`)';
    const source$ = of('A', 'B', 'C');
    const results: string[] = [];
    source$.pipe(
      concatMap(value => of(`${value}1`, `${value}2`))
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [A, B, C]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }

  demonstrateFirst() {
    this.currentMethod = 'first';
    this.currentParameters = 'Kein Parameter';
    const source$ = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source$.pipe(
      first()
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }
  demonstrateLast() {
    this.currentMethod = 'last';
    this.currentParameters = 'Kein Parameter';
    const source$ = of(1, 2, 3, 4, 5);
    const results: number[] = [];
    source$.pipe(
      last()
    ).subscribe(value => results.push(value));

    this.before = 'Vorher: [1, 2, 3, 4, 5]';
    this.after = `Nachher: [${results.join(', ')}]`;
  }

}
