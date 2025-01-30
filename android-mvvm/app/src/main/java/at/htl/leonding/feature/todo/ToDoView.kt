package at.htl.leonding.feature.todo

import android.widget.Toast
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import at.htl.leonding.model.Store
import at.htl.leonding.model.ToDo
import at.htl.leonding.ui.theme.ToDoTheme
import androidx.compose.ui.platform.LocalContext
import androidx.compose.runtime.rxjava3.subscribeAsState
import androidx.compose.ui.platform.LocalFocusManager
import at.htl.leonding.feature.todo.ToDoService
import javax.inject.Inject

class ToDoView @Inject constructor() {
    @Inject
    lateinit var toDoViewModel: ToDoViewModel
    @Inject
    lateinit var toDoService: ToDoService

    @Composable
    fun ToDos() {
        val model = toDoViewModel.subject.subscribeAsState(toDoViewModel.getValue()).value
        val todos = model.toDos
        val context = LocalContext.current
        var newTitle = remember { mutableStateOf("") } // Zustand für den Titel des neuen ToDos
        var showTextField = remember { mutableStateOf(true) } // Zustand für das Anzeigen des Textfeldes

        val focusManager = LocalFocusManager.current // Um den Fokus zu steuern

        Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
            // Eingabefeld für den Titel des neuen ToDos
            TextField(
                value = newTitle.value,
                onValueChange = { newTitle.value = it },
                label = { Text("Titel des neuen ToDos") },
                keyboardOptions = KeyboardOptions.Default.copy(imeAction = ImeAction.Done), // "Done" Aktion
                keyboardActions = KeyboardActions(
                    onDone = {
                        // Wenn der Benutzer auf "Done" klickt (Tastatur), ToDo hinzufügen und Tastatur verschwinden lassen
                        if (newTitle.value.isNotBlank()) {
                            toDoService.addToDo(ToDo().apply {
                                title = newTitle.value
                                userId = 1 // Beispielwert für userId
                            })
                            newTitle.value = "" // Eingabefeld zurücksetzen
                            focusManager.clearFocus() // Tastatur ausblenden
                            Toast.makeText(context, "Neues ToDo hinzugefügt!", Toast.LENGTH_SHORT).show()
                        } else {
                            // Fehlermeldung, wenn der Titel leer ist
                            Toast.makeText(context, "Bitte einen Titel eingeben", Toast.LENGTH_SHORT).show()
                        }
                    }
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 8.dp)
            )

            // Button, um das neue ToDo manuell hinzuzufügen (falls der Benutzer den Button verwenden möchte)
            Button(
                onClick = {
                    if (newTitle.value.isNotBlank()) {
                        toDoService.addToDo(ToDo().apply {
                            title = newTitle.value
                            userId = 1
                        })
                        newTitle.value = "" // Eingabefeld zurücksetzen
                        focusManager.clearFocus() // Tastatur ausblenden
                        Toast.makeText(context, "Neues ToDo hinzugefügt!", Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(context, "Bitte einen Titel eingeben", Toast.LENGTH_SHORT).show()
                    }
                },
                modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp)
            ) {
                Text("Neues ToDo hinzufügen")
            }

            // Liste der Todos anzeigen
            LazyColumn(modifier = Modifier.fillMaxSize()) {
                items(todos.size) { index ->
                    ToDoRow(
                        toDo = todos[index],
                        onToggle = { toDoService.toggleToDo(todos[index].id) },
                        onDelete = { toDoService.deleteToDo(todos[index].id) }
                    )
                }
            }
        }
    }







    @Composable
    fun ToDoRow(toDo: ToDo, onToggle: () -> Unit, onDelete: () -> Unit) {
        Row(modifier = Modifier.padding(4.dp)) {
            Checkbox(
                checked = toDo.completed,
                onCheckedChange = { onToggle() },
                modifier = Modifier.padding(end = 8.dp)
            )
            Text(toDo.title, modifier = Modifier.weight(1f))
            IconButton(onClick = onDelete) {
                Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete")
            }
        }
    }

    @Composable
    fun preview() {
        val todos = arrayOf(
            ToDo().apply { id = 1; title = "short title"; completed = false },
            ToDo().apply { id = 2; title = "Lorem ipsum dolor sit amet"; completed = true }
        )
        val store = Store()
        store.pipe.value!!.toDos = todos
        toDoViewModel = ToDoViewModel(store)
        ToDoTheme {
            ToDos()
        }
    }

    @Preview(showBackground = true)
    @Composable
    fun ToDoViewPreview() {
        preview()
    }
}
