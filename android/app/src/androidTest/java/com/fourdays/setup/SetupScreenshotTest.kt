package com.fourdays.setup

import android.content.Intent
import android.support.test.espresso.intent.rule.IntentsTestRule
import com.facebook.testing.screenshot.Screenshot
import com.fourdays.MainActivity
import org.junit.Rule
import org.junit.Test

private const val INITIAL_TOUCH_MODE = true
private const val DO_NOT_START_ACTIVITY = false

class SetupScreenshotTest {

    @Rule
    @JvmField
    var testRule = IntentsTestRule(
        MainActivity::class.java,
        INITIAL_TOUCH_MODE,
        DO_NOT_START_ACTIVITY
    )

    @Test
    fun theActivityIsShownProperly() {
        val activity = startActivity()

        Thread.sleep(5000)

        Screenshot.snapActivity(activity).record()
    }

    private fun startActivity(): MainActivity {
        return testRule.launchActivity(Intent())
    }
}