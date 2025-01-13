package at.htl.leonding.feature.example

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import io.reactivex.rxjava3.disposables.CompositeDisposable
import javax.inject.Inject

class RxJavaView @Inject constructor(private val rxJavaViewModel: RxJavaViewModel) {

    // Initialize CompositeDisposable to manage subscriptions
    private val compositeDisposable = CompositeDisposable()

    @Composable
    fun RxJavaDemoScreen() {
        val beforeResults = remember { mutableStateListOf<String>() }
        val afterResults = remember { mutableStateListOf<String>() }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp) // Add spacing between items
        ) {
            // Before Results Header
            item {
                Text("Before:", modifier = Modifier.padding(bottom = 8.dp))
            }

            // Before Results List
            items(beforeResults) { item ->
                Text(text = item)
            }

            // After Results Header
            item {
                Text("After:", modifier = Modifier.padding(bottom = 8.dp))
            }

            // After Results List
            items(afterResults) { item ->
                Text(text = item)
            }

            // Reset Button
            item {
                Button(onClick = {
                    compositeDisposable.clear()
                    beforeResults.clear()
                    afterResults.clear()
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Reset All")
                }
            }

            // tag::android-map[]
            // Map Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    val originalValues = listOf("Apple", "Banana", "Cherry")
                    beforeResults.addAll(originalValues)
                    rxJavaViewModel.getMappedObservable()
                        .subscribe { afterResults.add(it) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Map Operator")
                }
            }
            // end::android-map[]

            // tag::android-filter[]

            // Filter Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    val originalValues = listOf(1, 2, 3, 4, 5)
                    beforeResults.addAll(originalValues.map { it.toString() })
                    rxJavaViewModel.getFilteredObservable()
                        .subscribe { afterResults.add(it.toString()) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Filter Operator")
                }
            }
            // end::android-filter[]


            // tag::android-zip[]
            // Zip Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    val observable1 = listOf("A", "B", "C")
                    val observable2 = listOf(1, 2, 3)
                    beforeResults.addAll(observable1.zip(observable2) { s, i -> "$s and $i" })
                    rxJavaViewModel.getZippedObservable()
                        .subscribe { afterResults.add(it) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Zip Operator")
                }
            }
            // end::android-zip[]

            // tag::android-interval[]
            // Interval Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    beforeResults.add("Generating interval values")
                    rxJavaViewModel.getIntervalObservable()
                        .subscribe { afterResults.add(it.toString()) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Interval Operator")
                }
            }
            // end::android-interval[]

            // tag::android-take[]
            // Take Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    val originalValues = listOf(1, 2, 3, 4)
                    beforeResults.addAll(originalValues.map { it.toString() })
                    rxJavaViewModel.getTakeObservable()
                        .subscribe { afterResults.add(it.toString()) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Take Operator")
                }
            }
            // end::android-take[]

            // Take + Filter Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    val originalValues = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
                    beforeResults.addAll(originalValues.map { it.toString() })
                    rxJavaViewModel.getTakeFilteredObservable()
                        .subscribe { afterResults.add(it.toString()) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Take + Filter Operator")
                }
            }

            // Change Operator Button
            item {
                Button(onClick = {
                    beforeResults.clear()
                    afterResults.clear()
                    val originalValues = listOf(1, 2, 3, 4, 5)
                    beforeResults.addAll(originalValues.map { it.toString() })
                    rxJavaViewModel.getChangedObservable()
                        .subscribe { afterResults.add(it.toString()) }
                        .also { compositeDisposable.add(it) }
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("Change Operator")
                }
            }
        }
    }
}
