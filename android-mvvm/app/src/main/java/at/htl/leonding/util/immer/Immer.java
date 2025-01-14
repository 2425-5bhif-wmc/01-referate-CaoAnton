package at.htl.leonding.util.immer;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

import at.htl.leonding.util.mapper.Mapper;
import io.reactivex.rxjava3.subjects.BehaviorSubject;

/** Immer simplifies handling immutable data structures.
 * @param <T> The type of the baseState
 */

public class Immer<T> {
    private static final String TAG = Immer.class.getSimpleName();
    final public Mapper<T> mapper; // <.>
    final Handler handler; // <.>

    public Immer(Class<? extends T> type) {
        mapper = new Mapper<T>(type);
        handler = new Handler(Looper.getMainLooper());
    }
    /** Create a deep clone of the existing model, apply a recipe to it and finally pass the new state to the consumer.
     * To reduce the load on the main thread we clone the current state in a separate thread.
     * To avoid multithreading issues we call back the recipe and resultConsumer running on the one and only Main thread of the app.
     * We do not call the resultConsumer if the clone equals the currentState,
     * @param pipe the previous readonly single source or truth
     * @param recipe the callback function that modifies parts of the cloned state
     * @param resultConsumer the callback function that uses the cloned & modified model
     */
// Immer.java
    //<.>
    public void produce(BehaviorSubject<T> pipe, Consumer<T> recipe, Consumer<T> resultConsumer) {
        handler.post(() -> {
            var t = mapper.clone(pipe.getValue());
            var currentAsJson = mapper.toResource(t);
            recipe.accept(t);
            var nextAsJson = mapper.toResource(t);
            if (!nextAsJson.equals(currentAsJson)) {
                Log.d(TAG, String.format("=== state changed ===\n%s\n=>\n%s---", currentAsJson, nextAsJson));
                resultConsumer.accept(t);
            } else {
                Log.w(TAG, "produce() without change");
            }
        });
    }
}
