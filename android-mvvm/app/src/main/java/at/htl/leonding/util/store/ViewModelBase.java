package at.htl.leonding.util.store;

import at.htl.leonding.model.Model;
import at.htl.leonding.model.Store;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.subjects.PublishSubject;
import io.reactivex.rxjava3.subjects.Subject;

/** Map our global application state to the small vision that a view has of the world.
 * A base class for our ViewModels in the sense of the MVVM Pattern.
 * In a lot of texts the term "Model-View-ViewModel" is often explained incorrectly.
 * @param <T> the type of the view model, the small world of the view that this special viewmodel serves.
 */
public abstract class ViewModelBase<T> {
    public final Subject<T> subject = PublishSubject.create(); // <.>

    protected final Store store;
    private final Disposable subscription; // <.>

    protected ViewModelBase(Store store) { // <.>
        this.store = store;
        this.subscription = store.pipe
                .map(this::toViewModel)
                .distinctUntilChanged()
                .subscribe(subject::onNext);
    }
    public T getValue() {
        return toViewModel(store.pipe.getValue());
    }

    /** map the "big" model to our "small" viewmodel */
    protected abstract T toViewModel(Model model);
}
