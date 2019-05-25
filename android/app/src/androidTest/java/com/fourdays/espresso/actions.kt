package com.fourdays.espresso

import android.support.test.espresso.Espresso.onView
import android.support.test.espresso.action.ViewActions.click
import android.support.test.espresso.matcher.ViewMatchers.withContentDescription
import com.fourdays.espresso.EspressoViewFinder.waitForDisplayed

fun clickOn(view: ViewInTest) {
    waitForDisplayed(withContentDescription(view.id)) {
        onView(it).perform(click())
    }
}