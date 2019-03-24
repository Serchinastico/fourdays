package com.fourdays.app.common.ui.view

import android.view.View

interface Visibility {
    fun Boolean.toVisibility(): Int = if (this) {
        View.VISIBLE
    } else {
        View.GONE
    }

    fun Boolean.toInvisibility(): Int = if (this) {
        View.GONE
    } else {
        View.VISIBLE
    }
}
