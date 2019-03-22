package com.fourdays.app.setup.ui

import com.fourdays.app.R
import com.fourdays.app.common.di.module
import com.fourdays.app.common.ui.BaseFragment
import com.fourdays.app.common.ui.bindViewModel
import com.fourdays.app.common.ui.viewModel
import com.fourdays.app.databinding.FragmentSetupBinding
import com.fourdays.app.setup.viewmodel.SetupViewModel
import org.kodein.di.erased.instance
import org.kodein.di.erased.provider

class SetupFragment : BaseFragment<FragmentSetupBinding>() {
    override val layoutId = R.layout.fragment_setup
    override val viewModel: SetupViewModel by viewModel()

    override val activityModules = module {
        bindViewModel<SetupViewModel>() with provider { SetupViewModel(instance()) }
    }

    override fun configureBinding(binding: FragmentSetupBinding) {
    }
}
