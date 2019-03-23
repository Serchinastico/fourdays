package com.fourdays.app.setup.ui

import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.afollestad.recyclical.ViewHolder
import com.afollestad.recyclical.datasource.dataSourceOf
import com.afollestad.recyclical.setup
import com.afollestad.recyclical.withItem
import com.fourdays.app.R
import com.fourdays.app.common.di.module
import com.fourdays.app.common.ui.BaseFragment
import com.fourdays.app.common.ui.bindViewModel
import com.fourdays.app.common.ui.view.FoodItemView
import com.fourdays.app.common.ui.viewModel
import com.fourdays.app.databinding.FragmentSetupBinding
import com.fourdays.app.setup.viewmodel.SetupViewModel
import kotlinx.android.synthetic.main.fragment_setup.*
import org.kodein.di.erased.instance
import org.kodein.di.erased.provider

class SetupFragment : BaseFragment<FragmentSetupBinding>() {
    override val layoutId = R.layout.fragment_setup
    override val viewModel: SetupViewModel by viewModel()

    override val activityModules = module {
        bindViewModel<SetupViewModel>() with provider { SetupViewModel(instance()) }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        recyclerView.setup {
            withDataSource(
                dataSourceOf(
                    Description,
                    FoodGroup(getString(R.string.setup_food_group_name, "1")),
                    FoodRow(
                        FoodItem("Cebolla", ""),
                        FoodItem("Lechuga", ""),
                        FoodItem("Guisantes", "")
                    ),
                    FoodRow(
                        FoodItem("Batata", ""),
                        FoodItem("Lechuga", ""),
                        FoodItem("Guisantes", "")
                    ),
                    FoodGroup(getString(R.string.setup_food_group_name, "2")),
                    FoodGroup(getString(R.string.setup_food_group_name, "3")),
                    FoodGroup(getString(R.string.setup_food_group_name, "4"))
                )
            )
            withItem<Description>(R.layout.recycler_view_setup_description_item) {
                onBind(::DescriptionViewHolder) { _, _ -> }
            }
            withItem<FoodGroup>(R.layout.recycler_view_setup_food_group_item) {
                onBind(::FoodGroupViewHolder) { _, item ->
                    groupName.text = item.name
                }
            }
            withItem<FoodRow>(R.layout.recycler_view_setup_food_row_item) {
                onBind(::FoodRowViewHolder) { _, item ->
                    foodItem1.foodName = item.firstItem.name
                    foodItem2.foodName = item.secondItem?.name
                    foodItem3.foodName = item.thirdItem?.name
                }
            }
        }
    }

    override fun configureBinding(binding: FragmentSetupBinding) {}
}

data class FoodItem(val name: String, val imageResourceName: String)

object Description
data class FoodGroup(val name: String)
data class FoodRow(val firstItem: FoodItem, val secondItem: FoodItem?, val thirdItem: FoodItem?)
class DescriptionViewHolder(itemView: View) : ViewHolder(itemView)
class FoodGroupViewHolder(itemView: View) : ViewHolder(itemView) {
    val groupName: TextView = itemView.findViewById(R.id.groupNameTextView)
}

class FoodRowViewHolder(itemView: View) : ViewHolder(itemView) {
    val foodItem1: FoodItemView = itemView.findViewById(R.id.foodItem1View)
    val foodItem2: FoodItemView = itemView.findViewById(R.id.foodItem2View)
    val foodItem3: FoodItemView = itemView.findViewById(R.id.foodItem3View)
}
