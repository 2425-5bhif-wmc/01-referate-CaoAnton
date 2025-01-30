package at.htl.leonding.feature.todo;

import org.eclipse.microprofile.config.Config;

import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;
import javax.inject.Inject;
import javax.inject.Singleton;
import at.htl.leonding.model.Store;
import at.htl.leonding.model.ToDo;
import at.htl.leonding.util.resteasy.RestApiClientBuilder;
import static java.util.concurrent.CompletableFuture.supplyAsync;

@Singleton
public class ToDoService {
    public static final String JSON_PLACEHOLDER_BASE_URL_SETTING = "json.placeholder.baseurl";
    public final ToDoClient toDoClient;
    public final Store store;

    @Inject
    ToDoService(Config config, RestApiClientBuilder builder, Store store) {
        var baseUrl = config.getValue(JSON_PLACEHOLDER_BASE_URL_SETTING, String.class);
        toDoClient = builder.build(ToDoClient.class, baseUrl);
        this.store = store;
    }

    public void getAll() {
        Consumer<ToDo[]> setToDos = todos -> store.apply(model -> model.toDos = todos);
        CompletableFuture.supplyAsync(() -> toDoClient.all(0, 40)).thenAccept(setToDos);
    }

    public void addToDo(ToDo toDo) {
        long newId = new Random().nextInt(100000);
        toDo.id = newId;

        store.apply(model -> {
            ToDo[] newToDos = new ToDo[model.toDos.length + 1];
            System.arraycopy(model.toDos, 0, newToDos, 0, model.toDos.length);
            newToDos[model.toDos.length] = toDo;
            model.toDos = newToDos;
        });
    }



    public void deleteToDo(Long id) {
        store.apply(model -> {
            if (model.toDos != null) {
                model.toDos = java.util.Arrays.stream(model.toDos)
                        .filter(todo -> todo.id != null && !todo.id.equals(id))
                        .toArray(ToDo[]::new);
            }
        });
    }

    public void toggleToDo(Long id) {
        store.apply(model -> {
            if (model.toDos != null) {
                for (ToDo todo : model.toDos) {
                    if (todo.id != null && todo.id.equals(id)) {
                        todo.completed = !todo.completed;
                    }
                }
            }
        });
    }

}
