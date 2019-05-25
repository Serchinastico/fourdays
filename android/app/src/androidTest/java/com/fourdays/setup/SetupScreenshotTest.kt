package com.fourdays.setup

import com.facebook.testing.screenshot.Screenshot
import com.fourdays.common.ScreenshotTest
import com.fourdays.espresso.ViewInTest.AcceptSetupButton
import com.fourdays.espresso.clickOn
import org.junit.Test


class SetupScreenshotTest : ScreenshotTest() {
    @Test
    fun screenIsDisplayed() {
        val activity = startActivity()

        Screenshot.snapActivity(activity).record()
    }

    @Test
    fun canSelectAndDeselectItems() {
        val activity = startActivity()

        clickOn(AcceptSetupButton)

        Screenshot.snapActivity(activity).record()
    }
}