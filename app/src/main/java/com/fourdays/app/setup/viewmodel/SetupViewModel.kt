package com.fourdays.app.setup.viewmodel

import android.app.Application
import androidx.databinding.ObservableField
import androidx.lifecycle.AndroidViewModel

class SetupViewModel(
    application: Application
) : AndroidViewModel(application) {

    val foodByGroup = ObservableField<FoodByGroup>(
        FoodByGroup(
            groups = listOf(
                Group(
                    id = "1",
                    food = listOf(
                        Food(
                            id = "001",
                            name = "Cebolla",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "002",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "003",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "004",
                            name = "Batata",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "005",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "006",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        )
                    ),
                    isFoodVisible = true
                ),
                Group(
                    id = "2",
                    food = listOf(
                        Food(
                            id = "007",
                            name = "Cebolla",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "008",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "009",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "010",
                            name = "Batata",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "011",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "012",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        )
                    ),
                    isFoodVisible = false
                ),
                Group(
                    id = "3",
                    food = listOf(
                        Food(
                            id = "013",
                            name = "Cebolla",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "014",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "015",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "016",
                            name = "Batata",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "017",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "018",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        )
                    ),
                    isFoodVisible = false
                ),
                Group(
                    id = "4",
                    food = listOf(
                        Food(
                            id = "019",
                            name = "Cebolla",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "020",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "021",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "022",
                            name = "Batata",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "023",
                            name = "Lechuga",
                            imageResourceName = "",
                            isSelected = false
                        ),
                        Food(
                            id = "024",
                            name = "Guisantes",
                            imageResourceName = "",
                            isSelected = false
                        )
                    ),
                    isFoodVisible = false
                )

            )
        )
    )

    fun selectFoodGroup(id: String) {
        val foodByGroup = foodByGroup.get() ?: return
        val updatedFoodByGroup = foodByGroup.groups.map { group ->
            if (group.id == id) group.copy(isFoodVisible = !group.isFoodVisible)
            else group
        }

        this.foodByGroup.set(foodByGroup.copy(groups = updatedFoodByGroup))
    }

    fun selectFood(id: String) {
        val foodByGroup = foodByGroup.get() ?: return

        val updatedFoodByGroup = foodByGroup.groups.map { group ->
            group.copy(food = group.food.map { food ->
                if (food.id == id) food.copy(isSelected = !food.isSelected)
                else food
            })
        }

        this.foodByGroup.set(foodByGroup.copy(groups = updatedFoodByGroup))
    }

    data class FoodByGroup(
        val groups: List<Group>
    )

    data class Group(
        val id: String,
        val food: List<Food>,
        val isFoodVisible: Boolean
    )

    data class Food(
        val id: String,
        val name: String,
        val imageResourceName: String,
        val isSelected: Boolean
    )
}
