package com.fourdays.app.setup.ui

import androidx.recyclerview.widget.GridLayoutManager
import com.afollestad.recyclical.datasource.DataSource
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem.Description
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem.FoodGroupHeader
import com.fourdays.app.setup.ui.SetupFragment.RecyclerViewItem.FoodItem

class FoodGridSpanSizeLookup(private val dataSource: DataSource) :
    GridLayoutManager.SpanSizeLookup() {
    override fun getSpanSize(position: Int): Int {
        return when (dataSource[position] as RecyclerViewItem) {
            is Description, is FoodGroupHeader -> 3
            is FoodItem -> 1
        }
    }
}
