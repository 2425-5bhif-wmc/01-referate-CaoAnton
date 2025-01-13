package at.htl.leonding.feature.example;

import javax.inject.Inject;
import javax.inject.Singleton;

import io.reactivex.rxjava3.core.Observable;
import java.util.concurrent.TimeUnit;

@Singleton
public class RxJavaViewModel {

    @Inject
    public RxJavaViewModel() {}

    // tag::android-map-java[]
    // Map Operator
    public Observable<String> getMappedObservable() {
        return Observable.just("Apple", "Banana", "Cherry")
                .map(String::toUpperCase);
    }
    // end::android-map-java[]


    // tag::android-filter-java[]
    // Filter Operator
    public Observable<Integer> getFilteredObservable() {
        return Observable.just(1, 2, 3, 4, 5)
                .filter(number -> number % 2 == 0);
    }
    // end::android-filter-java[]


    // tag::android-zip-java[]
    // Zip Operator
    public Observable<String> getZippedObservable() {
        Observable<String> observable1 = Observable.just("A", "B", "C");
        Observable<Integer> observable2 = Observable.just(1, 2, 3);
        return Observable.zip(observable1, observable2, (s, i) -> s + i);
    }
    // end::android-zip-java[]

    // tag::android-interval-java[]
    // Interval Operator
    public Observable<Long> getIntervalObservable() {
        return Observable.interval(1, TimeUnit.SECONDS)
                .take(5);
    }
    // end::android-interval-java[]


    // tag::android-take-java[]
    // Take Operator
    public Observable<Integer> getTakeObservable() {
        return Observable.just(1, 2, 3, 4)
                .take(2);
    }
    // end::android-take-java[]


    // Take + Filter Operator
    public Observable<Integer> getTakeFilteredObservable() {
        return Observable.just(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
                .filter(number -> number % 2 == 0)
                .take(3);
    }

    // Change Operator (map)
    public Observable<Integer> getChangedObservable() {
        return Observable.just(1, 2, 3, 4, 5)
                .map(number -> number * 10);
    }
}
