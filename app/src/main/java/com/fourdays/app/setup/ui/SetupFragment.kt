package com.fourdays.app.setup.ui

import android.os.Bundle
import android.view.View
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
            withDataSource(dataSourceOf(Description))
            withItem<Description>(R.layout.recycler_view_setup_description_item) {
                onBind(::DescriptionViewHolder) { _, _ -> }
            }
        }
    }

    override fun configureBinding(binding: FragmentSetupBinding) {}
}

object Description
class DescriptionViewHolder(itemView: View) : ViewHolder(itemView)
