package com.fourdays.app.common.ui.view

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import androidx.constraintlayout.widget.ConstraintLayout
import com.fourdays.app.R
import kotlinx.android.extensions.LayoutContainer
import kotlinx.android.synthetic.main.view_food_item.view.*

class FoodItemView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ConstraintLayout(context, attrs, defStyleAttr),
    LayoutContainer, Visibility {
    override val containerView: View? = LayoutInflater.from(context)
        .inflate(R.layout.view_food_item, this, true)
        .apply { clipToPadding = false }

    var name: String?
        get() = foodItemNameTextView.text.toString()
        set(value) {
            foodItemNameTextView.text = value
        }

    var isFoodSelected: Boolean
        get() = disabledBackgroundView.visibility != View.VISIBLE
        set(value) {
            disabledBackgroundView.visibility = value.toInvisibility()
            backgroundView.elevation = if (value) 8.px.toFloat() else 1.px.toFloat()
        }
}
