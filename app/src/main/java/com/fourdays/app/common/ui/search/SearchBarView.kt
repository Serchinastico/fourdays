package com.fourdays.app.common.ui.search

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import androidx.constraintlayout.widget.ConstraintLayout
import com.fourdays.app.R
import com.fourdays.app.common.ui.view.Visibility
import kotlinx.android.extensions.LayoutContainer

class SearchBarView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr),
    LayoutContainer, Visibility {
    override val containerView: View? = LayoutInflater.from(context)
        .inflate(R.layout.view_search_bar, this, true)
        .apply { clipToPadding = false }
}
