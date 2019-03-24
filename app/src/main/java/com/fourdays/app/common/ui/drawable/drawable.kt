package com.fourdays.app.common.ui.drawable

import android.graphics.drawable.Drawable
import androidx.annotation.DrawableRes
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment

fun Fragment.getDrawable(@DrawableRes drawableRes: Int): Drawable? {
    return ContextCompat.getDrawable(requireContext(), drawableRes)
}
