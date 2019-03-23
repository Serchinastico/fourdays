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
        }
    }

    override fun configureBinding(binding: FragmentSetupBinding) {}
}

object Description
data class FoodGroup(val name: String)
class DescriptionViewHolder(itemView: View) : ViewHolder(itemView)
class FoodGroupViewHolder(itemView: View) : ViewHolder(itemView) {
    val groupName: TextView = itemView.findViewById(R.id.groupNameTextView)
}
