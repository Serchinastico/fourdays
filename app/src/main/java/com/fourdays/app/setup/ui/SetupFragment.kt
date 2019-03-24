package com.fourdays.app.setup.ui

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.GridLayoutManager
import com.afollestad.recyclical.ViewHolder
import com.afollestad.recyclical.datasource.emptyDataSource
import com.afollestad.recyclical.setup
import com.afollestad.recyclical.withItem
import com.fourdays.app.R
import com.fourdays.app.common.di.module
import com.fourdays.app.common.ui.BaseFragment
import com.fourdays.app.common.ui.bindViewModel
import com.fourdays.app.common.ui.view.FoodItemView
import com.fourdays.app.common.ui.viewModel
import com.fourdays.app.databinding.FragmentSetupBinding
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem.Description
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem.FoodGroupHeader
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem.FoodItem
import com.fourdays.app.setup.viewmodel.SetupViewModel
import kotlinx.android.synthetic.main.fragment_setup.*
import org.kodein.di.erased.instance
import org.kodein.di.erased.provider

class SetupFragment : BaseFragment<FragmentSetupBinding>() {
    override val layoutId = R.layout.fragment_setup
    override val viewModel: SetupViewModel by viewModel()
    private val dataSource = emptyDataSource()

    override val activityModules = module {
        bindViewModel<SetupViewModel>() with provider { SetupViewModel(instance()) }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        dataSource += Description
        dataSource += FoodGroupHeader(
            name = getString(R.string.setup_food_group_name, "1"),
            isOpen = true
        )
        dataSource += FoodItem(
            name = "Cebolla",
            imageResourceName = "",
            isSelected = true
        )
        dataSource += FoodItem(
            name = "Lechuga",
            imageResourceName = "",
            isSelected = true
        )
        dataSource += FoodItem(
            name = "Guisantes",
            imageResourceName = "",
            isSelected = true
        )
        dataSource += FoodItem(
            name = "Batata",
            imageResourceName = "",
            isSelected = true
        )
        dataSource += FoodItem(
            name = "Lechuga",
            imageResourceName = "",
            isSelected = true
        )
        dataSource += FoodItem(
            name = "Guisantes",
            imageResourceName = "",
            isSelected = true
        )
        dataSource += FoodGroupHeader(
            name = getString(R.string.setup_food_group_name, "2"),
            isOpen = false
        )
        dataSource += FoodGroupHeader(
            name = getString(R.string.setup_food_group_name, "3"),
            isOpen = false
        )
        dataSource += FoodGroupHeader(
            name = getString(R.string.setup_food_group_name, "4"),
            isOpen = false
        )

        val layoutManager = GridLayoutManager(requireContext(), 3)
            .apply { spanSizeLookup = FoodGridSpanSizeLookup(dataSource) }

        recyclerView.setup {
            withLayoutManager(layoutManager)
            withDataSource(dataSource)
            withItem<Description>(R.layout.recycler_view_setup_description_item) {
                onBind(::DescriptionViewHolder) { _, _ -> }
            }
            withItem<FoodGroupHeader>(R.layout.recycler_view_setup_food_group_item) {
                onBind(::FoodGroupHeaderViewHolder) { _, item ->
                    groupName.text = item.name
                }
            }
            withItem<FoodItem>(R.layout.recycler_view_setup_food_item) {
                onBind(::FoodItemViewHolder) { _, item ->
                    foodView.name = item.name
                }
            }
        }
    }

    override fun configureBinding(binding: FragmentSetupBinding) {}

    sealed class RecyclerViewItem {
        object Description : RecyclerViewItem()
        data class FoodGroupHeader(val name: String, val isOpen: Boolean) : RecyclerViewItem()
        data class FoodItem(
            val name: String,
            val imageResourceName: String,
            val isSelected: Boolean
        ) : RecyclerViewItem()
    }

    class DescriptionViewHolder(itemView: View) : ViewHolder(itemView)
    class FoodGroupHeaderViewHolder(itemView: View) : ViewHolder(itemView) {
        val groupName: TextView = itemView.findViewById(R.id.groupNameTextView)
    }

    class FoodItemViewHolder(itemView: View) : ViewHolder(itemView) {
        val foodView: FoodItemView = itemView.findViewById(R.id.foodItemView)
    }
}
