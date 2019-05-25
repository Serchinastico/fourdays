package com.fourdays.setup

import android.content.Intent
import android.support.test.espresso.intent.rule.IntentsTestRule
import com.facebook.react.bridge.ReactMarker
import com.facebook.react.bridge.ReactMarkerConstants
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

        Screenshot.snapActivity(activity).record()
    }

    private fun startActivity(): MainActivity {
        val activity = testRule.launchActivity(Intent())
        waitForBundleToLoad()
        return activity
    }

    private fun waitForBundleToLoad() {
        var canContinue = false
        ReactMarker.addListener { name, _, _ ->
            if (name == ReactMarkerConstants.CONTENT_APPEARED) {
                canContinue = true
            }
        }
        while (!canContinue) {
            Thread.sleep(10)
        }
    }
}